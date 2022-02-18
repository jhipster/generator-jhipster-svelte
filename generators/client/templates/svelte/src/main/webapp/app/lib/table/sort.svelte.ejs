<script>
	import { createEventDispatcher } from 'svelte'
	import { faSort } from '@fortawesome/free-solid-svg-icons/faSort'
	import { faArrowDown } from '@fortawesome/free-solid-svg-icons/faArrowDown'
	import { faArrowUp } from '@fortawesome/free-solid-svg-icons/faArrowUp'

	import Icon from '$lib/icon.svelte'

	export let sortPredicate = ''
	export let active = false
	export let hasRecords = true
	let ascending = true
	const dispatch = createEventDispatcher()

	function sortByPredicate() {
		active = true
		ascending = !ascending
		dispatch('sortbypredicate', {
			sortPredicate,
			sortOrder: ascending ? 'asc' : 'desc',
		})
	}
</script>

<button
	aria-label="{sortPredicate}"
	on:click|preventDefault="{sortByPredicate}"
	class="opacity-50 hover:opacity-100 disabled:pointer-events-none disabled:hover:opacity-50"
	disabled="{!hasRecords}"
	title="{active
		? ascending
			? 'Ascending order'
			: 'Descending order'
		: 'Click to sort records'}"
>
	<Icon
		classes="cursor-pointer"
		icon="{active ? (ascending ? faArrowUp : faArrowDown) : faSort}"
	/>
</button>
