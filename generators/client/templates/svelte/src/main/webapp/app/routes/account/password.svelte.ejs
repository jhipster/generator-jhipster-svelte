<script>
	import accountService from './../../components/account/account-service'
	import Alert from './../../components/Alert.svelte'
	import Password from './../../components/account/Password.svelte'
	import PasswordConfirm from './../../components/account/PasswordConfirm.svelte'

	let error
	let currentPassword
	let newPassword
	let validCurrentPassword = false
	let validNewPassword = false
	let passwordChanged = false

	$: validForm = validCurrentPassword && validNewPassword

	function changePassword() {
		error = undefined
		passwordChanged = false
		accountService
			.changeAccountPassword(currentPassword, newPassword)
			.then(() => (passwordChanged = true))
			.catch(err => ((currentPassword = ''), (error = err)))
	}
</script>

<svelte:head>
	<title>Change password</title>
</svelte:head>

<section class="m-3 relative bg-white shadow-md rounded p-4">
	<div class="p-4 w-full sm:max-w-3xl sm:mx-auto">
		<div data-test="passwordTitle" class="px-4 w-full text-4xl text-center">
			Change password
		</div>
		<Alert
			data-test="successMsg"
			show="{passwordChanged}"
			closeable="{false}"
		>
			Password changed!
		</Alert>
		<Alert
			data-test="errorMsg"
			type="danger"
			show="{error}"
			closeable="{false}"
		>
			An error has occurred! The password could not be changed.
		</Alert>
		<form data-test="passwordForm" class="mt-4 flex flex-col">
			<Password
				name="currentPassword"
				label="Current Password"
				value="{currentPassword}"
				on:input="{event => (currentPassword = event.target.value)}"
				on:validate="{event => (validCurrentPassword = event.detail.valid)}"
			/>

			<PasswordConfirm
				name="newPassword"
				label="New Password"
				value="{newPassword}"
				on:input="{event => (newPassword = event.detail.value)}"
				on:validate="{event => (validNewPassword = event.detail.valid)}"
			/>
			<button
				type="submit"
				on:click|preventDefault="{changePassword}"
				class="my-4 w-64 m-auto btn btn-primary"
				disabled="{!validForm}"
			>Update password</button>
		</form>
	</div>
</section>
