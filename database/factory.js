'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/


/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

Factory.blueprint('App/Models/Task', async (faker,i,data) => {
  return {
    task_name: faker.sentence()
  }
})


Factory.blueprint('App/Models/User', async(faker) => {
  return {
    username: faker.first(),
    email: faker.email(),
    password: faker.password()
  }
})

