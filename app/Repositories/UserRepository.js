'use strict'
const { ioc } = require('@adonisjs/fold')
const BaseRepository = use('App/Repositories/_BaseRepository')
const Config = use('Config')

class UserRepository extends BaseRepository {

  #model

  constructor(model) {
    super(model)
    this.#model = model
  }

  deleteAllUsers =()=> this.#model.deleteMany({})

}

ioc.singleton('UserRepository', function (app) {
  const model = app.use(Config.get('constants.modelPath')+'User')
  return new UserRepository(model)
})

module.exports = ioc.use('UserRepository')
