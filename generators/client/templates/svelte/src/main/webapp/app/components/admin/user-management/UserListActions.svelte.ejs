<script>
	import { faEye } from '@fortawesome/free-solid-svg-icons/faEye'
	import { faPencilAlt } from '@fortawesome/free-solid-svg-icons/faPencilAlt'
	import { faTrashAlt } from '@fortawesome/free-solid-svg-icons/faTrashAlt'
	import { faToggleOn } from '@fortawesome/free-solid-svg-icons/faToggleOn'
	import { faToggleOff } from '@fortawesome/free-solid-svg-icons/faToggleOff'

	import Button from '../../Button.svelte'
	import Icon from '../../Icon.svelte'
	import { createEventDispatcher } from 'svelte'

	export let user
	export let currentUser
	export let showActions = false
	const dispatch = createEventDispatcher()

	$: activationIcon = user.activated ? faToggleOn : faToggleOff
	$: activationIconTitle = user.activated
		? 'Deactivate user'
		: 'Activate user'
	$: isUserSameAsCurrentUser = user.login === currentUser
</script>

<div
	class="flex flex-row justify-center items-center leading-none"
	class:hidden="{!showActions}"
	data-testid="rowactions"
>
	<Button
		name="toggleUserAcctBtn"
		role="action"
		classes="sm:my-0"
		title="{activationIconTitle}"
		disabled="{isUserSameAsCurrentUser}"
		aria-label="toggleActivation"
		on:click="{() => {
			dispatch('toggleuseraccount', {
				...user,
				activated: !user.activated,
			})
		}}"
	>
		<Icon icon="{activationIcon}" />
	</Button>
	<Button
		name="viewUserBtn"
		role="action"
		classes="sm:my-0"
		title="View"
		aria-label="view"
		on:click="{() =>
			dispatch('viewuseraccount', {
				id: user.login,
			})}"
	>
		<Icon icon="{faEye}" />
	</Button>
	<Button
		name="editUserBtn"
		role="action"
		classes="sm:my-0"
		title="Edit"
		disabled="{isUserSameAsCurrentUser}"
		aria-label="edit"
		on:click="{() =>
			dispatch('updateuseraccount', {
				id: user.login,
			})}"
	>
		<Icon icon="{faPencilAlt}" />
	</Button>
	<Button
		name="deleteUserBtn"
		role="action"
		classes="sm:my-0"
		title="Delete"
		disabled="{isUserSameAsCurrentUser}"
		aria-label="delete"
		on:click="{() =>
			dispatch('deleteuseraccount', {
				id: user.login,
			})}"
	>
		<Icon icon="{faTrashAlt}" />
	</Button>
</div>
