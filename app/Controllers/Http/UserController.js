'use strict'

const User = use('App/Models/User')

class UserController {
  //Get all users
  async index({response}){
    let users = await User.all()
    return response.json(users)
  }

  //Save a user
  async store({request,response}){
    let input = request.all();
    let user = new User()
    user.username = input.username
    user.email = input.email
    user.password = input.password
    await user.save()
    return response.status(201).json(user)
  }

  //Show single user
  async show({params,response}){
    const user = await User.find(params.id)
    return response.json(user)
  }

  //Update
  async update({params,request,response}){
    const input = request.all()
    const user = await User.find(params.id)
    if(!user){
      return response.status(404).json({data:'Data not found'})
    }
    user.user_name = input.user_name
    await user.save()
    return response.status(200).json(user)
  }

  async delete({params,response}){
    const user = await User.find(params.id)
    if(!user){
      return response.status(404).json({data:"user not found"})
    }
    await user.delete()
    return response.status(204).json({msg:"user deleted",user})
  }
}

module.exports = UserController
