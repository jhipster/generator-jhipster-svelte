<script>
	import { onMount } from 'svelte'
	import { goto } from '@sapper/app'

	import userService from './../../../components/admin/user-management/user-service.js'
	import Page from './../../../components/page/Page.svelte'
	import UserForm from '../../../components/admin/user-management/UserForm.svelte'

	onMount(() => {
		fetchUserAuthorities()
	})

	let error
	let user
	let authorities = []

	function fetchUserAuthorities() {
		userService
			.fetchAuthorities()
			.then(res => (authorities = res))
			.catch(err => (error = err))
	}

	function cancelSave() {
		goto(`/admin/user-management`)
	}

	function saveUser(event) {
		userService
			.create(event.detail)
			.then(() => goto(`/admin/user-management`))
			.catch(err => (error = err))
	}
</script>

<svelte:head>
	<title>Add user account</title>
	<meta name="Description" content="Add user account" />
</svelte:head>
<Page testId="userMgmt">
	<div class="text-left" slot="header">Create user account</div>
	<UserForm
		user="{user}"
		authorities="{authorities}"
		on:cancel="{cancelSave}"
		on:saveorupdate="{saveUser}"
	/>
</Page>
