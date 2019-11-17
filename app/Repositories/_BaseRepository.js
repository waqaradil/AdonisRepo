'use strict'

/*
 * All commonly used functions are placed here, mostly CRUD operations
 */

const Env = use('Env')



const db_operations = use(Env.get('DB_CONNECTION') === 'mysql' ? 'App/Repositories/_SqlOperations' : 'App/Repositories/_NoSqlOperations')

class _BaseRepository{

  #db_obj;
  constructor(model){
    this.#db_obj = new db_operations(model)
  }



  async activeDB(){
    return Env.get('DB_CONNECTION') === 'mysql' ? Env.get('SQL_MODEL') : Env.get('NOSQL_MODEL')
  }

  //Get all records
  async index(response){
    return this.#db_obj.index(response)
  }


  //Save a record
  async store(request,response){
    return this.#db_obj.store(request,response)
  }


  //Show single record
  async show(params,response){
     return this.#db_obj.show(params,response)
  }


  //Update a record
  async update(params,request,response){
    return this.#db_obj.update(params,request,response)
  }


  async destroy(params,response){
    return this.#db_obj.destroy(params,response)
  }

}

module.exports = _BaseRepository

