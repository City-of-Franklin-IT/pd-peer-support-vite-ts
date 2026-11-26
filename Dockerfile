# syntax=docker/dockerfile:1

# ---- Build stage ----
FROM node:22-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# ---- Runtime stage ----
FROM nginx:1.27-alpine

# nginx config: serve the SPA under /peer-support on port 8004
RUN rm /etc/nginx/conf.d/default.conf && \
    cat > /etc/nginx/conf.d/peer-support.conf <<'NGINX'
server {
    listen 8004;
    server_name _;

    root /usr/share/nginx/html;

    gzip on;
    gzip_types text/plain text/css application/javascript application/json image/svg+xml;

    # Redirect bare root to the app base path
    location = / {
        return 302 /peer-support/;
    }

    location = /healthz {
        access_log off;
        default_type text/plain;
        return 200 "ok\n";
    }

    # Hashed build assets: cache aggressively
    location /peer-support/assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        try_files $uri =404;
    }

    # SPA: fall back to index.html for client-side routes
    location /peer-support/ {
        add_header Cache-Control "no-cache";
        try_files $uri $uri/ /peer-support/index.html;
    }
}
NGINX

# Vite builds with base '/peer-support', so place output under that path
COPY --from=build /app/dist /usr/share/nginx/html/peer-support

EXPOSE 8004

HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
  CMD wget -qO /dev/null http://127.0.0.1:8004/healthz || exit 1

CMD ["nginx", "-g", "daemon off;"]
