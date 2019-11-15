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

    await modelObj.save()

    return response.status(201).json({msg: this.model.name + ' created successfully',data:modelObj})
  }


  //Show single record
  async show(params,response){
    const modelObj = await this.model.findOne({_id:params.id}).lean()
    if(!modelObj){
      return response.status(404).json({msg:this.noRecordFound})
    }
    return response.json({data:modelObj})
  }


  //Update a record
  async update(params,request,response){
    try {
      const input = request.all()

      const modelObj = await this.model.updateOne({_id:params.id},input)

      return response.status(200).json({msg: this.model.name + ' has been updated', data:modelObj})
    }catch (e) {
      return response.status(400).json({error: `Unable to update ${this.model.name}`, reason:e.message})
    }

  }


  async destroy(params,response){
    try {
      let hasRecord = await this.model.findOne({_id:params.id})

      if(!hasRecord){
        return response.status(404).json({error:this.noRecordFound})
      }

      const modelObj = await this.model.deleteOne({_id:params.id},function(err){
        return response.status(400).json({error: err})
      })

      return response.status(200).json({msg:this.model.name+ " deleted",data:modelObj})
    }catch (e) {
      return response.status(400).json({error: `Unable to delete ${this.model.name}`, reason:e.message})
    }

  }
}

module.exports = _NoSqlOperations
