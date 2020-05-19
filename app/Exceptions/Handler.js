'use strict'

const BaseExceptionHandler = use('BaseExceptionHandler')
const myHelpers = use('myHelpers')
const Logger = use('Logger')

/**
 * This class handles all exceptions thrown during
 * the HTTP request lifecycle.
 *
 * @class ExceptionHandler
 */
class ExceptionHandler extends BaseExceptionHandler {
    /**
     * Handle exception thrown during the HTTP lifecycle
     *
     * @method handle
     *
     * @param  {Object} error
     * @param  {Object} options.request
     * @param  {Object} options.response
     *
     * @return {void}
     */

    async handle(error, {request, response, view}) {
        /*DRY statements*/
        let errorBody = {src: error.status, message: error.stack}
        /*end*/


        /*******************************
         * Error Based on Text Code
         *******************************/
        let responseError
        switch (error.code) {
            case 'ER_DUP_ENTRY':
                responseError = error.sqlMessage
                break
            case "E_PASSWORD_MISMATCH":
                responseError = "Incorrect Password"
                break

            case "E_USER_NOT_FOUND":
                responseError = "User does not exist"
                break
            case "E_CANNOT_LOGIN":
                myHelpers.httpAjaxResponse(request, response, "Already Logged in", '/login')
                break

        }

        if (responseError) {
            return response.status(error.status).json({error: responseError})
        }

        /*******************************
         *Error Based on Code Number
         *******************************/
        switch (error.status) {
            case 401:
                response.redirect('/login', false, 301)
                break
            case 404:
                response.redirect('/404', false, 301)
                break
            case 403:
                response.redirect('/', false, 301)
                break;
            default:
                Logger.info(myHelpers.logMsg(errorBody))
                return response.status(error.status).json({error:error.toString()})

        }
        return true

    }

    /**
     * Report exception for logging or debugging.
     *
     * @method report
     *
     * @param  {Object} error
     * @param  {Object} options.request
     *
     * @return {void}
     */
    async report(error, {request}) {
    }
}

module.exports = ExceptionHandler
