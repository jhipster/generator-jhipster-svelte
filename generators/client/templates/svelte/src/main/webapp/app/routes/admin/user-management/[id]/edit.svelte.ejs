<script>
	import { onMount } from 'svelte'
	import { goto, stores } from '@sapper/app'

	import userService from './../../../../components/admin/user-management/user-service.js'
	import Page from './../../../../components/page/Page.svelte'
	import UserForm from '../../../../components/admin/user-management/UserForm.svelte'

	const { page } = stores()
	$: id = $page && $page.params && $page.params.id
	onMount(() => {
		fetchUserDetails()
		fetchUserAuthorities()
	})

	let error
	let user
	let authorities = []

	function fetchUserDetails() {
		error = undefined
		userService
			.fetchUserByLogin(id)
			.then(res => (user = res))
			.catch(err => (error = err))
	}

	function fetchUserAuthorities() {
		userService
			.fetchAuthorities()
			.then(res => (authorities = res))
			.catch(err => (error = err))
	}

	function cancelUpdate() {
		goto(`/admin/user-management`)
	}

	function updateUser(event) {
		userService
			.update(event.detail)
			.then(() => goto(`/admin/user-management`))
			.catch(err => (error = err))
	}
</script>

<svelte:head>
	<title>Update user account</title>
	<meta name="Description" content="Update user account" />
</svelte:head>
<Page testId="userMgmt">
	<div class="text-left" slot="header">Update user account</div>
	<UserForm
		user="{user}"
		authorities="{authorities}"
		on:cancel="{cancelUpdate}"
		on:saveorupdate="{updateUser}"
	/>
</Page>
