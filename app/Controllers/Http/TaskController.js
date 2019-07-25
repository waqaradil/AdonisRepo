'use strict'

const Task = use('App/Models/Task')
class TaskController {

  //Get all tasks
  async index({response}){
    let tasks = await Task.all()
    return response.json(tasks)
  }

  //Save a task
  async store({request,response}){
    let input = request.all();
    let task = new Task()
    task.task_name = input.task_name
    await task.save()
    return response.status(201).json(task)
  }

  //Show single task
  async show({params,response}){
    const task = await Task.find(params.id)
    return response.json(task)
  }

  //Update
  async update({params,request,response}){
    const input = request.all()
    const task = await Task.find(params.id)
    if(!task){
      return response.status(404).json({data:'Data not found'})
    }
    task.task_name = input.task_name
    await task.save()
    return response.status(200).json(task)
  }

  async delete({params,response}){
    const task = await Task.find(params.id)
    if(!task){
      return response.status(404).json({data:"Task not found"})
    }
    await task.delete()
    return response.status(204).json({msg:"Task deleted",task})
  }
}

module.exports = TaskController
