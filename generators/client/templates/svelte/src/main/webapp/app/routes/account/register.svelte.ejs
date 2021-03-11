<script>
	import accountService from './../../components/account/account-service'
	import { problemBaseUrl } from './../../utils/env'

	import Alert from './../../components/Alert.svelte'
	import Page from '../../components/page/Page.svelte'
	import RegisterUserForm from '../../components/account/RegisterUserForm.svelte'

	let username
	let email
	let password

	let error
	let accountCreated = false

	function createUserAccount() {
		error = undefined
		accountCreated = false
		accountService
			.createAccount(username, email, password)
			.then(() => (accountCreated = true))
			.catch(err => {
				password = ''
				if (err && err.type) {
					if (err.type === problemBaseUrl + '/email-already-used') {
						error = 'duplicateEmail'
					} else if (
						err.type ===
						problemBaseUrl + '/login-already-used'
					) {
						error = 'duplicateLogin'
					} else {
						error = 'error'
					}
				} else {
					error = 'error'
				}
			})
	}
</script>

<svelte:head>
	<title>Create user account</title>
	<meta name="Description" content="Sign up - Create user account" />
</svelte:head>

<Page testId="register">
	<span slot="header">Create user account</span>
	<svelte:fragment slot="alerts">
		<Alert
			data-test="successMsg"
			show="{accountCreated}"
			closeable="{false}"
		>
			User account successfully created. Please check your email for
			confirmation.
		</Alert>
		<Alert data-test="errorMsg" type="danger" show="{!!error}">
			{#if error === 'duplicateEmail'}
				Email is already in use. Please choose another one.
			{:else if error === 'duplicateLogin'}
				Login name already in use. Please choose another one.
			{:else if error}
				User account creation failed. Please try again later.
			{/if}
		</Alert>
	</svelte:fragment>
	{#if !accountCreated}
		<RegisterUserForm
			bind:username
			bind:email
			bind:password
			on:click="{createUserAccount}"
		/>
	{/if}
</Page>
