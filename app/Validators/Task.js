'use strict'

class Task {

  // get sanitizationRules (){
  //   return {
  //     email:'trim|normalize_email',
  //     password: 'trim'
  //   }
  // }
  //
  // get rules () {
  //   return {
  //     field: 'required|trim|min:6',
  //     field2:'required|email'
  //   }
  // }
  //
  // get messages () {
  //   return {
  //     'email.required': 'You must provide a email address.',
  //     'username.required': 'User Name field is required',
  //     'password.min': 'Password should be atleast 6 character long.'
  //   }
  // }

  async fails (errorMessages) {
    return this.ctx.response.send(errorMessages)
  }

  get validateAll () {
    return true
  }
}

module.exports = Task
