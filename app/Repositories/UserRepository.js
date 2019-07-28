'use strict'

const { ioc } = require('@adonisjs/fold')
const BaseRepository = use('App/Repositories/BaseRepository')
class UserRepository extends BaseRepository{

  constructor(model){
    super(model)
    this.model = model
  }

}

ioc.bind('UserRepository', function (app) {
  const Model = app.use('App/Models/User')
  return new UserRepository(Model)
})

module.exports = ioc.use('UserRepository')

