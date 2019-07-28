'use strict'

const TaskRepo = use('TaskRepository')
const BaseController = use('BaseController')
class TaskController extends BaseController {

  constructor(){
    super(TaskRepo)
    this.repo = TaskRepo
  }
}

module.exports = TaskController
