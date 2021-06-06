<script>
	import { goto } from '$app/navigation'
	import { page } from '$app/stores'
	import { onMount } from 'svelte'
	import auth from '$lib/auth/auth-store.js'

	const allowedUnAuthenticatedRoutes = [
		'/login',
		'/account/register',
		'/account/activate',
		'/account/reset/init',
		'/account/reset/finish',
	]

	$: routeAccessAllowed =
		($auth && $auth.login) ||
		($page &&
			$page.path &&
			[...allowedUnAuthenticatedRoutes, '/'].includes($page.path))

	function checkIfCurrentRouteAccessNotAllowed() {
		if (
			$auth &&
			$auth.login &&
			$page &&
			$page.path &&
			allowedUnAuthenticatedRoutes.includes($page.path)
		) {
			goto('/')
		} else if (!routeAccessAllowed) {
			goto('/login')
		}
	}
	onMount(() => checkIfCurrentRouteAccessNotAllowed())
</script>

{#if routeAccessAllowed}
	<slot />
{/if}
