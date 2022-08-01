describe('Forgot password', () => {
	beforeEach(() => {
		cy.unregisterServiceWorkers()
		cy.visit('/account/reset/init')
	})

	it('should greets with forgot password title', () => {
		cy.getByTestId('forgotPwdTitle')
			.should('be.visible')
			.should('contain', 'Reset your password')
	})

	it('should verify instructions to reset password', () => {
		cy.getByTestId('warningMsg')
			.should('be.visible')
			.should(
				'contain',
				"Enter your user account's verified email address."
			)
	})

	it('should require mandatory fields', () => {
		cy.getByTestId('forgotPwdForm')
			.contains('Send password reset email')
			.should('be.disabled')
	})

	it('should require email', () => {
		cy.getByTestId('forgotPwdForm')
			.getByName('email')
			.type('admin')
			.clear()
			.blur()
		cy.getByTestId('forgotPwdForm')
			.getByTestId('email-error')
			.should('be.visible')
			.and('contain', 'Email is mandatory')
	})

	it('should reset user password', () => {
		cy.getByTestId('forgotPwdForm')
			.getByName('email')
			.type('admin@localhost.org{enter}')

		cy.getByTestId('successMsg')
			.should('be.visible')
			.should(
				'contain',
				'Check your email for details on how to reset your password.'
			)
		cy.getByTestId('forgotPwdForm').should('not.exist')
	})
})
