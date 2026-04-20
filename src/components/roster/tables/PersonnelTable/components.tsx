import { useHandleTableRow } from './hooks'

// Types
import type * as AppTypes from '@/context/App/AppTypes'

export const Table = ({ tableData }: { tableData: AppTypes.PersonnelRosterInterface[] }) => (
  <table className="table text-neutral-content font-[play] w-fit">
    <TableHeaders />
    <TableBody tableData={tableData} />
  </table>
)

const TableHeaders = () => (
  <thead>
    <tr className="text-warning uppercase bg-neutral/50 border-b-2 border-warning">
      <th className="pl-10">Email</th>
      <th className="text-center">Support Cases</th>
    </tr>
  </thead>
)

const TableBody = ({ tableData }: { tableData: AppTypes.PersonnelRosterInterface[] }) => (
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

type TableRowProps = { 
  tableData: AppTypes.PersonnelRosterInterface
  index: number 
}

const TableRow = ({ tableData, index }: TableRowProps) => {
  const { rowProps, supportCount, email } = useHandleTableRow(tableData, index)

  return (
    <tr { ...rowProps }>
      <td className="px-10 whitespace-nowrap">{email}</td>
      <td className="text-center">{supportCount}</td>
    </tr>
  )
}