'use strict'

class SaveUser {

  get rules () {
    return {
      email:'required|email|unique:users',
      username:'required',
      password:'required|min:6|confirmed'
    }
  }

  get messages () {
    return {
      'email.required': 'You must provide a email address.',
      'email.email': 'You must provide a valid email address.',
      'email.unique': 'This email is already registered.',
      'password.required': 'You must provide a password',
      'username.required': 'User Name field is required',
      'password.min': 'Password should be atleast 6 character long.'
    }
  }

  async fails (errorMessages) {

    return this.ctx.response.send(errorMessages)
  }

  get validateAll () {
    return true
  }




}

module.exports = SaveUser
