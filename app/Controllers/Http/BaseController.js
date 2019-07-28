'user-strict'


/*
 * All commonly used functions are placed here, mostly CRUD calls
 */


class BaseController{

  constructor(repo){
    this.repo = repo
  }

  async index({response}){
    return this.repo.index(response)
  }

  async store({request,response}){
    return this.repo.store(request,response)
  }

  async show({params,response}){
    return this.repo.show(params,response)
  }

  async update({params,request,response}){
    return this.repo.update(params,request,response)
  }

  async destroy({params,response}){
    return this.repo.destroy(params,response)
  }

}

module.exports = BaseController
