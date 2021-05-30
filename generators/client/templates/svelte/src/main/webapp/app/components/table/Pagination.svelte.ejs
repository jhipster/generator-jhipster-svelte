<script>
	import { createEventDispatcher } from 'svelte'
	import { faAngleLeft } from '@fortawesome/free-solid-svg-icons/faAngleLeft'
	import { faAngleRight } from '@fortawesome/free-solid-svg-icons/faAngleRight'

	import Button from '../Button.svelte'
	import Icon from '../Icon.svelte'

	const dispatch = createEventDispatcher()
	export let totalCount = 0
	export let pageSize = 15
	export let page = 1
	export let classes = ''

	$: pageStart = (page - 1) * pageSize + 1
	$: pageEnd = page * pageSize > totalCount ? totalCount : page * pageSize
	$: pages = totalCount === 0 ? 0 : Math.ceil(totalCount / pageSize)

	function fetchLastPage() {
		dispatch('pagechange', { page: page - 1 })
	}

	function fetchNextPage() {
		dispatch('pagechange', { page: page + 1 })
	}
</script>

<div
	class="flex flex-row justify-end items-center {classes}"
	data-test="pageCtrl"
>
	<div>{pageStart}-{pageEnd} of {totalCount}</div>
	<div class="flex flex-row w-36 justify-center items-center">
		<Button
			role="action"
			classes="sm:my-0"
			disabled="{page === 1}"
			on:click="{fetchLastPage}"
			title="Previous"
			data-test="prevPageCtrl"
		>
			<Icon icon="{faAngleLeft}" />
		</Button>
		<div
			class="font-bold bg-primary-700 dark:bg-primary-500 text-white py-2 px-4 rounded"
		>
			{page}
		</div>
		<Button
			role="action"
			classes="sm:my-0"
			disabled="{page === pages}"
			on:click="{fetchNextPage}"
			title="Next"
			data-test="nextPageCtrl"
		>
			<Icon icon="{faAngleRight}" />
		</Button>
	</div>
</div>
