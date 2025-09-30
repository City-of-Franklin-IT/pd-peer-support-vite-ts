import { Link } from 'react-router'
import { motion } from 'motion/react'
import { motionProps } from '@/helpers/utils'
import { useOnTableRowClick, useSetColumnVisibility } from './hooks'
import { supportTypeIconMap } from './utils'

// Types
import * as AppTypes from '@/context/App/types'

export const Table = ({ tableData }: { tableData: AppTypes.SupportInterface[] }) => {

  return (
    <motion.table 
      className="table text-neutral-content font-[play] w-full"
      { ...motionProps.slideInLeft }>
        <TableHeaders />
        <TableBody tableData={tableData} />
    </motion.table>
  )
}

export const NoSupport = () => {

  return (
    <div className="flex flex-col gap-4 font-[play] text-neutral-content text-center p-10 m-auto outline-2 outline-dashed outline-neutral-content w-fit rounded-xl">
      <span className="text-xl uppercase font-bold">No Peer Support Entries</span>
      <Link to={'/create/support'} className="text-lg text-warning font-bold hover:text-info">Click to create peer support entry</Link>
    </div>
  )
}

const TableHeaders = () => {
  const visible = useSetColumnVisibility()

  return (
    <thead>
      <tr className="text-warning uppercase bg-neutral/50 border-b-2 border-warning">
        <th className="pl-10">Date</th>
        <th className="pl-10">Designation</th>
        <th className="px-10 text-center">Type</th>
        <th className="text-center">Personnel</th>
        <th className={`${ !visible ? 'hidden' : 'text-center block' }`}>Note</th>
      </tr>
    </thead>
  )
}

const TableBody = ({ tableData }: { tableData: AppTypes.SupportInterface[] }) => {

  return (
    <tbody>
      {tableData.map((support, index) => {
        return (
          <TableRow
            key={`table-row-${ support.uuid }`}
            tableData={support}
            index={index} />
        )
      })}
    </tbody>
  )
}

type TableRowProps = { tableData: AppTypes.SupportInterface, index: number }

const TableRow = (props: TableRowProps) => {
  const onTableRowClick = useOnTableRowClick(props.tableData.uuid)

  const visible = useSetColumnVisibility()

  const bgColor = props.index % 2 === 0 ? 'bg-neutral/20' : null

  return (
    <tr className={`border-0 border-t-1 border-neutral-content whitespace-nowrap hover:cursor-pointer hover:bg-neutral ${ bgColor }`} onClick={onTableRowClick}>
      <td className="pl-10 whitespace-nowrap"><DateTimes support={props.tableData} /></td>
      <td className="pl-10">{props.tableData.supportDesignation}</td>
      <td className="px-10"><SupportType supportType={props.tableData.supportType} /></td>
      <td className="px-10"><Personnel tableData={props.tableData} /></td>
      <td className={`${ !visible ? 'hidden' : 'p-6 text-center block' }`}><Note note={props.tableData.note} /></td>
    </tr> 
  )
}

const DateTimes = ({ support }: { support: AppTypes.SupportInterface }) => {
  const start = new Date(support.startDateTime).toISOString()
  const end = new Date(support.endDateTime).toISOString()

  const startEndDateTimes = {
    start: {
      date: start.split('T')[0],
      time: start.split('T')[1].slice(0, -8)
    },
    end: {
      date: end.split('T')[0],
      time: end.split('T')[1].slice(0, -8)
    }
  }

  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-between"><span className="font-bold uppercase pr-2">Start:</span> {startEndDateTimes.start.date} @ {startEndDateTimes.start.time}</div>
      <div className="flex justify-between"><span className="font-bold uppercase pr-2">End:</span> {startEndDateTimes.end.date} @ {startEndDateTimes.end.time}</div>
    </div>
  )
}

const Personnel = ({ tableData }: { tableData: AppTypes.SupportInterface }) => {
  const personnel = tableData.Personnel || []

  return (
    <div className="flex flex-col items-center uppercase">
      {personnel.map(person => {
        const lastName = person.email.split('@')[0].split('.')[1]

        return (
          <span key={`support-${ tableData.uuid }-person-${ lastName }`}>{lastName}</span>
        )
      })}
    </div>
  )
}

const SupportType = ({ supportType }: { supportType: AppTypes.SupportType }) => {
  const src = supportTypeIconMap.get(supportType)

  return (
    <div className="flex flex-col gap-1 items-center">
      <SupportTypeIcon src={src} />
      <small className="font-[play] text-neutral-content uppercase">{supportType}</small>
    </div>
  )
}

const SupportTypeIcon = ({ src }: { src: string | undefined }) => {
  if(!src) return

  return (
    <img src={src} className="w-[40px]" />
  )
}

const Note = ({ note }: { note: string | null }) => {
  if(!note) return

  return (
    <span className="py-6 text-center italic whitespace-normal">"{note}"</span>
  )
}