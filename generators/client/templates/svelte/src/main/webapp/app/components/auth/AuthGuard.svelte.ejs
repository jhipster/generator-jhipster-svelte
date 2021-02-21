<script>
	import { goto, stores } from '@sapper/app'
	import { onMount } from 'svelte'
	import auth from './auth-store.js'

	const { page } = stores()
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
