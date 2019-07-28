'use strict'

const TaskRepo = use('TaskRepository')
class TaskController {

  async index({response}){
    return TaskRepo.index(response)
  }

  async store({request,response}){
    return TaskRepo.store(request,response)
  }

}

module.exports = TaskController
