'use strict'
const BaseValidator = use('App/Validators/BaseValidator')

class Test extends BaseValidator {
    constructor() {
        super()
    }

    rules = {
        name: 'required',
        file: 'required'
    }
}

module.exports = Test
