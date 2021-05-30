<script>
	import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons/faExclamationCircle'

	import InputControl from '../InputControl.svelte'
	import Icon from '../Icon.svelte'

	export let name = 'password'
	export let label = 'Password'
	export let value = ''
</script>

<InputControl
	type="password"
	label="{label}"
	value="{value}"
	name="{name}"
	on:input
	required
	validations="{[
		{ type: 'required', message: 'Password is mandatory' },
		{
			type: 'minlength',
			minlength: 4,
			message: 'Password is required to be at least 4 characters',
		},
		{
			type: 'maxlength',
			maxlength: 50,
			message: 'Password cannot be longer than 50 characters',
		},
	]}"
	on:validate
	let:message
	let:dirty
	let:valid
	{...$$restProps}
>
	<slot message="{message}" dirty="{dirty}" valid="{valid}">
		{#if dirty && !valid}
			<div data-test="{name}-error" class="flex items-center">
				<Icon classes="mr-2" icon="{faExclamationCircle}" />
				{message}
			</div>
		{:else}&nbsp;{/if}
	</slot>
</InputControl>
