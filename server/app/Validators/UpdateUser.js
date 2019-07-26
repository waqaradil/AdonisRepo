'use strict'

class UpdateUser {
  get rules () {
    return {
      id:'required',
      email:'required|email|unique',
      username:'required',
      password:'required|min:6'
    }
  }
}

module.exports = UpdateUser
