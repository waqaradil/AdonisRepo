'use strict'

const UserRepo = use('UserRespository')
class UserController {

  async index({response}){
    return UserRepo.index(response)
  }

  async store({request,response}){
    return UserRepo.store(request,response)
  }

}

module.exports = UserController
