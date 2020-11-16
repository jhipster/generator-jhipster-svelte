// ***********************************************
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
Cypress.Commands.add('getBySel', (selector, ...args) => {
	return cy.get(`[data-test=${selector}]`, ...args)
})

Cypress.Commands.add('getByName', selector => {
	return cy.get(`[name=${selector}]`)
})

Cypress.Commands.add('loginByApi', (username, password) => {
	cy.request({ method: 'GET', url: `api/authenticate` })
		.then(res => {
			expect(res.status).to.eq(200)
			return cy.getCookie('XSRF-TOKEN').should('have.property', 'value')
		})
		.then(csrfCookie => {
			return cy.request({
				method: 'POST',
				url: `api/authentication`,
				form: true,
				headers: {
					'X-XSRF-TOKEN': csrfCookie,
				},
				body: {
					username: username,
					password: password,
					'remember-me': false,
				},
			})
		})
		.then(res => {
			expect(res.status).to.eq(200)
			return cy.request('GET', `api/account`)
		})
		.then(res => {
			expect(res.status).to.eq(200)
		})
})
