'use strict'

const { ioc } = require('@adonisjs/fold')
const BaseRepository = use('App/Repositories/BaseRepository')
class TaskRepository extends BaseRepository{

  constructor(model){
    super(model)
    this.model = model
  }
}

ioc.bind('TaskRespository', function (app) {
  const Model = app.use('App/Models/Task')
  return new TaskRepository(Model)
})
module.exports = ioc.use('TaskRespository')
