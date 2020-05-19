'use strict'
const Env = use('Env')

const Logger = use('Logger')

module.exports = {
    /*Log message*/
    logMsg(msg) {
        return {
            timestamp: new Date().getTime(),
            msg
        }
    }
}
