'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */

/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class Authenticated {
    /**
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Function} next
     */
    async handle({request, auth, response}, next) {
        // call next to advance the request
        if (!auth.user) {
            return response.redirect('login')
        }
        await next()
    }

    async wsHandle({request, auth, response}, next) {
        if (!auth.user) {
            return response.redirect('login')
        }
        await next()
    }
}

module.exports = Authenticated
