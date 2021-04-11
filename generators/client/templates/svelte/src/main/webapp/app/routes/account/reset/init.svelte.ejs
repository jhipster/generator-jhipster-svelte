<script>
	import accountService from './../../../components/account/account-service'

	import Alert from './../../../components/Alert.svelte'
	import Page from '../../../components/page/Page.svelte'
	import ForgotPasswordForm from '../../../components/account/ForgotPasswordForm.svelte'

	let error
	let email
	let passwordReset = false

	function resetPassword() {
		error = undefined
		passwordReset = false
		accountService
			.initiateResetAccountPassword(email)
			.then(() => (passwordReset = true))
			.catch(err => (error = err))
	}
</script>

<svelte:head>
	<title>Reset your password</title>
	<meta name="Description" content="Reset your password - Init" />
</svelte:head>

<Page testId="forgotPwd">
	<span slot="header">Reset your password</span>
	<svelte:fragment slot="alerts">
		<Alert data-test="successMsg" show="{passwordReset}" closeable="{false}"
			>Check your email for details on how to reset your password.</Alert
		>
		<Alert
			data-test="warningMsg"
			type="warning"
			show="{!passwordReset}"
			closeable="{false}"
			>Enter your user account's verified email address.</Alert
		>
	</svelte:fragment>
	{#if !passwordReset}
		<ForgotPasswordForm bind:email on:click="{resetPassword}" />
	{/if}
</Page>
