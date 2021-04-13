describe('Register User', () => {
	beforeEach(() => {
		cy.unregisterServiceWorkers()
		cy.visit('/account/register')
	})

	it('should greets with Create user title', () => {
		cy.getBySel('registerTitle')
			.should('be.visible')
			.should('contain', 'Create user account')
	})

	it('should require mandatory fields', () => {
		cy.getBySel('registerForm')
			.contains('Create account')
			.should('be.disabled')
	})

	it('should require username', () => {
		cy.getBySel('registerForm')
			.getByName('username')
			.type('admin')
			.clear()
			.blur()
		cy.getBySel('registerForm')
			.getBySel('username-error')
			.should('be.visible')
			.and('contain', 'Username is mandatory')
	})

	it('should require email', () => {
		cy.getBySel('registerForm')
			.getByName('email')
			.type('admin@localhost.org')
			.clear()
			.blur()
		cy.getBySel('registerForm')
			.getBySel('email-error')
			.should('be.visible')
			.and('contain', 'Email is mandatory')
	})

	it('should require valid email', () => {
		cy.getBySel('registerForm')
			.getByName('email')
			.type('admin@localhost')
			.blur()
		cy.getBySel('registerForm')
			.getBySel('email-error')
			.should('be.visible')
			.and('contain', 'Email address is not valid')
	})

	it('should require password', () => {
		cy.getBySel('registerForm')
			.getByName('password')
			.type('password')
			.clear()
			.blur()
		cy.getBySel('registerForm')
			.getBySel('password-error')
			.should('be.visible')
			.and('contain', 'Password is mandatory')
	})

	it('should require confirm password', () => {
		cy.getBySel('registerForm')
			.getByName('passwordConfirm')
			.type('password')
			.clear()
			.blur()
		cy.getBySel('registerForm')
			.getBySel('passwordConfirm-error')
			.should('be.visible')
			.and('contain', 'Password is mandatory')
	})

	it('should require password and confirm password to match', () => {
		cy.getBySel('registerForm').getByName('password').type('abcd').blur()
		cy.getBySel('registerForm')
			.getByName('passwordConfirm')
			.type('defg')
			.blur()
		cy.getBySel('registerForm')
			.getBySel('passwordConfirm-error')
			.should('be.visible')
			.and('contain', 'Password and its confirmation do not match')
	})

	it('should not allow user account creation with duplicate username', () => {
		cy.getBySel('registerForm')
			.getByName('username')
			.type('admin')
			.getByName('email')
			.type('joe@localhost.org')
			.getByName('password')
			.type('jondoe')
			.getByName('passwordConfirm')
			.type('jondoe')
		cy.getBySel('registerForm')
			.contains('Create account')
			.should('not.be.disabled')
			.click()
		cy.getBySel('errorMsg').contains(
			'Login name already in use. Please choose another one.'
		)
	})

	it('should create new user account', () => {
		cy.getBySel('registerForm')
			.getByName('username')
			.type('jon')
			.getByName('email')
			.type('joe@localhost.org')
			.getByName('password')
			.type('jondoe')
			.getByName('passwordConfirm')
			.type('jondoe')
		cy.getBySel('registerForm')
			.contains('Create account')
			.should('not.be.disabled')
			.click()
		cy.getBySel('successMsg').contains(
			'User account successfully created. Please check your email for confirmation.'
		)
		cy.getBySel('registerForm').should('not.exist')
	})
})
