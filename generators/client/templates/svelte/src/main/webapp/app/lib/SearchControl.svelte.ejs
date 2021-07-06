<script>
	import { createEventDispatcher } from 'svelte'
	import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch.js'

	import Icon from '$lib/Icon.svelte'

	export let value = ''
	export let label
	export let placeholder = ''
	export let name
	export let id
	export let hasSearchBtn = false

	let focused = false
	const idVal = id ? id : name + Date.now()
	const dispatch = createEventDispatcher()

	$: focusedOrContainsValue = value !== '' || focused
	$: focusedAndHasSearchBtn = hasSearchBtn && focused
</script>

<div class="relative">
	<label
		aria-label="{label}"
		class="absolute left-0 px-4 py-3 pointer-events-none"
		class:text-gray-500="{!focused}"
		class:dark:text-gray-700="{!focused}"
		class:text-primary-700="{focused}"
		class:dark:text-primary-500="{focused}"
		for="{idVal}"
	>
		{#if !hasSearchBtn}
			<Icon classes="mr-2" icon="{faSearch}" />
		{/if}
	</label>
	<input
		class="pr-3 py-3 bg-white md:transition-all duration-200 dark:bg-gray-800 outline-none focus:ring-0 shadow-md rounded-full border"
		class:pl-10="{!hasSearchBtn}"
		class:pl-5="{hasSearchBtn}"
		class:rounded-tr-none="{hasSearchBtn}"
		class:rounded-br-none="{hasSearchBtn}"
		class:border-gray-400="{!focused}"
		class:dark:border-gray-700="{!focused}"
		class:border-primary-700="{focused}"
		class:dark:border-primary-400="{focused}"
		class:w-60="{hasSearchBtn}"
		class:w-full="{!hasSearchBtn}"
		class:w-96="{focusedAndHasSearchBtn}"
		type="search"
		name="{name}"
		id="{idVal}"
		value="{value}"
		placeholder="{placeholder}"
		on:input
		on:focus="{() => (focused = true)}"
		on:blur="{() => (focused = false)}"
		{...$$restProps}
	/>
</div>
