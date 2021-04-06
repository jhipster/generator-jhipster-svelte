describe('Create user page', () => {
	beforeEach(() => {
		cy.unregisterServiceWorkers()
		cy.loginByApi('admin', 'admin')
		cy.visit(`/admin/user-management/new`)
	})

	it('should greets with Create user title', () => {
		cy.getBySel('userMgmtTitle')
			.should('be.visible')
			.should('contain', 'Create user account')
	})

	it('should require mandatory fields', () => {
		cy.getBySel('addUserForm')
			.contains('Create user account')
			.should('be.disabled')
	})

	it('should require username', () => {
		cy.getBySel('addUserForm')
			.getByName('username')
			.type('admin')
			.clear()
			.blur()
		cy.getBySel('addUserForm')
			.getBySel('username-error')
			.should('be.visible')
			.and('contain', 'Username is mandatory')
	})

	it('should require email', () => {
		cy.getBySel('addUserForm')
			.getByName('email')
			.type('admin@localhost.org')
			.clear()
			.blur()
		cy.getBySel('addUserForm')
			.getBySel('email-error')
			.should('be.visible')
			.and('contain', 'Email is mandatory')
	})

	it('should require roles', () => {
		cy.getBySel('addUserForm')
			.getByName('roles')
			.click()
			.getBySel('roles-options')
			.within(() => {
				cy.root().get("input[type='checkbox']").eq(0).check().uncheck()
			})
			.getBySel('roles-bg')
			.click()
		cy.getBySel('addUserForm')
			.getBySel('roles-error')
			.should('be.visible')
			.and('contain', 'Select at least one role')
	})

	it('should navigate back to the user list page', () => {
		cy.getByName('cancelBtn').click()

		cy.location('pathname')
			.should('eq', '/admin/user-management')
			.getBySel('userMgmtTitle')
			.should('be.visible')
			.should('contain', 'Users')
	})

	describe('create account', () => {
		let randomUser

		beforeEach(() => {
			cy.unregisterServiceWorkers()
			randomUser = 'test' + new Date().getTime()
			cy.visit(`/admin/user-management/new`)
		})

		afterEach(() => {
			cy.delete(`api/admin/users/${randomUser}`)
		})
		it('should create a new user account', () => {
			cy.getBySel('addUserForm')
				.getByName('username')
				.type(`${randomUser}`)
				.getByName('firstName')
				.type('john')
				.getByName('lastName')
				.type('doe')
				.getByName('email')
				.type(`${randomUser}@localhost.org`)
				.getByName('roles')
				.click()
				.getBySel('roles-options')
				.within(() => {
					cy.root().get("input[type='checkbox']").eq(0).check()
				})
				.getBySel('roles-bg')
				.click()

			cy.getBySel('addUserForm')
				.contains('Create user account')
				.should('not.be.disabled')
				.click()

			cy.getBySel('toast-success').contains(
				'A user is created with identifier'
			)

			cy.location('pathname')
				.should('eq', '/admin/user-management')
				.getBySel('userMgmtTitle')
				.should('be.visible')
				.should('contain', 'Users')
		})
	})
})
