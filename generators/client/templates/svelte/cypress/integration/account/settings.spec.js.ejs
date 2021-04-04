describe('User Settings', () => {
	beforeEach(() => {
		cy.unregisterServiceWorkers()
		cy.loginByApi('admin', 'admin')
		cy.visit('/account/settings')
	})

	it('should greets with User Settings title', () => {
		cy.getBySel('settingsTitle').should(
			'have.text',
			'User settings for [admin]'
		)
	})

	it('should display current settings', () => {
		cy.getBySel('settingsForm')
			.getByName('firstName')
			.invoke('val')
			.then(val => {
				expect(val).to.include('Admin')
			})
		cy.getBySel('settingsForm')
			.getByName('lastName')
			.invoke('val')
			.then(val => {
				expect(val).to.include('Admin')
			})
		cy.getBySel('settingsForm')
			.getByName('email')
			.invoke('val')
			.then(val => {
				expect(val).to.include('admin@localhost')
			})
	})

	it('should display form control validation messages', () => {
		cy.getBySel('settingsForm')
			.getByName('firstName')
			.type(
				'AveryLongFirstNameThatExceedsTheMaximumLengthLimitToCheckValidation'
			)
			.blur()
		cy.getBySel('settingsForm')
			.getBySel('firstName-error')
			.should('be.visible')
			.and('contain', 'First name cannot be longer than 50 characters')

		cy.getBySel('settingsForm')
			.getByName('lastName')
			.type(
				'AveryLongLastNameThatExceedsTheMaximumLengthLimitToCheckValidation'
			)
			.blur()
		cy.getBySel('settingsForm')
			.getBySel('lastName-error')
			.should('be.visible')
			.and('contain', 'Last name cannot be longer than 50 characters')

		cy.getBySel('settingsForm').getByName('email').clear().blur()
		cy.getBySel('settingsForm')
			.getBySel('email-error')
			.should('be.visible')
			.and('contain', 'Email is mandatory')

		cy.getBySel('settingsForm')
			.getByName('email')
			.type('admin@localhost')
			.blur()
		cy.getBySel('settingsForm')
			.getBySel('email-error')
			.should('be.visible')
			.and('contain', 'Email address is not valid')

		cy.getBySel('settingsForm')
			.contains('Update Settings')
			.should('be.disabled')
	})

	it('should update user settings', () => {
		cy.getBySel('settingsForm')
			.getByName('firstName')
			.clear()
			.type('Admin')
			.blur()
		cy.getBySel('settingsForm')
			.getByName('lastName')
			.clear()
			.type('Admin')
			.blur()
		cy.getBySel('settingsForm')
			.getByName('email')
			.clear()
			.type('admin@localhost.org')
			.blur()

		cy.getBySel('settingsForm')
			.contains('Update Settings')
			.should('not.be.disabled')
			.click()

		cy.getBySel('successMsg').contains('Settings changed!')
	})
})
