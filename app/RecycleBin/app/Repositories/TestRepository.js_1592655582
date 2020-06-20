'use strict'
const { ioc } = require('@adonisjs/fold')
const BaseRepository = use('App/Repositories/_BaseRepository')
const Config = use('Config')

class TestRepository extends BaseRepository{
  model
  constructor(model){
    super(model)
    this.model = model
  }

}

ioc.singleton('TestRepository', function (app) {
  const model = app.use(Config.get('constants.modelPath')+'Test')
  return new TestRepository(model)
})

module.exports = ioc.use('TestRepository')