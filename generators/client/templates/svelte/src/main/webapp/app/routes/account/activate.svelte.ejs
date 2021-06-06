<script>
	import { onMount } from 'svelte'
	import { page } from '$app/stores'

	import accountService from '$lib/account/account-service'
	import Alert from '$lib/Alert.svelte'
	import Page from '$lib/page/Page.svelte'

	let error
	let accountActivated = false

	$: activationKey = $page && $page.query && $page.query.key

	onMount(() => activateUserAccount())

	function activateUserAccount() {
		error = undefined
		accountActivated = false
		accountService
			.activateAccount(activationKey)
			.then(() => (accountActivated = true))
			.catch(err => (error = err))
	}
</script>

<svelte:head>
	<title>Activate user account</title>
	<meta name="Description" content="Activate user account" />
</svelte:head>

<Page testId="activate">
	<span slot="header">Activate user account</span>
	<svelte:fragment slot="alerts">
		<Alert show="{accountActivated}" closeable="{false}">
			<span>Your user account has been activated. Please </span>
			<a class="font-semibold underline" href="/login">Sign in</a>.
		</Alert>
		<Alert type="danger" show="{!!error}" closeable="{false}">
			Your user could not be activated. Please use the registration form
			to <a class="font-semibold underline" href="/account/register"
				>Sign up</a
			>.
		</Alert>
	</svelte:fragment>
</Page>
