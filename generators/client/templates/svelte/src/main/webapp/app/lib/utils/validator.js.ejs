export function validate(node, validations) {
	const validator = createValidator(validations)
	function validateField(event) {
		if (node && event.target) {
			node.dispatchEvent(
				new CustomEvent('validation', {
					detail: { ...validator(event.target.value), dirty: true },
				})
			)
		}
	}

	node.addEventListener('input', validateField)

	return {
		destroy() {
			node.removeEventListener('input', validateField)
		},
	}
}

export function createValidator(validations) {
	return function validate(value) {
		if (!validations || validations.length === 0) {
			return { valid: true }
		}

		const valiators = validations.map(validation => {
			const { type, ...validationArgs } = validation
			switch (type) {
				case 'required':
					return required(validationArgs)
				case 'numeric':
					return numeric(validationArgs)
				case 'min':
					return min(validationArgs)
				case 'max':
					return max(validationArgs)
				case 'minlength':
					return minlength(validationArgs)
				case 'maxlength':
					return maxlength(validationArgs)
				case 'pattern':
					return pattern(validationArgs)
				default:
					throw new Error(`Invalid validation type ${type}`)
			}
		})

		const failed = valiators.find(v => v(value) !== undefined)
		return {
			valid: !failed,
			message: failed && failed(value),
		}
	}
}

function required(validationArgs) {
	const { message } = validationArgs
	return function (value) {
		if (
			value === undefined ||
			value === null ||
			(typeof value == 'number' ? value : value.trim()) === ''
		) {
			return message || 'This field is required'
		}
	}
}

function numeric(validationArgs) {
	const { message } = validationArgs
	return function (value) {
		if (
			value === undefined ||
			value === null ||
			value === '' ||
			isNaN(value)
		) {
			return message || 'This field value should be numeric'
		}
	}
}

function min(validationArgs) {
	const { message, min } = validationArgs
	return function (value) {
		if (
			value !== undefined &&
			value !== null &&
			!isNaN(value) &&
			Number(value) < min
		) {
			return message || `The field value should be at least ${min}`
		}
	}
}

function max(validationArgs) {
	const { message, max } = validationArgs
	return function (value) {
		if (
			value !== undefined &&
			value !== null &&
			!isNaN(value) &&
			Number(value) > max
		) {
			return message || `The field value should be more than ${max}`
		}
	}
}

function minlength(validationArgs) {
	const { message, minlength } = validationArgs
	return function (value) {
		if (
			value !== undefined &&
			value !== null &&
			value.trim().length < minlength
		) {
			return (
				message ||
				`The field value should be greater than ${minlength} characters`
			)
		}
	}
}

function maxlength(validationArgs) {
	const { message, maxlength } = validationArgs
	return function (value) {
		if (
			value !== undefined &&
			value !== null &&
			value.trim().length > maxlength
		) {
			return (
				message ||
				`The field value should be less than ${maxlength} characters`
			)
		}
	}
}

function pattern(validationArgs) {
	const { message, pattern } = validationArgs
	return function (value) {
		if (
			value !== undefined &&
			value !== null &&
			!pattern.test(value.trim())
		) {
			return message || `The field value should match the pattern`
		}
	}
}
