describe('Change user password', () => {
	beforeEach(() => {
		cy.unregisterServiceWorkers()
		cy.loginByApi('admin', 'admin')
		cy.visit('/account/password')
	})

	it('should greets with Change password title', () => {
		cy.getBySel('passwordTitle').should('have.text', 'Change password')
	})

	it('should require mandatory fields to be filled', () => {
		cy.getBySel('passwordForm')
			.contains('Update password')
			.should('be.disabled')
	})

	it('should require current password', () => {
		cy.getBySel('passwordForm')
			.getByName('currentPassword')
			.type('admin')
			.clear()
			.blur()
		cy.getBySel('passwordForm')
			.getBySel('currentPassword-error')
			.should('be.visible')
			.and('contain', 'Password is mandatory')
	})

	it('should require new password', () => {
		cy.getBySel('passwordForm')
			.getByName('newPassword')
			.type('admin')
			.clear()
			.blur()
		cy.getBySel('passwordForm')
			.getBySel('newPassword-error')
			.should('be.visible')
			.and('contain', 'Password is mandatory')
	})

	it('should require to confirm new password', () => {
		cy.getBySel('passwordForm')
			.getByName('newPasswordConfirm')
			.type('admin')
			.clear()
			.blur()
		cy.getBySel('passwordForm')
			.getBySel('newPasswordConfirm-error')
			.should('be.visible')
			.and('contain', 'Password is mandatory')
	})

	it('should require new and confirm passwords to match', () => {
		cy.getBySel('passwordForm').getByName('newPassword').type('abcd').blur()
		cy.getBySel('passwordForm')
			.getByName('newPasswordConfirm')
			.type('defg')
			.blur()
		cy.getBySel('passwordForm')
			.getBySel('newPasswordConfirm-error')
			.should('be.visible')
			.and('contain', 'Password and its confirmation do not match')
	})

	it('should update user password', () => {
		cy.getBySel('passwordForm')
			.getByName('currentPassword')
			.type('admin')
			.blur()
		cy.getBySel('passwordForm')
			.getByName('newPassword')
			.type('admin')
			.blur()
		cy.getBySel('passwordForm')
			.getByName('newPasswordConfirm')
			.type('admin')
			.blur()

		cy.getBySel('passwordForm')
			.contains('Update password')
			.should('not.be.disabled')
			.click()

		cy.getBySel('successMsg').contains('Password changed!')
	})
})
