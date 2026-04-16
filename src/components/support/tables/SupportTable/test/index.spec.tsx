import { screen } from '@testing-library/react'
import { renderWithSupportCtx } from '@test/utils'
import { createSupport } from '@test/mocks/api'
import SupportTable from '../index'

describe('SupportTable', () => {
  it('renders the NoSupport message when tableData is empty', () => {
    renderWithSupportCtx(<SupportTable tableData={[]} />)
    expect(screen.getByText(/no peer support entries/i)).toBeInTheDocument()
  })

  it('renders a link to create support when empty', () => {
    renderWithSupportCtx(<SupportTable tableData={[]} />)
    expect(
      screen.getByRole('link', { name: /click to create peer support entry/i })
    ).toBeInTheDocument()
  })

  it('renders the table when tableData has entries', () => {
    const data = [
      createSupport({ uuid: '1', supportDesignation: 'FPD Employee', supportType: 'Defusing' }),
    ]
    renderWithSupportCtx(<SupportTable tableData={data} />)
    expect(screen.getByRole('table')).toBeInTheDocument()
    expect(screen.getByText('Defusing')).toBeInTheDocument()
    expect(screen.getByText('FPD Employee')).toBeInTheDocument()
  })

  it('renders a row for each support entry', () => {
    const data = [
      createSupport({ uuid: '1', supportType: 'Defusing' }),
      createSupport({ uuid: '2', supportType: 'Referral' }),
    ]
    renderWithSupportCtx(<SupportTable tableData={data} />)
    expect(screen.getByText('Defusing')).toBeInTheDocument()
    expect(screen.getByText('Referral')).toBeInTheDocument()
  })
})
