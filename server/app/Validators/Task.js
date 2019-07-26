'use strict'

class Task {
  get rules () {
    return {
      task_name: 'required',
      user_id:'required'
    }
  }

}

module.exports = Task
