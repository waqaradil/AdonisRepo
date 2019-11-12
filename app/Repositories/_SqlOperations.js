class _SqlOperations {

  constructor(model){
    this.model = model
  }

 //Get all records
  async index(response){
    let result = await this.model.all()
    return response.json({data:result})
  }


  //Save a record
  async store(request,response){
    let input = request.except(['password_confirmation']);
    let modelObj = new this.model()

    /*
      *check if the input is not empty -> No need to check here, validator on route will take care of this
    */

    //assigning input data in db fields
    _.forEach(input,function(e,i){
      modelObj[i] = e
    })

    await modelObj.save()

    return response.status(201).json({msg: this.model.name + ' created successfully',data:modelObj})
  }


  //Show single record
  async show(params,response){
    const modelObj = await this.model.find(params.id)
    if(!modelObj){
      return response.status(404).json({msg:this.noRecordFound})
    }
    return response.json({data:modelObj})
  }


  //Update a record
  async update(params,request,response){
    const input = request.all()
    const modelObj = await this.model.find(params.id)

    //check if the row related to this id exists
    if(!modelObj){
      return response.status(404).json({msg:this.noRecordFound})
    }

    /*
    *check if the input is not empty -> No need to check here, validator on route will take care of it
    */

    //assigning input data in db fields
    _.forEach(input,function(e,i){
      modelObj[i] = e
    })

    await modelObj.save()
    return response.status(200).json({msg: this.model.name + ' has been updated', data:modelObj})
  }


  async destroy(params,response){
    const modelObj = await this.model.find(params.id)
    if(!modelObj){
      return response.status(404).json({data:this.noRecordFound})
    }
    await modelObj.delete()
    return response.status(200).json({msg:this.model.name+ " deleted",data:modelObj})
  }
}

module.exports = _SqlOperations
