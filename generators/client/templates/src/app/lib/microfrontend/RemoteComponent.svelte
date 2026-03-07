<script>
	import { onMount } from 'svelte';

	export let remoteUrl = 'http://localhost:5001';
	export let componentName = 'RemoteComponent';
	export let props = {};

	let RemoteComponent;
	let error = null;
	let loading = true;

	onMount(async () => {
		try {
			// Load the remote entry script
			await loadRemoteEntry(`${remoteUrl}/remoteEntry.js`);
			
			// Get the remote component
			RemoteComponent = await loadRemoteComponent(componentName);
			loading = false;
		} catch (err) {
			error = err.message;
			loading = false;
		}
	});

	async function loadRemoteEntry(url) {
		return new Promise((resolve, reject) => {
			const script = document.createElement('script');
			script.src = url;
			script.type = 'text/javascript';
			script.onload = resolve;
			script.onerror = reject;
			document.head.appendChild(script);
		});
	}

	async function loadRemoteComponent(name) {
		const factory = window[ '<%= remoteName || "remote-app" %>' ].get(name);
		const Component = factory();
		return Component;
	}
</script>

<div class="remote-component-container">
	{#if loading}
		<div class="loading">Loading remote component...</div>
	{:else if error}
		<div class="error">Error loading component: {error}</div>
	{:else if RemoteComponent}
		<svelte:component this={RemoteComponent} {...props} />
	{/if}
</div>

<style>
	.remote-component-container {
		width: 100%;
		height: 100%;
	}

	.loading,
	.error {
		padding: 1rem;
		text-align: center;
	}

	.error {
		color: #dc3545;
	}
</style>
