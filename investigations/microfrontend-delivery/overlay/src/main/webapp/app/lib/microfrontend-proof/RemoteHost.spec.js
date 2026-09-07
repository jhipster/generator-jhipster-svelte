import { render, screen, waitFor, cleanup } from '@testing-library/svelte';
import { afterEach, expect, it, vi } from 'vitest';
import RemoteHost from './RemoteHost.svelte';
import { loadRemote } from './load-remote.js';

vi.mock('./load-remote.js', () => ({ loadRemote: vi.fn() }));
afterEach(() => {
	cleanup();
	vi.resetAllMocks();
});

it('mounts the loaded module into the page and destroys it on unmount', async () => {
	const destroy = vi.fn();
	const mount = vi.fn(target => {
		target.textContent = 'Rendered remote';
		return { destroy };
	});
	loadRemote.mockResolvedValue({ mount });
	const view = render(RemoteHost);
	await screen.findByText('Rendered remote');
	expect(screen.getByRole('status').textContent).toBe('Independent component loaded');
	expect(mount.mock.calls[0][0].isConnected).toBe(true);
	expect(mount.mock.calls[0][1]).toEqual({ initial: 2 });
	view.unmount();
	expect(destroy).toHaveBeenCalledTimes(1);
});

it('does not mount a module that arrives after the host is removed', async () => {
	let resolve;
	const pending = new Promise(r => {
		resolve = r;
	});
	const mount = vi.fn();
	loadRemote.mockReturnValue(pending);
	const view = render(RemoteHost);
	view.unmount();
	resolve({ mount });
	await pending;
	await Promise.resolve();
	expect(mount).not.toHaveBeenCalled();
});

it('shows a recoverable unavailable state when loading fails', async () => {
	loadRemote.mockRejectedValue(new Error('Network unavailable'));
	render(RemoteHost);
	await waitFor(() => expect(screen.getByRole('status').textContent).toBe('Independent component unavailable'));
});

it('shows unavailable when a loaded module cannot mount', async () => {
	loadRemote.mockResolvedValue({
		mount() {
			throw new Error('Incompatible module');
		},
	});
	render(RemoteHost);
	await waitFor(() => expect(screen.getByRole('status').textContent).toBe('Independent component unavailable'));
});
