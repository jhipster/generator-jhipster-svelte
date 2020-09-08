function getCookieValue(cookieName) {
	if (!document.cookie) {
		return undefined
	}

	const values = document.cookie
		.split(';')
		.map(c => c.trim())
		.filter(c => c.startsWith(cookieName + '='))
		.map(c => c.split('=')[1])
		.map(c => decodeURIComponent(c))

	return values.length ? values[0] : undefined
}

export function prepareRequest(method = 'GET', body = undefined, headers = {}) {
	let requestHeaders = { ...headers }
	if (['POST', 'PUT', 'DELETE'].includes(method)) {
		const csrfCookieValue = getCookieValue('XSRF-TOKEN')
		if (csrfCookieValue) {
			requestHeaders = {
				...requestHeaders,
				'X-XSRF-TOKEN': csrfCookieValue,
			}
		}
	}

	return {
		method,
		body,
		credentials: 'include',
		headers: requestHeaders,
	}
}
