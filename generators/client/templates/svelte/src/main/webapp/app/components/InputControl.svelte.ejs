<script>
	import { createEventDispatcher, afterUpdate } from 'svelte'
	import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons/faExclamationCircle'

	import Icon from './Icon.svelte'
	import { validate, createValidator } from '../utils/validator.js'

	export let value = ''
	export let type = 'text'
	export let name
	export let label
	export let validations = []
	export let id

	let dirty = false
	let valid = false
	let message
	let focused = false
	const dispatch = createEventDispatcher()
	const idVal = id ? id : name + Date.now()

	$: focusedOrContainsValue = value !== '' || focused
	$: pristine = !focused && !dirty
	$: pristineOrValid = pristine || valid
	$: focusedAndValidOrPristine = focused && (!dirty || valid)
	$: dirtyAndInvalid = dirty && !valid
	$: isRequired =
		validations.find(validation => validation.type === 'required') !==
		undefined

	function handleValidationResponse(event) {
		dirty = true
		valid = event.detail.valid
		message = event.detail.message
		dispatch('validate', { valid, message })
	}

	afterUpdate(async () => {
		const validationResponse = await createValidator(validations)(value)
		valid = validationResponse.valid
		message = validationResponse.message
		dispatch('validate', { valid: valid, message: message })
	})
</script>

<style>
	input:-webkit-autofill,
	input:-webkit-autofill:hover,
	input:-webkit-autofill:focus,
	input:-webkit-autofill:active {
		-webkit-box-shadow: 0 0 0 30px white inset !important;
	}
	input {
		filter: none;
	}
</style>

<div class="mt-4 relative h-12">
	<label
		class="absolute left-0 px-1 ml-2 transition-all duration-200
			pointer-events-none"
		class:-mt-2="{focusedOrContainsValue}"
		class:bg-white="{focusedOrContainsValue}"
		class:dark:bg-gray-800="{focusedOrContainsValue}"
		class:top-0="{focusedOrContainsValue}"
		class:pt-3="{!focusedOrContainsValue}"
		class:pt-0="{focusedOrContainsValue}"
		class:text-xs="{focusedOrContainsValue}"
		class:text-gray-700="{!focused}"
		class:dark:text-gray-400="{!focused}"
		class:text-primary-700="{focusedAndValidOrPristine}"
		class:dark:text-primary-500="{focusedAndValidOrPristine}"
		class:text-red-600="{dirtyAndInvalid && focused}"
		class:dark:text-red-500="{dirtyAndInvalid && focused}"
		for="{idVal}"
		>{label}<span class="ml-px">{isRequired ? '*' : ''}</span>
	</label>
	<input
		class="px-3 py-3 w-full shadow-none bg-white dark:bg-gray-800 outline-none focus:ring-0 rounded z-10"
		class:border="{!focused}"
		class:border-2="{focused}"
		class:border-gray-400="{pristineOrValid}"
		class:dark:border-gray-700="{pristineOrValid}"
		class:border-primary-600="{focusedAndValidOrPristine}"
		class:dark:border-primary-500="{focusedAndValidOrPristine}"
		class:border-red-600="{dirtyAndInvalid}"
		class:dark:border-red-500="{dirtyAndInvalid}"
		type="{type}"
		name="{name}"
		id="{idVal}"
		value="{value}"
		on:input
		on:focus="{() => (focused = true)}"
		on:blur="{() => (focused = false)}"
		use:validate="{validations}"
		on:validation="{handleValidationResponse}"
		{...$$restProps}
	/>
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
