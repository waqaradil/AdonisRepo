'use strict'

/** @type {import('@adonisjs/framework/src/Env')} */
const Env = use('Env')

module.exports = {
  modelPath : Env.get('DB_CONNECTION') === 'mysql' ? 'App/Models/Sql/' : 'App/Models/NoSql/'
}
