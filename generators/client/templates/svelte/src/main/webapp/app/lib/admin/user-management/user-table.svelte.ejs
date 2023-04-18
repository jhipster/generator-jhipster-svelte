<script>
	import UserListActions from '$lib/admin/user-management/user-list-actions.svelte'
	import { Sort, Table, TableData, TableHeader, TableRow } from 'jhipster-svelte-library/table'
	import { formatDistance } from 'jhipster-svelte-library/utils'

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
				<TableData>{formatDistance(user.createdDate)}</TableData>
				<TableData>{user.lastModifiedBy}</TableData>
				<TableData classes="w-48 {showActions ? 'sm:py-0' : ''}">
					<div class:hidden="{showActions}">
						{formatDistance(user.lastModifiedDate)}
					</div>
					<UserListActions
						currentUser="{currentUser.login}"
						user="{user}"
						showActions="{showActions}"
						on:toggleuseraccount
						on:view
						on:update
						on:delete
					/>
				</TableData>
			</TableRow>
		{/each}
	</tbody>
</Table>
