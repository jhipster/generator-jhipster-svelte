<script>
	import { onMount } from 'svelte'
	import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck'
	import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons/faExclamationTriangle'

	import notification from './notification-store'
	import Icon from '../Icon.svelte'

	export let message
	export let type = 'success'
	export let index
	export let timeout = 3000

	let testId = 'toast'
	let show = true
	let closeable = true

	onMount(() => {
		const ref = setTimeout(() => {
			notification.remove(message, index)
		}, timeout)

		return () => clearTimeout(ref)
	})

	function closeAlert() {
		show = false
	}
</script>

<div class="absolute w-1/2 z-20">
	<div
		class:hidden="{!show}"
		class="mt-4 flex justify-between transition-colors duration-150 rounded text-sm border-2 border-gray-300 shadow-lg"
	>
		<div
			class="p-4"
			class:bg-green-200="{type === 'success'}"
			class:dark:bg-green-200="{type === 'success'}"
			class:text-green-900="{type === 'success'}"
			class:dark:text-green-900="{type === 'success'}"
			class:bg-red-200="{type === 'danger'}"
			class:dark:bg-red-200="{type === 'danger'}"
			class:text-red-900="{type === 'danger'}"
			class:dark:text-red-900="{type === 'danger'}"
		>
			<Icon
				icon="{type === 'success' ? faCheck : faExclamationTriangle}"
			/>
		</div>
		<div class="px-5 py-3" data-test="{testId}-{type}" {...$$restProps}>
			{message}
		</div>
		{#if closeable}
			<button
				class:hover:text-red-700="{type === 'danger'}"
				class:dark:hover:text-red-500="{type === 'danger'}"
				class="self-start text-3xl leading-4 bg-transparent border-0 pt-3 px-3 focus:outline-none"
				on:click|preventDefault="{closeAlert}">&times</button
			>
		{/if}
	</div>
</div>
