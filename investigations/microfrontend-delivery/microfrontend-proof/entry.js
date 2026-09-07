import Counter from './Counter.svelte';

export function mount(target, props = {}) {
	const instance = new Counter({ target, props });
	return { destroy: () => instance.$destroy() };
}
