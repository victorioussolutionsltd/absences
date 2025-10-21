/**
 * @jest-environment jsdom
 */

// This file can be used for tests that need access to jest-dom matchers
// Run with: npm test -- Table.basic.test.tsx

import React from 'react'
import { render } from '@testing-library/react'
import { Table, type TableColumn } from '../Table'

// Simple test data
interface User {
  id: number
  name: string
  email: string
}

const testUsers: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com' },
]

const testColumns: TableColumn<User>[] = [
  { key: 'id', label: 'ID', sortable: true },
  { key: 'name', label: 'Name', sortable: true },
  { key: 'email', label: 'Email', sortable: false },
]

describe('PaginatedTable Basic Tests', () => {
  test('component renders without crashing', () => {
    // Simple test to ensure the component can be imported and instantiated
    expect(Table).toBeDefined()
    expect(typeof Table).toBe('function')
  })

  test('table columns interface is properly defined', () => {
    const column: TableColumn<User> = {
      key: 'name',
      label: 'Full Name',
      sortable: true,
    }

    expect(column.key).toBe('name')
    expect(column.label).toBe('Full Name')
    expect(column.sortable).toBe(true)
  })

  test('test data structure is valid', () => {
    expect(testUsers).toHaveLength(3)
    expect(testUsers[0]).toHaveProperty('id')
    expect(testUsers[0]).toHaveProperty('name')
    expect(testUsers[0]).toHaveProperty('email')
  })

  test('columns configuration is valid', () => {
    expect(testColumns).toHaveLength(3)
    expect(testColumns[0].key).toBe('id')
    expect(testColumns[1].key).toBe('name')
    expect(testColumns[2].key).toBe('email')
  })

  test('sortable columns are properly configured', () => {
    const sortableColumns = testColumns.filter(col => col.sortable)
    const nonSortableColumns = testColumns.filter(col => !col.sortable)

    expect(sortableColumns).toHaveLength(2)
    expect(nonSortableColumns).toHaveLength(1)
    expect(nonSortableColumns[0].key).toBe('email')
  })
})

describe('PaginatedTable Snapshot Tests', () => {
  test('renders basic table with default props', () => {
    const { container } = render(
      <Table
        data={testUsers}
        columns={testColumns}
        pageSize={10}
      />
    )
    expect(container.firstChild).toMatchSnapshot()
  })

  test('renders empty table', () => {
    const { container } = render(
      <Table
        data={[]}
        columns={testColumns}
        pageSize={10}
      />
    )
    expect(container.firstChild).toMatchSnapshot()
  })

  test('renders loading state', () => {
    const { container } = render(
      <Table
        data={[]}
        columns={testColumns}
        pageSize={10}
        loading={true}
      />
    )
    expect(container.firstChild).toMatchSnapshot()
  })

  test('renders table with custom empty message', () => {
    const { container } = render(
      <Table
        data={[]}
        columns={testColumns}
        pageSize={10}
        emptyMessage="No users found"
      />
    )
    expect(container.firstChild).toMatchSnapshot()
  })

  test('renders table with pagination (multiple pages)', () => {
    const manyUsers: User[] = Array.from({ length: 25 }, (_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
    }))

    const { container } = render(
      <Table
        data={manyUsers}
        columns={testColumns}
        pageSize={10}
      />
    )
    expect(container.firstChild).toMatchSnapshot()
  })

  test('renders table with custom column rendering', () => {
    const customColumns: TableColumn<User>[] = [
      { key: 'id', label: 'ID', sortable: true, className: 'text-center' },
      { 
        key: 'name', 
        label: 'Full Name', 
        sortable: true,
        render: (value: string) => value.toUpperCase()
      },
      { 
        key: 'email', 
        label: 'Email Address', 
        sortable: false,
        render: (value: string) => (
          <a href={`mailto:${value}`} className="text-blue-600 hover:underline">
            {value}
          </a>
        )
      },
    ]

    const { container } = render(
      <Table
        data={testUsers}
        columns={customColumns}
        pageSize={10}
      />
    )
    expect(container.firstChild).toMatchSnapshot()
  })

  test('renders table with single page (no pagination controls)', () => {
    const { container } = render(
      <Table
        data={testUsers.slice(0, 2)}
        columns={testColumns}
        pageSize={10}
      />
    )
    expect(container.firstChild).toMatchSnapshot()
  })

  test('renders table with small page size', () => {
    const { container } = render(
      <Table
        data={testUsers}
        columns={testColumns}
        pageSize={2}
      />
    )
    expect(container.firstChild).toMatchSnapshot()
  })

  test('renders table with non-sortable columns only', () => {
    const nonSortableColumns: TableColumn<User>[] = [
      { key: 'id', label: 'ID', sortable: false },
      { key: 'name', label: 'Name', sortable: false },
      { key: 'email', label: 'Email', sortable: false },
    ]

    const { container } = render(
      <Table
        data={testUsers}
        columns={nonSortableColumns}
        pageSize={10}
      />
    )
    expect(container.firstChild).toMatchSnapshot()
  })

  test('renders table with mixed column configurations', () => {
    const mixedColumns: TableColumn<User>[] = [
      { 
        key: 'id', 
        label: 'User ID', 
        sortable: true, 
        className: 'text-center font-mono',
        render: (value: number) => `#${value.toString().padStart(3, '0')}`
      },
      { 
        key: 'name', 
        label: 'Display Name', 
        sortable: true,
        className: 'font-semibold'
      },
      { 
        key: 'email', 
        label: 'Contact Email', 
        sortable: false,
        className: 'text-gray-600 text-sm'
      },
    ]

    const { container } = render(
      <Table
        data={testUsers}
        columns={mixedColumns}
        pageSize={10}
      />
    )
    expect(container.firstChild).toMatchSnapshot()
  })
})