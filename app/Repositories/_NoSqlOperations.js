'use strict'

const _ = require('lodash')

class _NoSqlOperations{

  constructor(model){
    this.model = model
    this.noRecordFound = 'No record found'

  }

  //Get all records
  async index(response){
    let result = await this.model.find().lean() //use lean for Simple Vanilla Json Object rather than Mongoose Object which takes double time
    return response.json({data:result})
  }


  //Save a record
  async store(request,response){
    let input = request.except(['password_confirmation']);
    let modelObj = new this.model()
    /*
      *check if the input is not empty -> No need to check here, validator on route will take care of this
    */
    _.forEach(input,function(e,i){
      modelObj[i] = e
    })

    console.log()
    return modelObj
    await modelObj.save()
  }


  //Show single record
  async show(params,response){
    const modelObj = await this.model.find({_id:params.id}).lean()
    if(!modelObj){
      return response.status(404).json({msg:this.noRecordFound})
    }
    return response.json({data:modelObj})
  }


  //Update a record
  async update(params,request,response){
    return true
  }


  async destroy(params,response){
    return true
  }
}

module.exports = _NoSqlOperations
