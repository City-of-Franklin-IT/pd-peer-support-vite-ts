import { useOnTableRowClick } from './hooks'

// Types
import * as AppTypes from '@/context/App/types'

export const Table = ({ tableData }: { tableData: AppTypes.PersonnelRosterInterface[] }) => {

  return (
    <table className="table text-neutral-content font-[play] w-fit">
      <TableHeaders />
      <TableBody tableData={tableData} />
    </table>
  )
}

const TableHeaders = () => {

  return (
    <thead>
      <tr className="text-warning uppercase bg-neutral/50 border-b-2 border-warning">
        <th className="pl-10">Email</th>
        <th className="text-center">Support Cases</th>
      </tr>
    </thead>
  )
}

const TableBody = ({ tableData }: { tableData: AppTypes.PersonnelRosterInterface[] }) => {

  return (
    <tbody>
      {tableData.map((personnel, index) => {
        return (
          <TableRow
            key={`table-row-${ personnel.uuid }`}
            tableData={personnel}
            index={index} />
        )
      })}
    </tbody>
  )
}

type TableRowProps = { tableData: AppTypes.PersonnelRosterInterface, index: number }

const TableRow = (props: TableRowProps) => {
  const onTableRowClick = useOnTableRowClick('UpdateRosterPersonnel', props.tableData.uuid)

  const support = props.tableData.Support?.length ? props.tableData.Support.map(item => (item)).length : '-'

  const bgColor = props.index % 2 === 0 ? 'bg-neutral/20' : null

  return (
    <tr className={`border-0 border-t-1 border-neutral-content hover:cursor-pointer hover:bg-neutral ${ bgColor }`} onClick={onTableRowClick}>
      <td className="px-10 whitespace-nowrap">{props.tableData.email}</td>
      <td className="text-center">{support}</td>
    </tr>
  )
}