'use strict'
const { ioc } = require('@adonisjs/fold')
const BaseRepository = use('App/Repositories/_BaseRepository')
const Config = use('Config')

class UserRepository extends BaseRepository{

  constructor(model){
    super(model)
    this.model = model
  }

}

ioc.singleton('UserRepository', function (app) {
  const Model = app.use(Config.get('constants.modelPath')+'User')
  return new UserRepository(Model)
})

module.exports = ioc.use('UserRepository')
