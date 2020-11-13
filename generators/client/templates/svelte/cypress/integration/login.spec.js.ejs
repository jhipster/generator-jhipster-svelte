describe('User login', () => {
	beforeEach(() => {
		cy.visit('/login')
	})

	it('should greets with Sign in', () => {
		cy.getBySel('signInTitle')
			.should('be.visible')
			.should('contain', 'Sign in to SvelteHipster')
	})

	it('should display link to register', () => {
		cy.getBySel('registerLink')
			.should('have.text', 'Create an account')
			.should('have.attr', 'href', '/account/register')
	})

	it('should display link to forgot password', () => {
		cy.getBySel('forgotPwdLink')
			.should('have.text', 'Forgot password?')
			.should('have.attr', 'href', '/account/reset/init')
	})

	it('should require username and password', () => {
		cy.getBySel('loginForm').contains('Sign in').should('be.disabled')
	})

	it('should require username', () => {
		cy.getBySel('loginForm')
			.getByName('username')
			.type('admin')
			.clear()
			.blur()
		cy.getBySel('loginForm')
			.getBySel('username-error')
			.should('be.visible')
			.and('contain', 'Username is mandatory')
	})

	it('should require password', () => {
		cy.getBySel('loginForm')
			.getByName('password')
			.type('admin')
			.clear()
			.blur()
		cy.getBySel('loginForm')
			.getBySel('password-error')
			.should('be.visible')
			.and('contain', 'Password is mandatory')
	})

	it('should require a valid username and password', () => {
		cy.getBySel('loginForm')
			.getByName('username')
			.type('admin')
			.getByName('password')
			.type('invalid{enter}')
		cy.getBySel('errorMsg').should(
			'contain',
			'Incorrect username or password.'
		)
	})

	it('should navigate to / on successful login', () => {
		cy.getBySel('loginForm')
			.getByName('username')
			.type('admin')
			.getByName('password')
			.type('admin{enter}')
		cy.location('pathname').should('eq', '/')
	})
})
