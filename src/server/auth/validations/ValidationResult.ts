export interface IValidationResult<T> {
    success: boolean
    error: string
    value: T
}

export class ValidationResult<T> implements IValidationResult<T> {
    success: boolean
    error: string
    value: T

    constructor(value: T, errors: string[]) {
        this.success = errors.length === 0
        this.error = errors.join(", ")
        this.value = value
    }
}

export class SuccessfullValidationResult<T> implements IValidationResult<T> {
    success: boolean = true
    error: string = ""
    value: T

    constructor(value: T) {
        this.value = value
    }
}

export class FailedValidationResult implements IValidationResult<null> {
    success: boolean = false
    error: string
    value = null

    constructor(error: string) {
        this.error = error
    }
}
