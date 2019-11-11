class NoSqlOperations{

  constructor(model){
    this.model = model
  }

  //Get all records
  async index(response){
    let result = await this.model.find()
    return response.json({data:result})
  }


  //Save a record
  async store(request,response){
    return true
  }


  //Show single record
  async show(params,response){
    return true
  }


  //Update a record
  async update(params,request,response){
    return true
  }


  async destroy(params,response){
    return true
  }
}

module.exports = NoSqlOperations
