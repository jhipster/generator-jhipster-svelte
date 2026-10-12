<script>
	export let initial = 0;
	let count = initial;
</script>

<section aria-label="Independent counter">
	<h2>Independent Svelte component v3</h2>
	<p>Count: <output>{count}</output></p>
	<button on:click={() => (count += 1)}>Increment remote counter</button>
</section>
