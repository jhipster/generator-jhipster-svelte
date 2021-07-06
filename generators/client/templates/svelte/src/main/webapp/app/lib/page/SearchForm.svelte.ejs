<script>
	import { createEventDispatcher } from 'svelte'
	import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch.js'

	import Icon from '$lib/Icon.svelte'
	import Form from '$lib/page/Form.svelte'
	import SearchControl from '$lib/SearchControl.svelte'

	export let testId
	export let name
	export let isFilter = false

	let criteria = ''
	const dispatch = createEventDispatcher()

	function handleSearch() {
		dispatch('search', {
			criteria,
		})
	}

	function updateCriteria(event) {
		criteria = event.target.value
		if (isFilter) {
			dispatch('filter', {
				criteria,
			})
		}
	}

	$: labelPrefix = isFilter ? 'Filter' : 'Search'
</script>

<Form testId="{testId}Search" classes="mt-0" role="search">
	<div class="flex flex-row justify-center items-center sm:w-full">
		<SearchControl
			label="{labelPrefix} {name}"
			name="{name}"
			value="{criteria}"
			placeholder="{labelPrefix} {name}"
			hasSearchBtn="{!isFilter}"
			on:input="{updateCriteria}"
		/>
		{#if !isFilter}
			<button
				type="submit"
				class="p-4 leading-none font-bold rounded-r-full transition-colors duration-200 disabled:opacity-75 disabled:pointer-events-none bg-primary-700 text-white dark:bg-primary-500 dark:text-gray-100 hover:bg-primary-800 dark:hover:bg-primary-400 focus:outline-none focus:ring-1 focus:ring-primary-500"
				on:click|preventDefault="{handleSearch}"
				aria-label="{labelPrefix} {name}"
			>
				<Icon classes="mr-2" icon="{faSearch}" />
			</button>
		{/if}
	</div>
</Form>
