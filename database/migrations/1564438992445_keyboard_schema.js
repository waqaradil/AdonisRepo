'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class KeyboardSchema extends Schema {
  up () {
    this.create('keyboards', (table) => {
      table.increments()
      table.string('name')
      table.timestamps()
    })
  }

  down () {
    this.drop('keyboards')
  }
}

module.exports = KeyboardSchema
