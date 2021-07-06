import { writable } from 'svelte/store'

const notificationStore = writable([])

export default {
	subscribe: notificationStore.subscribe,
	add: (message, type) => {
		notificationStore.update(oldState => [...oldState, { message, type }])
	},
	remove: (message, index) => {
		notificationStore.update(oldState => {
			const messageIndex =
				index || oldState.findIndex(val => val.message === message)
			return [
				...oldState.slice(0, messageIndex),
				...oldState.slice(messageIndex + 1),
			]
		})
	},
}
