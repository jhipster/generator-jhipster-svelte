<script>
	import { browser } from '$app/env'
	import { faMoon } from '@fortawesome/free-solid-svg-icons/faMoon'
	import { faSun } from '@fortawesome/free-solid-svg-icons/faSun'

	import Icon from '$lib/icon.svelte'

	let darkMode = false
	let focused = false
	let body = undefined
	let storage = undefined

	function loadThemePreference() {
		if (browser) {
			body = document.body
			storage = localStorage
			darkMode =
				(storage && storage.getItem('svl-theme-mode') === 'dark') ||
				false
		}
		return Promise.resolve()
	}

	$: {
		if (darkMode) {
			storage && storage.setItem('svl-theme-mode', 'dark')
			body && body.classList.add('dark')
		} else {
			storage && storage.setItem('svl-theme-mode', 'light')
			body && body.classList.remove('dark')
		}
	}
	function handleFocus() {
		focused = true
	}

	function handleBlur() {
		focused = false
	}
</script>

{#await loadThemePreference() then response}
	<div class="align-middle">
		<label
			class="relative inline-block w-12 h-6 border-0 rounded-3xl cursor-pointer bg-black"
		>
			<input
				class="opacity-0"
				type="checkbox"
				bind:checked="{darkMode}"
				on:focus="{handleFocus}"
				on:blur="{handleBlur}"
			/>
			<span class="opacity-0 absolute">Mode</span>
			<span
				class="absolute w-6 top-0 bottom-0 rounded-full bg-white border-2 shadow-md z-10 transition-all duration-200 transform"
				class:border-primary-500="{focused}"
				class:ring-2="{focused}"
				class:ring-primary-500="{focused}"
				class:-translate-x-3="{!darkMode}"
				class:translate-x-3="{darkMode}"></span>
			<span class="w-6 h-6">
				<Icon
					classes="absolute top-1/2 transform -translate-x-2 -translate-y-1/2 text-white"
					icon="{faMoon}"
				/>
				<Icon
					classes="absolute top-1/2 transform translate-x-4 -translate-y-1/2 text-yellow-500"
					icon="{faSun}"
				/>
			</span>
		</label>
	</div>
{/await}
