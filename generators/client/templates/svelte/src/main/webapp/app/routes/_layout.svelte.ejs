<script>
	import { stores } from '@sapper/app'

	import AuthGuard from '../components/auth/AuthGuard.svelte'
	import Footer from '../components/layout/Footer.svelte'
	import Navbar from '../components/layout/Navbar.svelte'
	import Notification from '../components/notification/Notification.svelte'
	import auth from '../components/auth/auth-store.js'

	const { page } = stores()

	function loadUserDetails() {
		return (
			(process.browser && auth.loadUserIfAuthenticated()) ||
			Promise.resolve()
		)
	}

	$: isLoginRouteActivated = $page && $page.path && $page.path === '/login'
</script>

{#await loadUserDetails() then response}
	<div
		class="flex flex-col text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-900 antialiased min-h-screen font-sans"
	>
		<div class="z-10" class:hidden="{isLoginRouteActivated}">
			<Navbar />
		</div>
		<Notification />
		<main class="flex-grow">
			<AuthGuard>
				<slot />
			</AuthGuard>
		</main>
		<div class:hidden="{isLoginRouteActivated}">
			<Footer />
		</div>
	</div>
{/await}
