'use strict'
const SaveUser =  use('./SaveUser')
class UpdateUser extends SaveUser{

  get rules () {
    return {}
  }

}

module.exports = UpdateUser
