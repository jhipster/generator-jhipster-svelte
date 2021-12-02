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

export function getBase64FileData(files, isImage) {
	return new Promise((resolve, reject) => {
		if (files && files[0]) {
			const file = files[0]
			if (isImage && !/^image\//.test(file.type)) {
				reject('Invalid image file type')
			}
			const fileReader = new FileReader()
			fileReader.readAsDataURL(file)
			fileReader.onload = e => {
				try {
					const base64Data = e.target.result.substr(
						e.target.result.indexOf('base64,') + 'base64,'.length
					)
					resolve(base64Data)
				} catch (e) {
					reject(e)
				}
			}
		} else {
			reject('File not found')
		}
	})
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
