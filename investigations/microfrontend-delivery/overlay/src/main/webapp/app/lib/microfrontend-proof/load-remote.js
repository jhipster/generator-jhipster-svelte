export function loadRemote() {
	const url = '/microfrontend-proof/remote.js';
	return import(/* @vite-ignore */ url);
}
