export function byteSize(base64String) {
	return formatAsBytes(size(base64String))
}

export function openFile(data, contentType) {
	const byteCharacters = atob(data)
	const byteNumbers = new Array(byteCharacters.length)
	for (let i = 0; i < byteCharacters.length; i++) {
		byteNumbers[i] = byteCharacters.charCodeAt(i)
	}
	const byteArray = new Uint8Array(byteNumbers)
	const blob = new Blob([byteArray], {
		type: contentType,
	})
	const fileURL = window.URL.createObjectURL(blob)
	const win = window.open(fileURL)
	win.onload = function () {
		URL.revokeObjectURL(fileURL)
	}
}

function endsWith(suffix, str) {
	return str.includes(suffix, str.length - suffix.length)
}

function paddingSize(value) {
	if (endsWith('==', value)) {
		return 2
	}
	if (endsWith('=', value)) {
		return 1
	}
	return 0
}

function size(value) {
	return (value.length / 4) * 3 - paddingSize(value)
}

function formatAsBytes(size) {
	return size.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' bytes'
}
