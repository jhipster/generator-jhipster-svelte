<script>
	import { stores } from '@sapper/app'
	import accountService from './../../../components/account/account-service'

	import Alert from './../../../components/Alert.svelte'
	import Page from '../../../components/page/Page.svelte'
	import ResetPasswordForm from '../../../components/account/ResetPasswordForm.svelte'

	let error
	let password
	let passwordReset = false

	const { page } = stores()

	$: passwordResetKey = $page && $page.query && $page.query.key

	function resetPassword() {
		error = undefined
		passwordReset = false
		accountService
			.resetAccountPassword(passwordResetKey, password)
			.then(() => (passwordReset = true))
			.catch(err => ((password = ''), (error = err)))
	}
</script>

<svelte:head>
	<title>Reset your password</title>
	<meta name="Description" content="Reset your password" />
</svelte:head>

<Page testId="forgotPwd">
	<span slot="header">Reset your password</span>
	<svelte:fragment slot="alerts">
		<Alert show="{passwordReset}" closeable="{false}">
			Your password has been reset. Please <a
				class="font-semibold underline"
				href="/login">Sign in</a
			>.
		</Alert>
		<Alert
			type="warning"
			show="{passwordResetKey && !passwordReset && !error}"
			closeable="{false}">Choose a new password</Alert
		>
		<Alert
			type="danger"
			show="{!passwordResetKey || error}"
			closeable="{false}"
		>
			{#if !passwordResetKey}
				The password reset key is missing.
			{:else}
				Your password couldn't be reset. Remember a password request is
				only valid for 24 hours.
			{/if}
		</Alert>
	</svelte:fragment>
	{#if passwordResetKey && !passwordReset}
		<ResetPasswordForm bind:password on:click="{resetPassword}" />
	{/if}
</Page>
