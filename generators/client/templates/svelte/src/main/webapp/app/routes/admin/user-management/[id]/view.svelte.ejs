<script>
	import { onMount } from 'svelte'
	import { stores } from '@sapper/app'
	import { goto } from '@sapper/app'
	import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft'

	import userService from './../../../../components/admin/user-management/user-service.js'
	import Page from './../../../../components/page/Page.svelte'
	import Record from './../../../../components/page/Record.svelte'
	import Button from './../../../../components/Button.svelte'
	import Icon from './../../../../components/Icon.svelte'
	import { formatDate } from '../../../../utils/date'

	const { page } = stores()
	$: id = $page && $page.params && $page.params.id
	onMount(() => fetchUserDetails())

	let error
	let user

	function fetchUserDetails() {
		error = undefined
		userService
			.fetchUserByLogin(id)
			.then(res => (user = res))
			.catch(err => (error = err))
	}
</script>

<svelte:head>
	<title>User Details</title>
	<meta name="Description" content="User details" />
</svelte:head>
<Page testId="userMgmt" width="full">
	<div class="text-left" slot="header">
		User Details {user ? '[ ' + user.login + ' ]' : ''}
	</div>
	{#if user}
		<div class="mt-4 table table-auto w-full">
			<Record classes="border-t">
				<span slot="label">Login</span>
				<span>{user.login}</span>
			</Record>
			<Record>
				<span slot="label">First Name</span>
				<span>{user.firstName}</span>
			</Record>
			<Record>
				<span slot="label">Last Name</span>
				<span>{user.lastName}</span>
			</Record>
			<Record>
				<span slot="label">Email</span>
				<span>{user.email}</span>
			</Record>
			<Record>
				<span slot="label">Created By</span>
				<span>{user.createdBy}</span>
			</Record>
			<Record>
				<span slot="label">Creation Date</span>
				<span>{formatDate(user.createdDate)}</span>
			</Record>
			<Record>
				<span slot="label">Modified By</span>
				<span>{user.lastModifiedBy}</span>
			</Record>
			<Record>
				<span slot="label">Modification Date</span>
				<span>{formatDate(user.lastModifiedDate)}</span>
			</Record>
			<Record>
				<span slot="label">Roles</span>
				{#each user.authorities as authority, authIndex (authority)}
					<span class="uppercase"
						>{authority}
						{authIndex !== user.authorities.length - 1
							? ', '
							: ''}</span
					>
				{/each}
			</Record>
		</div>
	{/if}
	<div class="flex mt-4 flex-row justify-center items-center leading-none">
		<Button
			name="backBtn"
			on:click="{() => goto(`/admin/user-management`)}"
		>
			<Icon classes="mr-2" icon="{faArrowLeft}" />
			Back
		</Button>
	</div>
</Page>
