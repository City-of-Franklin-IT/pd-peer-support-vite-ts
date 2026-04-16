import { screen } from '@testing-library/react'
import { renderWithRosterCtx } from '@test/utils'
import { createPersonnelRoster } from '@test/mocks/api'
import PersonnelTable from '../index'

describe('PersonnelTable', () => {
  it('renders the table column headers', () => {
    renderWithRosterCtx(<PersonnelTable personnel={[]} />)
    expect(screen.getByText('Email')).toBeInTheDocument()
    expect(screen.getByText('Support Cases')).toBeInTheDocument()
  })

  it('renders a row for each personnel entry', () => {
    const personnel = [
      createPersonnelRoster({ uuid: '1', email: 'alice@franklintn.gov' }),
      createPersonnelRoster({ uuid: '2', email: 'bob@franklintn.gov' }),
    ]
    renderWithRosterCtx(<PersonnelTable personnel={personnel} />)
    expect(screen.getByText('alice@franklintn.gov')).toBeInTheDocument()
    expect(screen.getByText('bob@franklintn.gov')).toBeInTheDocument()
  })

  it('shows a dash for support count when personnel has no support cases', () => {
    const personnel = [createPersonnelRoster({ uuid: '1', Support: [] })]
    renderWithRosterCtx(<PersonnelTable personnel={personnel} />)
    expect(screen.getByText('-')).toBeInTheDocument()
  })

  it('shows the count when personnel has support cases', () => {
    const support = [
      {
        uuid: 's1',
        startDateTime: '2024-01-01T00:00:00.000Z',
        endDateTime: '2024-01-01T01:00:00.000Z',
        supportDesignation: 'FPD Employee' as const,
        supportType: 'Debrief - Internal' as const,
        note: null,
        createdBy: 'admin',
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedBy: 'admin',
        updatedAt: '2024-01-01T00:00:00.000Z',
      },
    ]
    const personnel = [createPersonnelRoster({ uuid: '1', Support: support })]
    renderWithRosterCtx(<PersonnelTable personnel={personnel} />)
    expect(screen.getByText('1')).toBeInTheDocument()
  })
})
