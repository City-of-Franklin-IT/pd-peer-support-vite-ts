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

const TableRow = ({ tableData, index }: { tableData: AppTypes.PersonnelRosterInterface, index: number }) => {
  const onTableRowClick = useOnTableRowClick('UpdateRosterPersonnel', tableData.uuid)

  const support = tableData.Support?.length ? tableData.Support.map(item => (item)).length : '-'

  return (
    <tr className={`border-0 border-t-1 border-neutral-content hover:cursor-pointer hover:bg-neutral ${ index % 2 === 0 ? 'bg-neutral/20' : null }`} onClick={onTableRowClick}>
      <td className="px-10 whitespace-nowrap">{tableData.email}</td>
      <td className="text-center">{support}</td>
    </tr>
  )
}