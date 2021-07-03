<script>
	import { onMount } from 'svelte'

	import Page from '$lib/page/Page.svelte'
	import loggerService from '$lib/admin/logger/logger-service'
	import LoggerTable from '$lib/admin/logger/LoggerTable.svelte'
	import SearchForm from '$lib/page/SearchForm.svelte'

	let error
	let loading = true
	let loggers = []
	let filteredLoggers = []
	let levels = []

	onMount(() => fetchLoggers())

	function fetchLoggers() {
		loading = true
		error = undefined
		loggerService
			.fetchLoggers()
			.then(res => {
				let response = JSON.parse(res)
				loggers = filteredLoggers = Object.entries(
					response.loggers
				).map(([key, logger]) => ({
					name: key,
					level: logger.effectiveLevel,
				}))
				levels = response.levels
			})
			.catch(err => (error = err))
			.finally((loading = false))
	}

	function changeLogLevel(event) {
		loggerService
			.changeLogLevel(event.detail.name, event.detail.level)
			.then(res => fetchLoggers())
			.catch(err => (error = err))
	}

	function filterLoggers(event) {
		filteredLoggers = loggers.filter(
			logger =>
				!event.detail.criteria ||
				logger.name
					.toLowerCase()
					.includes(event.detail.criteria.toLowerCase())
		)
	}
</script>

<svelte:head>
	<title>Loggers</title>
	<meta name="Description" content="Loggers list" />
</svelte:head>
<Page testId="loggers" width="full">
	<div
		class="text-left flex flex-row justify-between items-center"
		slot="header"
	>
		<span>Loggers</span>
		<div class="flex flex-row justify-end text-base">
			<SearchForm
				testId="logger"
				name="logger"
				isFilter="true"
				on:filter="{filterLoggers}"
			/>
		</div>
	</div>
	{#if !loading && loggers.length}
		<LoggerTable
			loggers="{filteredLoggers}"
			levels="{levels}"
			on:changeloglevel="{changeLogLevel}"
		/>
	{/if}
</Page>
