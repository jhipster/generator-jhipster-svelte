import { serverUrl } from '$lib/utils/env'
import { request } from 'jhipster-svelte-library/utils'

export default {
	fetchUserDetails: (page, size, sortPredicate, sortOrder) => {
		const defaultSort = sortPredicate !== 'id' ? '&sort=id,asc' : ''
		const queryString = `page=${
			page - 1
		}&size=${size}&sort=${sortPredicate},${sortOrder}${defaultSort}`
		return request(`${serverUrl}api/admin/users?${queryString}`)
	},
	create: user =>
		request(`${serverUrl}api/admin/users`, 'POST', JSON.stringify(user), {
			'Content-Type': 'application/json',
		}),
	update: user =>
		request(`${serverUrl}api/admin/users`, 'PUT', JSON.stringify(user), {
			'Content-Type': 'application/json',
		}),
	delete: login => request(`${serverUrl}api/admin/users/${login}`, 'DELETE'),
	fetchUserByLogin: login => request(`${serverUrl}api/admin/users/${login}`),
	fetchAuthorities: () => request(`${serverUrl}api/authorities`),
}
