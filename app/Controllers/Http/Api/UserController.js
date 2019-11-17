'use strict'

const userRepo = use('App/Repositories/UserRepository')
const BaseController = use('BaseController')
class UserController extends BaseController {

  constructor() {
    super(userRepo)
  }

  /*DELETE ALL USERS FROM DATABASE*/
  deleteAllUsers =()=> userRepo.deleteAllUsers()

}

module.exports = UserController
