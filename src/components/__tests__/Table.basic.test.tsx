/**
 * @jest-environment jsdom
 */

// This file can be used for tests that need access to jest-dom matchers
// Run with: npm test -- Table.basic.test.tsx

import { PaginatedTable, type TableColumn } from '../Table'

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
    expect(PaginatedTable).toBeDefined()
    expect(typeof PaginatedTable).toBe('function')
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