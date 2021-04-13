import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/svelte'
import { screen } from '@testing-library/dom'

import UserTable from './UserTable.svelte'

test('should render an empty table', () => {
	render(UserTable, {
		currentUser: 'testB',
	})

	expect(screen.getByRole('table')).toBeInTheDocument()
	expect(screen.queryAllByRole('cell').length).toEqual(0)
})

test('should render table with correct headers', () => {
	render(UserTable, {
		users: [],
		currentUser: 'testB',
	})

	expect(screen.getByRole('table')).toBeInTheDocument()
	expect(screen.getAllByRole('columnheader')).toHaveLength(7)
	expect(
		screen.getByRole('columnheader', { name: /id/i })
	).toBeInTheDocument()
	expect(
		screen.getByRole('columnheader', { name: /login/i })
	).toBeInTheDocument()
	expect(
		screen.getByRole('columnheader', { name: /email/i })
	).toBeInTheDocument()
	expect(
		screen.getByRole('columnheader', { name: /role/i })
	).toBeInTheDocument()
	expect(
		screen.getByRole('columnheader', { name: /created at/i })
	).toBeInTheDocument()
	expect(
		screen.getByRole('columnheader', { name: /modified at/i })
	).toBeInTheDocument()
	expect(
		screen.getByRole('columnheader', { name: /modified at/i })
	).toBeInTheDocument()
})

test('should render table with default sort by field', () => {
	render(UserTable, {
		users: [],
		currentUser: 'testB',
	})

	expect(
		screen.getByRole('columnheader', { name: /id ascending order/i })
	).toBeInTheDocument()

	expect(screen.getAllByTitle(/click to sort records/i)).toHaveLength(2)
	expect(
		screen.getByRole('columnheader', {
			name: /login click to sort records/i,
		})
	).toBeInTheDocument()
	expect(
		screen.getByRole('columnheader', {
			name: /email click to sort records/i,
		})
	).toBeInTheDocument()
})

test('should render table with sort by email field', () => {
	render(UserTable, {
		users: [],
		currentUser: 'testB',
		sortPredicate: 'email',
	})

	expect(
		screen.getByRole('columnheader', { name: /email ascending order/i })
	).toBeInTheDocument()

	expect(screen.getAllByTitle(/click to sort records/i)).toHaveLength(2)
	expect(
		screen.getByRole('columnheader', {
			name: /login click to sort records/i,
		})
	).toBeInTheDocument()
	expect(
		screen.getByRole('columnheader', {
			name: /id click to sort records/i,
		})
	).toBeInTheDocument()
})

test('should render table data for inactive user', () => {
	render(UserTable, {
		users: [
			{
				activated: false,
				id: 111,
				login: 'testA',
				email: 'test@test.org',
				authorities: ['ROLE_ADMIN', 'ROLE_USER'],
				createdDate: new Date('2011-04-11T10:20:30Z'),
				lastModifiedBy: 'admin',
				lastModifiedDate: undefined,
			},
		],
		currentUser: 'testB',
		sortPredicate: 'email',
	})

	expect(screen.getAllByRole('cell')).toHaveLength(7)
	expect(screen.getByRole('cell', { name: /111/i })).toBeInTheDocument()
	expect(screen.getByRole('cell', { name: /111/i })).toHaveClass(
		'border-l-4 border-red-300'
	)
	expect(screen.getByRole('cell', { name: /testA/i })).toBeInTheDocument()
	expect(
		screen.getByRole('cell', { name: /test@test.org/i })
	).toBeInTheDocument()
	expect(
		screen.getByRole('cell', { name: /ROLE_ADMIN, ROLE_USER/i })
	).toBeInTheDocument()
	expect(
		screen.getByRole('cell', { name: /4\/11\/2011/i })
	).toBeInTheDocument()
	expect(screen.getByRole('cell', { name: /^admin$/i })).toBeInTheDocument()
	expect(screen.getByRole('cell', { name: /-/i })).toBeInTheDocument()
})

test('should render table data for activated user', () => {
	render(UserTable, {
		users: [
			{
				activated: true,
				id: 111,
				login: 'testA',
				email: 'test@test.org',
				authorities: ['ROLE_ADMIN', 'ROLE_USER'],
				createdDate: new Date('2011-04-11T10:20:30Z'),
				lastModifiedBy: 'admin',
				lastModifiedDate: undefined,
			},
		],
		currentUser: 'testB',
		sortPredicate: 'email',
	})

	expect(screen.getByRole('cell', { name: /111/i })).toBeInTheDocument()
	expect(screen.getByRole('cell', { name: /111/i })).not.toHaveClass(
		'border-l-4 border-red-300'
	)
})

test('should assert the table reactivity to change in data', async () => {
	const { component } = render(UserTable, {
		users: [
			{
				activated: false,
				id: 111,
				login: 'testA',
				email: 'test@test.org',
				authorities: ['ROLE_ADMIN', 'ROLE_USER'],
				createdDate: new Date('2011-04-11T10:20:30Z'),
				lastModifiedBy: 'admin',
				lastModifiedDate: undefined,
			},
		],
		currentUser: 'testB',
		sortPredicate: 'email',
	})

	expect(screen.getByRole('cell', { name: /111/i })).toHaveClass(
		'border-l-4 border-red-300'
	)
	expect(
		screen.getByRole('columnheader', { name: /email ascending order/i })
	).toBeInTheDocument()

	await component.$set({
		users: [
			{
				activated: true,
				id: 111,
				login: 'testA',
				email: 'test@test.org',
				authorities: ['ROLE_ADMIN', 'ROLE_USER'],
				createdDate: new Date('2011-04-11T10:20:30Z'),
				lastModifiedBy: 'testB',
				lastModifiedDate: new Date('2011-04-11T10:20:30Z'),
			},
		],
		currentUser: 'testB',
		sortPredicate: 'login',
	})

	expect(screen.getByRole('cell', { name: /111/i })).not.toHaveClass(
		'border-l-4 border-red-300'
	)
	expect(
		screen.getByRole('columnheader', { name: /login ascending order/i })
	).toBeInTheDocument()
})
