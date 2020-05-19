'use strict'

const {LogicalException} = require('@adonisjs/generic-exceptions')
const message = 'Page Not Found!'
const status = 404


class NotFoundException extends LogicalException {
    /**
     * Handle this exception by itself
     */
    // handle () {}
    constructor() {
        super(message, status)
    }

}

module.exports = NotFoundException
