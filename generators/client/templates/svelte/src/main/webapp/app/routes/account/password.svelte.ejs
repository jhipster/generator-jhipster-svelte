<script>
	import accountService from './../../components/account/account-service'
	import Alert from './../../components/Alert.svelte'
	import Page from './../../components/page/Page.svelte'
	import ChangePasswordForm from '../../components/account/ChangePasswordForm.svelte'

	let error
	let currentPassword
	let newPassword
	let passwordChanged = false

	function changePassword() {
		error = undefined
		passwordChanged = false
		accountService
			.changeAccountPassword(currentPassword, newPassword)
			.then(() => (passwordChanged = true))
			.catch(err => ((currentPassword = ''), (error = err)))
	}
</script>

<svelte:head>
	<title>Change password</title>
	<meta name="Description" content="Change password" />
</svelte:head>

<Page testId="password">
	<span slot="header">Change password</span>
	<svelte:fragment slot="alerts">
		<Alert
			data-test="successMsg"
			show="{passwordChanged}"
			closeable="{false}">Password changed!</Alert
		>
		<Alert
			data-test="errorMsg"
			type="danger"
			show="{error}"
			closeable="{false}"
			>An error has occurred! The password could not be changed.</Alert
		>
	</svelte:fragment>
	<ChangePasswordForm
		bind:currentPassword
		bind:newPassword
		on:click="{changePassword}"
	/>
</Page>
