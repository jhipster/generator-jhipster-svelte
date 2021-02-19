<script>
	import { createEventDispatcher, onDestroy } from 'svelte'
	import { fade, fly } from 'svelte/transition'

	import Button from './Button.svelte'

	export let title
	const dispatch = createEventDispatcher()

	function closeModal() {
		dispatch('close')
	}

	function handleKeydown(event) {
		if (event.key === 'Escape') {
			dispatch('close')
		}
	}
</script>

<svelte:window on:keydown="{handleKeydown}" />
<div
	transition:fade
	class="fixed top-0 left-0 w-full h-full z-100 bg-gray-200 dark:bg-gray-700 opacity-60"
	on:click="{closeModal}"
></div>

<div
	data-test="svlModal"
	transition:fly="{{ y: 200 }}"
	class="fixed bg-white dark:bg-gray-800 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-200 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md"
>
	<h1 class="p-4 m-0 border-b dark:border-gray-700 text-xl font-semibold ">
		{title}
	</h1>
	<div class="p-4 my-4">
		<slot />
	</div>
	<footer class="p-4 flex flex-row justify-end items-center">
		<slot name="footer">
			<Button on:click="{closeModal}">Close</Button>
		</slot>
	</footer>
</div>
