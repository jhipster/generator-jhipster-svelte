<script>
	import { createEventDispatcher, onMount } from 'svelte'

	import Pagination from '$lib/table/Pagination.svelte'

	export let component
	export let clientSidePagination = false
	export let paginationKey
	export let page = 1
	export let pageSize = 15
	export let sortOrder = 'asc'
	export let sortPredicate = 'id'
	export let totalCount = 0
	export let props
	export let events

	let paginatedRecords
	let paginatedProps
	let instance
	const dispatch = createEventDispatcher()

	function fetchRecords() {
		dispatch('fetch', { page, pageSize, sortPredicate, sortOrder })
	}

	function sortByPredicate(event) {
		sortPredicate = event.detail.sortPredicate
		sortOrder = event.detail.sortOrder
		if (!(clientSidePagination && paginationKey)) {
			fetchRecords()
		}
	}

	function handlePageChange(event) {
		page = event.detail.page
		if (!(clientSidePagination && paginationKey)) {
			fetchRecords()
		} else {
			dispatch('pagechange', { page, pageSize })
		}
	}

	$: if (instance && events) {
		for (let eventKey of events) {
			instance.$on(eventKey, event => {
				dispatch(eventKey, { ...event.detail })
			})
		}
	}

	$: {
		if (clientSidePagination && paginationKey) {
			const pageStart = totalCount === 0 ? 0 : (page - 1) * pageSize
			const pageEnd =
				page * pageSize > totalCount ? totalCount : page * pageSize
			const paginatedRecords = props[paginationKey].slice(
				pageStart,
				pageEnd
			)
			paginatedProps = { ...props, [paginationKey]: paginatedRecords }
		} else {
			paginatedProps = props
		}
	}
</script>

<Pagination
	totalCount="{totalCount}"
	pageSize="{pageSize}"
	page="{page}"
	classes="my-2"
	on:pagechange="{handlePageChange}"
/>
<svelte:component
	this="{component}"
	sortPredicate="{sortPredicate}"
	{...paginatedProps}
	on:sortbypredicate="{sortByPredicate}"
	bind:this="{instance}"
/>
<Pagination
	totalCount="{totalCount}"
	pageSize="{pageSize}"
	page="{page}"
	classes="mt-4"
	on:pagechange="{handlePageChange}"
/>
