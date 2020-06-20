'use strict'

const TestRepo = use('App/Repositories/TestRepository')
const BaseController = use('BaseController')
class TestController extends BaseController {
  
  constructor(){
    super(TestRepo)
  }
  
}
module.exports = TestController