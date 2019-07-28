'use strict'

const _ = require('lodash')

class BaseRepository{

  constructor(model){
    this.model = model
  }

// //Get all users
  async index(response){
    let result = await this.model.all()
    return response.json(result)
  }


  //Save a user
  async store(request,response){
    let input = request.except(['password_confirmation']);
    let modelObj = new this.model()

    //check if input is empty object
    if(typeof input != 'object' || _.isEmpty(input)){
      return response.status(400).json({msg:'No input data found'})
    }

    //assigning input data in db fields
    _.forEach(input,function(e,i){
      modelObj[i] = e
    })

    await modelObj.save()

    return response.status(201).json(modelObj)
  }


  //Show single user
  async show({params,response}){
    const user = await this.model.find(params.id)
    return response.json(user)
  }

  //Update
  async update({params,request,response}){
    const input = request.all()
    const user = await this.model.find(params.id)
    if(!user){
      return response.status(404).json({data:'Data not found'})
    }
    user.user_name = input.user_name
    await user.save()
    return response.status(200).json(user)
  }

  async delete({params,response}){
    const user = await this.model.find(params.id)
    if(!user){
      return response.status(404).json({data:"user not found"})
    }
    await user.delete()
    return response.status(204).json({msg:"user deleted",user})
  }
}

module.exports = BaseRepository

