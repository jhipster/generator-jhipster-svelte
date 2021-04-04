describe('Forgot password', () => {
	beforeEach(() => {
		cy.unregisterServiceWorkers()
		cy.visit('/account/reset/init')
	})

	it('should greets with forgot password title', () => {
		cy.getBySel('forgotPwdTitle')
			.should('be.visible')
			.should('contain', 'Reset your password')
	})

	it('should verify instructions to reset password', () => {
		cy.getBySel('warningMsg')
			.should('be.visible')
			.should(
				'contain',
				"Enter your user account's verified email address."
			)
	})

	it('should require mandatory fields', () => {
		cy.getBySel('forgotPwdForm')
			.contains('Send password reset email')
			.should('be.disabled')
	})

	it('should require email', () => {
		cy.getBySel('forgotPwdForm')
			.getByName('email')
			.type('admin')
			.clear()
			.blur()
		cy.getBySel('forgotPwdForm')
			.getBySel('email-error')
			.should('be.visible')
			.and('contain', 'Email is mandatory')
	})

	it('should reset user password', () => {
		cy.getBySel('forgotPwdForm')
			.getByName('email')
			.type('admin@localhost.org{enter}')

		cy.getBySel('successMsg')
			.should('be.visible')
			.should(
				'contain',
				'Check your email for details on how to reset your password.'
			)
		cy.getBySel('forgotPwdForm').should('not.exist')
	})
})
