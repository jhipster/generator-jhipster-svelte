import { expect } from "@playwright/test";

export class ApiEndPoint {

	constructor(context) {
		this.context = context;
		this.globalCookies = [];
	}

	async login(username, password) {
		const authenticateResponse = await this.context.request.get('api/authenticate');
		expect(authenticateResponse.status()).toEqual(200);

		const cookies = await this.context.cookies();
		const csrfCookie = cookies[0].value;

		const loginWithCsrfCookie = await this.context.request.post('api/authentication', {
			headers: {
				'X-XSRF-TOKEN': csrfCookie,
			},
			form: {
				'username': username,
				'password': password,
				'remember-me': true,
			},
		});
		expect(loginWithCsrfCookie.status()).toEqual(200);

		this.globalCookies = await this.context.cookies();

		const accountResponse = await this.context.request.get('api/account');
		expect(accountResponse.status()).toEqual(200);
	}

	async save(url, body, status = 201 ) {
		const globalCsrfCookies = this.globalCookies[1].value;

		const saveWithCsrfCookie = await this.context.request.post(url, {
			headers: {
				'X-XSRF-TOKEN': globalCsrfCookies,
				'Content-Type': 'application/json',
			},
			data: body,
		});
		expect(saveWithCsrfCookie.status()).toEqual(status);

		if (saveWithCsrfCookie.status() === status) {
			return await saveWithCsrfCookie.json();
		}
	}

	async delete(url, lenient = true) {
		const globalCsrfCookies = this.globalCookies[1].value;

		const deleteWithCsrfCookie = await this.context.request.delete(url, {
			headers: {
				'X-XSRF-TOKEN': globalCsrfCookies,
			},
			failOnStatusCode: lenient ? false : true
		});

		if(!lenient) {
			expect(deleteWithCsrfCookie).status(204);
		}
	}

}
