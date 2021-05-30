<script>
	import { createEventDispatcher, afterUpdate } from 'svelte'
	import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons/faExclamationCircle'
	import { faCaretDown } from '@fortawesome/free-solid-svg-icons/faCaretDown'

	import Icon from './Icon.svelte'
	import CheckboxControl from './CheckboxControl.svelte'

	export let name = ''
	export let value = []
	export let label = ''
	export let options = []
	export let validations = []

	const dispatch = createEventDispatcher()
	const randomSuffix = Date.now()

	let focused = false
	let isOpen = false

	let dirty = false
	let valid = false
	let message

	$: focusedOrContainsValue = value.length !== 0 || focused
	$: pristine = !focused && !dirty
	$: pristineOrValid = pristine || valid
	$: focusedAndValidOrPristine = focused && (!dirty || valid)
	$: dirtyAndInvalid = dirty && !valid
	$: isRequired =
		validations.find(validation => validation.type === 'required') !==
		undefined

	function selectOption(event) {
		dirty = true
		if (event.target.checked) {
			value = [...value, event.target.value]
		} else {
			value = value.filter(val => val !== event.target.value)
		}

		validateRequired()
		dispatch('select', { value: value })
	}

	afterUpdate(() => validateRequired())

	function validateRequired() {
		if (isRequired && !value.length) {
			valid = false
			message = validations.find(
				validation => validation.type === 'required'
			).message
		} else {
			valid = true
		}

		dispatch('validate', { valid, message })
	}
</script>

<style>
</style>

<div class="mt-4 relative h-12">
	<label
		class="absolute left-0 px-1 ml-2 z-10 transition-all duration-200 rounded pointer-events-none"
		class:z-30="{isOpen}"
		class:-mt-2="{focusedOrContainsValue || isOpen}"
		class:bg-white="{focusedOrContainsValue || isOpen}"
		class:dark:bg-gray-800="{focusedOrContainsValue || isOpen}"
		class:top-0="{focusedOrContainsValue || isOpen}"
		class:pt-3="{!focusedOrContainsValue && !isOpen}"
		class:pt-0="{focusedOrContainsValue || isOpen}"
		class:text-xs="{focusedOrContainsValue || isOpen}"
		class:text-gray-700="{!focused}"
		class:dark:text-gray-200="{!focused}"
		class:text-primary-700="{focusedAndValidOrPristine}"
		class:dark:text-primary-500="{focusedAndValidOrPristine}"
		class:text-red-600="{dirtyAndInvalid && (focused || isOpen)}"
		class:dark:text-red-500="{dirtyAndInvalid && (focused || isOpen)}"
		for="{name + randomSuffix}"
		>{label}<span class="ml-px">{isRequired ? '*' : ''}</span>
	</label>
	<div
		class="w-full relative flex flex-row justify-center items-center rounded bg-white dark:bg-gray-800"
		class:border="{!focused && !isOpen}"
		class:border-2="{focused || isOpen}"
		class:border-gray-400="{pristineOrValid}"
		class:dark:border-gray-700="{pristineOrValid}"
		class:border-primary-600="{focusedAndValidOrPristine ||
			(isOpen && !dirtyAndInvalid)}"
		class:dark:border-primary-500="{focusedAndValidOrPristine ||
			(isOpen && !dirtyAndInvalid)}"
		class:border-red-600="{dirtyAndInvalid}"
		class:dark:border-red-500="{dirtyAndInvalid}"
		class:z-20="{isOpen}"
		class:rounded-bl-none="{isOpen}"
		class:rounded-br-none="{isOpen}"
	>
		<input
			class="px-3 py-3 w-full shadow-none dark:bg-gray-800 outline-none focus:ring-0 overflow-ellipsis whitespace-nowrap overflow-hidden rounded"
			class:z-20="{isOpen}"
			type="text"
			name="{name}"
			readonly
			id="{name + randomSuffix}"
			value="{value && value.length ? value.join(', ') : null}"
			autocomplete="off"
			on:input="{() => (isOpen = !isOpen)}"
			on:focus="{() => ((focused = true), (isOpen = !isOpen))}"
			on:blur="{() => (focused = false)}"
			{...$$restProps}
		/>
		<button
			type="button"
			aria-label="Expand select options"
			tabindex="-1"
			class:z-20="{isOpen}"
			class="focus:outline-none focus:ring-0"
			on:click|preventDefault="{() => (isOpen = !isOpen)}"
		>
			<Icon
				classes="{isOpen ? 'opacity-100' : 'opacity-70'}"
				icon="{faCaretDown}"
			/>
		</button>
	</div>
	{#if isOpen}
		<button
			data-test="{name}-bg"
			tabindex="-1"
			on:click|preventDefault="{() => (isOpen = false)}"
			class="fixed block inset-0 w-full h-full z-10 bg-gray-200 dark:bg-gray-700 opacity-50 cursor-default"
		></button>
	{/if}
	<div
		data-test="{name}-options"
		class:hidden="{!isOpen}"
		class="absolute left-0 w-full py-2 bg-white dark:bg-gray-800 border-b-2 rounded shadow-md border-2 z-10 border-t-0 rounded-tl-none rounded-tr-none"
		class:border-primary-600="{focusedAndValidOrPristine ||
			!dirtyAndInvalid}"
		class:border-red-600="{dirtyAndInvalid}"
	>
		{#each options as option (option.name)}
			<div
				class="block px-3 py-1 rounded-none font-normal hover:text-white dark:hover:text-gray-800 text-gray-800 dark:text-gray-200 hover:bg-primary-600 dark:hover:bg-primary-500"
			>
				<CheckboxControl
					checked="{value.includes(option.value)}"
					group="{value}"
					value="{option.value}"
					on:change="{event => selectOption(event)}"
					>{option.name}</CheckboxControl
				>
			</div>
		{/each}
	</div>
</div>
<div class="flex flex-col mt-1 pr-3 text-xs text-red-600 dark:text-red-500">
	<slot message="{message}" dirty="{dirty}" valid="{valid}">
		{#if dirty && !valid}
			<div data-test="{name}-error" class="flex items-center">
				<Icon classes="mr-2" icon="{faExclamationCircle}" />
				{message}
			</div>
		{:else}&nbsp;{/if}
	</slot>
</div>
