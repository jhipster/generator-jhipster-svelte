<script>
	import { createEventDispatcher } from 'svelte'
	import { Button, InputControl } from 'jhipster-svelte-library'
	import { Form } from 'jhipster-svelte-library/page'

	export let user = { firstName: '', lastName: '', email: '' }

	let validFirstName = false
	let validLastName = false
	let validEmail = false

	const dispatch = createEventDispatcher()

	function updateFirstName(event) {
		user.firstName = event.target.value
	}

	function updateLastName(event) {
		user.lastName = event.target.value
	}

	function updateEmail(event) {
		user.email = event.target.value
	}

	$: validForm = validFirstName && validLastName && validEmail
</script>

<Form testId="settings">
	<InputControl
		label="First Name"
		name="firstName"
		value="{user.firstName}"
		on:input="{event => updateFirstName(event)}"
		validations="{[
			{
				type: 'maxlength',
				maxlength: 50,
				message: 'First name cannot be longer than 50 characters',
			},
		]}"
		on:validate="{event => (validFirstName = event.detail.valid)}"
	/>
	<InputControl
		label="Last Name"
		name="lastName"
		value="{user.lastName}"
		on:input="{event => updateLastName(event)}"
		validations="{[
			{
				type: 'maxlength',
				maxlength: 50,
				message: 'Last name cannot be longer than 50 characters',
			},
		]}"
		on:validate="{event => (validLastName = event.detail.valid)}"
	/>

	<InputControl
		type="email"
		label="Email"
		name="email"
		value="{user.email}"
		on:input="{event => updateEmail(event)}"
		required
		validations="{[
			{ type: 'required', message: 'Email is mandatory' },
			{
				type: 'minlength',
				minlength: 5,
				message: 'Email is required to be at least 5 characters',
			},
			{
				type: 'maxlength',
				maxlength: 254,
				message: 'Email cannot be longer than 254 characters',
			},
			{
				type: 'pattern',
				pattern:
					/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
				message: 'Email address is not valid',
			},
		]}"
		on:validate="{event => (validEmail = event.detail.valid)}"
	/>
	<Button
		type="submit"
		on:click="{() => dispatch('updatesettings', { ...user })}"
		disabled="{!validForm}">Update Settings</Button
	>
</Form>
