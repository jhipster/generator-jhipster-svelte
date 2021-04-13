describe('User view details page', () => {
	let randomUser

	beforeEach(() => {
		cy.unregisterServiceWorkers()
		randomUser = 'test' + new Date().getTime()
		cy.loginByApi('admin', 'admin')

		cy.save('api/admin/users', {
			login: randomUser,
			firstName: 'John',
			lastName: 'Doe',
			email: `${randomUser}@localhost.org`,
			activated: true,
			authorities: ['ROLE_USER'],
		}).then(res => {
			cy.visit(`/admin/user-management/${res.login}/view`)
		})
	})

	afterEach(() => {
		cy.delete(`api/admin/users/${randomUser}`)
	})

	it('should display user account details', () => {
		cy.getBySel('userMgmtTitle')
			.should('be.visible')
			.and('contain', `User Details [ ${randomUser} ]`)

		cy.get('div.table').within(() => {
			cy.root()
				.get('.table-cell')
				.should('have.length', 18)
				.get('.table-cell')
				.eq(1)
				.should('contain', randomUser)
				.get('.table-cell')
				.eq(3)
				.should('contain', 'John')
				.get('.table-cell')
				.eq(5)
				.should('contain', 'Doe')
				.get('.table-cell')
				.eq(7)
				.should('contain', `${randomUser}@localhost.org`)
				.get('.table-cell')
				.eq(9)
				.should('contain', 'admin')
				// .get('.table-cell').eq(11).should('contain', randomUser) // assert date
				.get('.table-cell')
				.eq(13)
				.should('contain', 'admin')
				// .get('.table-cell').eq(15).should('contain', randomUser) // assert date
				.get('.table-cell')
				.eq(17)
				.should('contain', 'ROLE_USER')
		})
	})

	it('should navigate back to the user list page', () => {
		cy.getByName('backBtn').click()
		cy.getBySel('userMgmtTitle')
			.should('be.visible')
			.should('contain', 'Users')
	})
})
