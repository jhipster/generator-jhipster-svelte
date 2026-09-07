<script>
	import { onMount } from 'svelte';
	import { loadRemote } from './load-remote.js';
	let target;
	let status = 'Loading independent component';

	onMount(() => {
		let disposed = false;
		let remote;
		loadRemote()
			.then(module => {
				if (disposed) return;
				remote = module.mount(target, { initial: 2 });
				status = 'Independent component loaded';
			})
			.catch(() => {
				if (!disposed) status = 'Independent component unavailable';
			});
		return () => {
			disposed = true;
			remote?.destroy();
		};
	});
</script>

<p role="status">{status}</p>
<div bind:this={target}></div>
