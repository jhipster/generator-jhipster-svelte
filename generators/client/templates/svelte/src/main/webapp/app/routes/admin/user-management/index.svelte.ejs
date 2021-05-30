<script>
	import { onMount } from 'svelte'
	import { goto } from '@sapper/app'
	import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus'

	import auth from '../../../components/auth/auth-store.js'
	import userService from './../../../components/admin/user-management/user-service.js'
	import Page from './../../../components/page/Page.svelte'
	import Button from './../../../components/Button.svelte'
	import Icon from './../../../components/Icon.svelte'
	import Pagination from '../../../components/table/Pagination.svelte'
	import UserTable from '../../../components/admin/user-management/UserTable.svelte'
	import UserDeleteModal from '../../../components/admin/user-management/UserDeleteModal.svelte'

	let error
	let users = []
	let sortPredicate = 'id'
	let sortOrder = 'asc'
	let pageSize = 15
	let page = 1
	let totalCount = 0
	let loading = true
	let showDeleteModal = false
	let userId = null

	onMount(() => fetchUsers())

	function fetchUsers() {
		loading = true
		error = undefined
		userService
			.fetchUserDetails(page, pageSize, sortPredicate, sortOrder)
			.then(res => {
				users = res.data
				totalCount = res.totalCount
			})
			.catch(err => (error = err))
			.finally((loading = false))
	}

	function toggleUserAccount(event) {
		userService
			.update(event.detail)
			.then(res => fetchUsers())
			.catch(err => (error = err))
	}

	function viewUserAccount(event) {
		goto(`/admin/user-management/${event.detail.id}/view`)
	}

	function updateUserAccount(event) {
		goto(`/admin/user-management/${event.detail.id}/edit`)
	}

	function showDeleteUserModal(event) {
		userId = event.detail.id
		showDeleteModal = true
	}

	function closeDeleteUserModal() {
		showDeleteModal = false
		userId = null
	}

	function deleteUserAccount(event) {
		userService
			.delete(userId)
			.then(() => fetchUsers())
			.catch(err => (error = err))
			.finally(() => (showDeleteModal = false), (userId = null))
	}

	function sortByPredicate(event) {
		sortPredicate = event.detail.sortPredicate
		sortOrder = event.detail.sortOrder
		fetchUsers()
	}

	function handlePageChange(event) {
		page = event.detail.page
		fetchUsers()
	}
</script>

<svelte:head>
	<title>Users</title>
	<meta name="Description" content="User list" />
</svelte:head>

<Page testId="userMgmt" width="full">
	<div
		class="text-left flex flex-row justify-between items-center"
		slot="header"
	>
		<span>Users</span>
		<div class="flex flex-row justify-end text-base">
			<Button
				classes="sm:my-0"
				on:click="{() => goto(`/admin/user-management/new`)}"
			>
				<Icon classes="mr-2" icon="{faPlus}" />
				Create user
			</Button>
		</div>
	</div>
	{#if !loading && users.length}
		{#if showDeleteModal}
			<UserDeleteModal
				id="{userId}"
				on:close="{closeDeleteUserModal}"
				on:deleteUser="{deleteUserAccount}"
			/>
		{/if}

		<Pagination
			totalCount="{totalCount}"
			pageSize="{pageSize}"
			page="{page}"
			classes="my-2"
			on:pagechange="{handlePageChange}"
		/>
		<UserTable
			users="{users}"
			currentUser="{$auth}"
			sortPredicate="{sortPredicate}"
			on:sortbypredicate="{sortByPredicate}"
			on:toggleuseraccount="{toggleUserAccount}"
			on:updateuseraccount="{updateUserAccount}"
			on:viewuseraccount="{viewUserAccount}"
			on:deleteuseraccount="{showDeleteUserModal}"
		/>
		<Pagination
			totalCount="{totalCount}"
			pageSize="{pageSize}"
			page="{page}"
			classes="mt-4"
			on:pagechange="{handlePageChange}"
		/>
	{/if}
</Page>
