'use strict'

/*
|--------------------------------------------------------------------------
| UserTaskSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class UserTaskSeeder {
  async run () {
    const user = await Factory.model('App/Models/User').create()
    const task = await Factory.model('App/Models/Task').make()
    await user.tasks().save(task)
  }
}

module.exports = UserTaskSeeder
