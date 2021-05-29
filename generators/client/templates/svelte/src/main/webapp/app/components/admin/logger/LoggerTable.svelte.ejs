<script>
	import { createEventDispatcher } from 'svelte'

	import Table from '../../table/Table.svelte'
	import TableRow from '../../table/TableRow.svelte'
	import TableHeader from '../../table/TableHeader.svelte'
	import TableData from '../../table/TableData.svelte'
	import Button from '../../Button.svelte'

	export let levels = []
	export let loggers = []
	const dispatch = createEventDispatcher()

	function changeLogLevel(name, level) {
		dispatch('changeloglevel', {
			name: name,
			level: level,
		})
	}
</script>

<Table testId="loggers">
	<thead slot="head">
		<TableRow classes="bg-gray-100 dark:bg-gray-700">
			<TableHeader>
				<span>Name</span>
			</TableHeader>
		</TableRow>
	</thead>
	<tbody>
		{#each loggers as logger (logger.name)}
			<TableRow let:showActions>
				<TableData>
					<div
						class="flex flex-row flex-nowrap items-center justify-between my-2"
					>
						<div class="break-words overflow-ellipsis">
							{logger.name}
						</div>
						<div
							class="absolute flex flex-row flex-nowrap right-2 bg-white dark:bg-gray-800"
							class:hover:bg-gray-50="{showActions}"
							class:dark:hover:bg-gray-800="{showActions}"
						>
							{#each levels as level (level)}
								<Button
									role="{logger.level === level
										? 'primary'
										: 'outline'}"
									disabled="{logger.level === level}"
									on:click="{changeLogLevel(
										logger.name,
										level
									)}"
									title="Click to change log level to {level}"
									data-test="{level.toLowerCase()}LogLevelBtn"
									classes="mr-2 py-1 my-2 {!showActions &&
									logger.level !== level
										? 'hidden'
										: ''}">{level}</Button
								>
							{/each}
						</div>
					</div>
				</TableData>
			</TableRow>
		{:else}
			<div class="flex flex-row justify-center py-4">
				No logger available
			</div>
		{/each}
	</tbody>
</Table>
