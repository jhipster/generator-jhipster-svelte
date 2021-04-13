describe('User delete dialog page', () => {
	let randomUser

	beforeEach(() => {
		cy.unregisterServiceWorkers()
		randomUser = 'test' + new Date().getTime()
		cy.loginByApi('admin', 'admin')

		cy.save('api/admin/users', {
			login: randomUser,
			firstName: '',
			lastName: '',
			email: `${randomUser}@localhost.org`,
			activated: true,
			authorities: ['ROLE_USER'],
		})

		cy.visit('/admin/user-management')

		cy.getBySel('userMgmtTable')
			.contains('td', randomUser)
			.parent()
			.trigger('mouseenter')
			.within($tr => {
				cy.root()
					.get('td')
					.children()
					.getByName('deleteUserBtn')
					.click()
			})
	})

	afterEach(() => {
		cy.delete(`api/admin/users/${randomUser}`)
	})

	it('should display delete user dialog', () => {
		cy.getBySel('svlModal').within(() => {
			cy.root()
				.get('h1')
				.should('be.visible')
				.should('contain', 'Confirm delete operation')
				.get('p')
				.should('be.visible')
				.should('contain', 'Are you sure you want to delete the user?')
				.getByName('deleteUserBtn')
				.should('not.be.disabled')
				.getByName('cancelBtn')
				.should('not.be.disabled')
		})
	})

	it('should close the dialog without deleting user', () => {
		cy.getBySel('svlModal').within(() => cy.getByName('cancelBtn').click())
		cy.getBySel('userMgmtTitle')
			.should('be.visible')
			.should('contain', 'Users')
	})

	it('should delete the user', () => {
		cy.getBySel('svlModal').within(() =>
			cy.getByName('deleteUserBtn').click()
		)

		cy.getBySel('toast-success').contains(
			'A user is deleted with identifier'
		)

		cy.getBySel('userMgmtTitle')
			.should('be.visible')
			.should('contain', 'Users')
	})
})
