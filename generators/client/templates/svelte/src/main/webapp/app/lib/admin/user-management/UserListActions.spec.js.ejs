import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/svelte'
import { screen } from '@testing-library/dom'

import UserListActions from './UserListActions.svelte'

test('should allow triggering state change when the logged-in user is different than the rendered user account', () => {
	render(UserListActions, {
		user: { activated: false, login: 'testA' },
		currentUser: 'testB',
		showActions: true,
	})

	expect(screen.getAllByRole('button')).toHaveLength(4)
	expect(
		screen.getByRole('button', { name: /toggleactivation/i })
	).toBeEnabled()
	expect(screen.getByRole('button', { name: /view/i })).toBeEnabled()
	expect(screen.getByRole('button', { name: /edit/i })).toBeEnabled()
	expect(screen.getByRole('button', { name: /delete/i })).toBeEnabled()
})

test('should not allow triggering state change when the logged-in user is same as the rendered user account', () => {
	render(UserListActions, {
		user: { activated: false, login: 'testA' },
		currentUser: 'testA',
		showActions: true,
	})

	expect(
		screen.getByRole('button', { name: /toggleactivation/i })
	).toBeDisabled()
	expect(screen.getByRole('button', { name: /view/i })).toBeEnabled()
	expect(screen.getByRole('button', { name: /edit/i })).toBeDisabled()
	expect(screen.getByRole('button', { name: /delete/i })).toBeDisabled()
})

test('should assert the action buttons are hidden ', () => {
	render(UserListActions, {
		user: { activated: false, login: 'testA' },
		currentUser: 'testB',
	})

	expect(screen.getByTestId('rowactions')).toHaveClass('hidden')
})

test('should assert the component re-rendering on state change', async () => {
	const { component } = render(UserListActions, {
		user: { activated: true, login: 'testA' },
		currentUser: 'testB',
		showActions: true,
	})

	expect(screen.getByTitle(/deactivate user/i)).toBeInTheDocument()

	await component.$set({
		user: { activated: false, login: 'testA' },
		currentUser: 'testA',
		showActions: true,
	})
	expect(screen.getByTitle(/activate user/i)).toBeInTheDocument()
	expect(screen.getByRole('button', { name: /edit/i })).toBeDisabled()

	await component.$set({
		user: { activated: true, login: 'testA' },
		currentUser: 'testB',
		showActions: true,
	})
	expect(screen.getByTitle(/deactivate user/i)).toBeInTheDocument()
	expect(screen.getByRole('button', { name: /edit/i })).toBeEnabled()
})

test('should dispatch the toggleuseraccount event', async () => {
	const { component } = render(UserListActions, {
		props: {
			user: { activated: false, login: 'testA' },
			currentUser: 'testB',
			showActions: true,
		},
	})
	const button = screen.getByRole('button', { name: /toggleactivation/i })

	const mockHandler = jest.fn()
	component.$on('toggleuseraccount', mockHandler)

	await fireEvent.click(button)

	expect(mockHandler).toHaveBeenCalled()
	expect(mockHandler.mock.calls[0][0].detail).toStrictEqual({
		activated: true,
		login: 'testA',
	})
})

test('should dispatch the viewuseraccount event', async () => {
	const { component } = render(UserListActions, {
		props: {
			user: { activated: false, login: 'testA' },
			currentUser: 'testB',
			showActions: true,
		},
	})
	const button = screen.getByRole('button', { name: /view/i })

	const mockHandler = jest.fn()
	component.$on('viewuseraccount', mockHandler)

	await fireEvent.click(button)

	expect(mockHandler).toHaveBeenCalled()
	expect(mockHandler.mock.calls[0][0].detail).toStrictEqual({
		id: 'testA',
	})
})

test('should dispatch the updateuseraccount event', async () => {
	const { component } = render(UserListActions, {
		props: {
			user: { activated: false, login: 'testA' },
			currentUser: 'testB',
			showActions: true,
		},
	})
	const button = screen.getByRole('button', { name: /edit/i })

	const mockHandler = jest.fn()
	component.$on('updateuseraccount', mockHandler)

	await fireEvent.click(button)

	expect(mockHandler).toHaveBeenCalled()
	expect(mockHandler.mock.calls[0][0].detail).toStrictEqual({
		id: 'testA',
	})
})

test('should dispatch the deleteuseraccount event', async () => {
	const { component } = render(UserListActions, {
		props: {
			user: { activated: false, login: 'testA' },
			currentUser: 'testB',
			showActions: true,
		},
	})
	const button = screen.getByRole('button', { name: /delete/i })

	const mockHandler = jest.fn()
	component.$on('deleteuseraccount', mockHandler)

	await fireEvent.click(button)

	expect(mockHandler).toHaveBeenCalled()
	expect(mockHandler.mock.calls[0][0].detail).toStrictEqual({
		id: 'testA',
	})
})
