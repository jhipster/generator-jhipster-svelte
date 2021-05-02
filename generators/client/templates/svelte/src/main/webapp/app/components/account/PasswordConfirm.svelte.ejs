<script>
	import { createEventDispatcher } from 'svelte'
	import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons/faExclamationCircle'

	import Password from './Password.svelte'
	import Icon from '../Icon.svelte'

	export let label = 'Password'
	export let name = 'password'
	export let value = ''
	const dispatch = createEventDispatcher()

	let confirmPassword

	let validPassword = false
	let validConfirmPassword = false

	$: confirmPasswordMismatch =
		validConfirmPassword && value !== confirmPassword

	function handlePassword(event) {
		value = event.target.value
		dispatch('input', { value })
	}

	function handlePasswordValidation(event) {
		validPassword = event.detail.valid
		dispatch('validate', { valid: isValid() })
	}

	function handleConfirmPasswordValidation(event) {
		validConfirmPassword = event.detail.valid
		dispatch('validate', { valid: isValid() })
	}
	function isValid() {
		return (
			validPassword && validConfirmPassword && value === confirmPassword
		)
	}
</script>

<Password
	name="{name}"
	label="{label}"
	value="{value}"
	on:input="{handlePassword}"
	on:validate="{handlePasswordValidation}"
/>

<Password
	label="Confirm {label}"
	value="{confirmPassword}"
	name="{name}Confirm"
	on:input="{event => (confirmPassword = event.target.value)}"
	on:validate="{handleConfirmPasswordValidation}"
	let:message
	let:dirty
	let:valid
>
	<div data-test="{name}Confirm-error" class="flex items-center">
		{#if confirmPasswordMismatch}
			<Icon classes="mr-2" icon="{faExclamationCircle}" />
			Password and its confirmation do not match
		{:else if dirty && !valid}
			<Icon classes="mr-2" icon="{faExclamationCircle}" />
			{message}
		{:else}&nbsp;{/if}
	</div>
</Password>
