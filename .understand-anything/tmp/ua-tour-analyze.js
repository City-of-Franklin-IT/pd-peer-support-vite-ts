#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

function main() {
  const inputPath = process.argv[2];
  const outputPath = process.argv[3];

  if (!inputPath || !outputPath) {
    console.error('Usage: node ua-tour-analyze.js <input.json> <output.json>');
    process.exit(1);
  }

  let data;
  try {
    const rawData = fs.readFileSync(inputPath, 'utf8');
    data = JSON.parse(rawData);
  } catch (err) {
    console.error(`Error reading or parsing input file: ${err.message}`);
    process.exit(1);
  }

  const { nodes = [], edges = [], layers = [] } = data;

  // Build adjacency maps
  const fanIn = {};
  const fanOut = {};
  const nodeMap = {};

  nodes.forEach(node => {
    nodeMap[node.id] = node;
    fanIn[node.id] = 0;
    fanOut[node.id] = 0;
  });

  edges.forEach(edge => {
    if (nodeMap[edge.source] && nodeMap[edge.target]) {
      fanOut[edge.source] = (fanOut[edge.source] || 0) + 1;
      fanIn[edge.target] = (fanIn[edge.target] || 0) + 1;
    }
  });

  // A. Fan-In Ranking
  const fanInRanking = Object.entries(fanIn)
    .map(([id, count]) => ({ id, fanIn: count, name: nodeMap[id]?.name || '', type: nodeMap[id]?.type || '' }))
    .filter(item => item.fanIn > 0)
    .sort((a, b) => b.fanIn - a.fanIn)
    .slice(0, 20);

  // B. Fan-Out Ranking
  const fanOutRanking = Object.entries(fanOut)
    .map(([id, count]) => ({ id, fanOut: count, name: nodeMap[id]?.name || '', type: nodeMap[id]?.type || '' }))
    .filter(item => item.fanOut > 0)
    .sort((a, b) => b.fanOut - a.fanOut)
    .slice(0, 20);

  // C. Entry Point Candidates
  const entryPointCandidates = [];
  const TOP_10_FO = fanOutRanking.slice(0, 10).map(x => x.id);
  const BOTTOM_25_FI = fanInRanking.length > 0
    ? fanInRanking[Math.floor(fanInRanking.length * 0.75)]?.fanIn || Infinity
    : Infinity;

  nodes.forEach(node => {
    let score = 0;
    const name = node.name.toLowerCase();

    // Code entry points
    if (['index.ts', 'index.js', 'main.ts', 'main.js', 'app.ts', 'app.js', 'server.ts', 'server.js', 'mod.rs', 'main.go', 'main.py', 'main.rs', 'manage.py', 'app.py', 'wsgi.py', 'asgi.py', 'run.py', '__main__.py', 'application.java', 'main.java', 'program.cs', 'config.ru', 'index.php', 'app.swift', 'application.kt', 'main.cpp', 'main.c'].includes(name)) {
      score += 3;
    }

    const depth = (node.filePath || '').split('/').length;
    if (node.type === 'file' && (depth === 1 || depth === 2)) {
      score += 1;
    }

    if (TOP_10_FO.includes(node.id)) {
      score += 1;
    }

    if (fanIn[node.id] < BOTTOM_25_FI && node.type === 'file') {
      score += 1;
    }

    // Documentation entry points
    if (node.type === 'document' && node.name === 'README.md') {
      score += 5;
    }
    if (node.type === 'document' && node.name.endsWith('.md')) {
      score += 2;
    }

    if (score > 0) {
      entryPointCandidates.push({
        id: node.id,
        score,
        name: node.name,
        summary: node.summary
      });
    }
  });

  entryPointCandidates.sort((a, b) => b.score - a.score);
  const topEntryPoints = entryPointCandidates.slice(0, 5);

  // D. BFS Traversal from top code entry point
  const bfsTraversal = { startNode: null, order: [], depthMap: {}, byDepth: {} };
  const topCodeEntry = topEntryPoints.find(ep => ep.id.startsWith('file:'));
  if (topCodeEntry) {
    const startId = topCodeEntry.id;
    bfsTraversal.startNode = startId;
    const visited = new Set([startId]);
    const queue = [{ id: startId, depth: 0 }];
    const depthMap = { [startId]: 0 };
    const byDepth = { '0': [startId] };

    while (queue.length > 0) {
      const { id, depth } = queue.shift();
      bfsTraversal.order.push(id);

      const outgoing = edges.filter(e => e.source === id && (e.type === 'imports' || e.type === 'calls'));
      outgoing.forEach(edge => {
        const target = edge.target;
        if (!visited.has(target) && nodeMap[target]) {
          visited.add(target);
          const newDepth = depth + 1;
          depthMap[target] = newDepth;
          if (!byDepth[newDepth]) byDepth[newDepth] = [];
          byDepth[newDepth].push(target);
          queue.push({ id: target, depth: newDepth });
        }
      });
    }

    bfsTraversal.depthMap = depthMap;
    bfsTraversal.byDepth = byDepth;
  }

  // E. Non-Code File Inventory
  const nonCodeFiles = {
    documentation: [],
    infrastructure: [],
    data: [],
    config: []
  };

  nodes.forEach(node => {
    if (node.type === 'document') {
      nonCodeFiles.documentation.push({
        id: node.id,
        name: node.name,
        summary: node.summary
      });
    } else if (['service', 'pipeline', 'resource'].includes(node.type)) {
      nonCodeFiles.infrastructure.push({
        id: node.id,
        name: node.name,
        summary: node.summary
      });
    } else if (['table', 'schema', 'endpoint'].includes(node.type)) {
      nonCodeFiles.data.push({
        id: node.id,
        name: node.name,
        summary: node.summary
      });
    } else if (node.type === 'config') {
      nonCodeFiles.config.push({
        id: node.id,
        name: node.name,
        summary: node.summary
      });
    }
  });

  // F. Tightly Coupled Clusters
  const clusters = [];
  const processed = new Set();

  const bidirectionalPairs = [];
  nodes.forEach(nodeA => {
    nodes.forEach(nodeB => {
      if (nodeA.id < nodeB.id && !processed.has(`${nodeA.id}-${nodeB.id}`)) {
        const aToB = edges.some(e => e.source === nodeA.id && e.target === nodeB.id);
        const bToA = edges.some(e => e.source === nodeB.id && e.target === nodeA.id);
        if ((aToB && bToA) || edges.filter(e => (e.source === nodeA.id && e.target === nodeB.id) || (e.source === nodeB.id && e.target === nodeA.id)).length >= 2) {
          bidirectionalPairs.push({ nodes: [nodeA.id, nodeB.id], edgeCount: edges.filter(e => (e.source === nodeA.id && e.target === nodeB.id) || (e.source === nodeB.id && e.target === nodeA.id)).length });
          processed.add(`${nodeA.id}-${nodeB.id}`);
        }
      }
    });
  });

  bidirectionalPairs.sort((a, b) => b.edgeCount - a.edgeCount);
  clusters.push(...bidirectionalPairs.slice(0, 10));

  // G. Layer List
  const layerList = {
    count: layers.length,
    list: layers.map(l => ({
      id: l.id,
      name: l.name,
      description: l.description
    }))
  };

  // H. Node Summary Index
  const nodeSummaryIndex = {};
  nodes.forEach(node => {
    nodeSummaryIndex[node.id] = {
      name: node.name,
      type: node.type,
      summary: node.summary
    };
  });

  // Output
  const result = {
    scriptCompleted: true,
    entryPointCandidates: topEntryPoints,
    fanInRanking: fanInRanking.slice(0, 20),
    fanOutRanking: fanOutRanking.slice(0, 20),
    bfsTraversal,
    nonCodeFiles,
    clusters,
    layers: layerList,
    nodeSummaryIndex,
    totalNodes: nodes.length,
    totalEdges: edges.length
  };

  try {
    fs.writeFileSync(outputPath, JSON.stringify(result, null, 2), 'utf8');
    console.log(`Analysis complete. Output written to ${outputPath}`);
    process.exit(0);
  } catch (err) {
    console.error(`Error writing output: ${err.message}`);
    process.exit(1);
  }
}

main();
