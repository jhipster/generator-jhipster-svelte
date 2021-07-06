<script>
	import UserListActions from '$lib/admin/user-management/UserListActions.svelte'
	import Sort from '$lib/table/Sort.svelte'
	import Table from '$lib/table/Table.svelte'
	import TableData from '$lib/table/TableData.svelte'
	import TableHeader from '$lib/table/TableHeader.svelte'
	import TableRow from '$lib/table/TableRow.svelte'
	import { formatDate } from '$lib/utils/date'

	export let users = []
	export let currentUser = null
	export let sortPredicate = 'id'
</script>

<Table testId="userMgmt">
	<thead slot="head">
		<TableRow classes="bg-gray-100 dark:bg-gray-700">
			<TableHeader>
				<span>ID</span>
				<Sort
					active="{sortPredicate === 'id'}"
					sortPredicate="id"
					hasRecords="{users.length}"
					on:sortbypredicate
				/>
			</TableHeader>
			<TableHeader>
				<span>Login</span>
				<Sort
					active="{sortPredicate === 'login'}"
					sortPredicate="login"
					hasRecords="{users.length}"
					on:sortbypredicate
				/>
			</TableHeader>
			<TableHeader>
				<span>Email</span>
				<Sort
					active="{sortPredicate === 'email'}"
					sortPredicate="email"
					hasRecords="{users.length}"
					on:sortbypredicate
				/>
			</TableHeader>
			<TableHeader>Roles</TableHeader>
			<TableHeader>Created At</TableHeader>
			<TableHeader>Modified By</TableHeader>
			<TableHeader>Modified At</TableHeader>
		</TableRow>
	</thead>
	<tbody>
		{#each users as user (user.id)}
			<TableRow let:showActions>
				<TableData
					classes="{!user.activated
						? 'border-l-4 border-red-300 dark:border-red-700'
						: ''}"
				>
					{user.id}
				</TableData>
				<TableData>{user.login}</TableData>
				<TableData>{user.email}</TableData>
				<TableData>
					<span class="uppercase">{user.authorities.join(', ')}</span>
				</TableData>
				<TableData>{formatDate(user.createdDate)}</TableData>
				<TableData>{user.lastModifiedBy}</TableData>
				<TableData classes="w-48 {showActions ? 'sm:py-0' : ''}">
					<div class:hidden="{showActions}">
						{formatDate(user.lastModifiedDate)}
					</div>
					<UserListActions
						currentUser="{currentUser.login}"
						user="{user}"
						showActions="{showActions}"
						on:toggleuseraccount
						on:viewuseraccount
						on:updateuseraccount
						on:deleteuseraccount
					/>
				</TableData>
			</TableRow>
		{/each}
	</tbody>
</Table>
