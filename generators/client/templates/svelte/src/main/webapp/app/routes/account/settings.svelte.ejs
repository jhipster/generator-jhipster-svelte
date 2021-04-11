<script>
	import { onMount } from 'svelte'
	import auth from '../../components/auth/auth-store.js'
	import accountService from './../../components/account/account-service'
	import Alert from './../../components/Alert.svelte'
	import Page from '../../components/page/Page.svelte'
	import UserSettingsForm from '../../components/account/UserSettingsForm.svelte'

	let error
	let user = {}
	let settingsUpdated = false

	onMount(() => initAccount())

	function initAccount() {
		user = {
			...user,
			login: $auth.login,
			firstName: $auth.firstName,
			lastName: $auth.lastName,
			email: $auth.email,
		}
	}

	function updateAccount(event) {
		error = undefined
		settingsUpdated = false
		const updatedAccount = { ...$auth, ...event.detail }
		accountService
			.updateAccount(updatedAccount)
			.then(() => auth.loadUser())
			.then(() => (settingsUpdated = true))
			.catch(err => (error = err))
	}
</script>

<svelte:head>
	<title>Update user settings</title>
	<meta name="Description" content="Update user settings" />
</svelte:head>

<Page testId="settings">
	<span slot="header">User settings for [{user ? user.login : ''}]</span>
	<svelte:fragment slot="alerts">
		<Alert
			data-test="successMsg"
			show="{settingsUpdated}"
			closeable="{false}">Settings changed!</Alert
		>
		<Alert
			data-test="errorMsg"
			type="danger"
			show="{error}"
			closeable="{false}"
			>An error has occurred! The user settings could not be saved.</Alert
		>
	</svelte:fragment>
	<UserSettingsForm user="{user}" on:updatesettings="{updateAccount}" />
</Page>
