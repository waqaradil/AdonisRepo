'use strict'

const { Command } = require('@adonisjs/ace')
const _case = require('case')
const pluralize = require('pluralize')
const fs = require('fs')
const fse = require('fs-extra')

class Module extends Command {
  static get signature () {
    return `
      module
      {name: Name of the module}
      {model: Name of the model(Singular & capitalized version of your db table)}
      {--rollback: Delete module files}
      `
  }

  static get description () {
    return 'This command will create Controller, Repository, Model, Validator, Route. To create ready-made CRUD operation of this newly created module'
  }

  async handle (args, options) {

    /****************************
    *VALIDATION
    ****************************/
    if(_case.of(args.name) !== 'capital' && _case.of(args.name) !== 'pascal'){
      this.error('ERROR: The case of module name should be Capital or PascalCase')
      return false;
    }

    if(_case.of(args.model) !== 'capital' && _case.of(args.model) !== 'pascal'){
      this.error('ERROR: The case of model(param 2) name should be Capital or PascalCase')
      return false;
    }

    /****************************
     *DELETE
     ****************************/
    if(options.rollback){
      this.warn('########## FILES ##########')
      let files_to_be_deleted = [
        'app/Repositories/'+args.name+'Repository.js',
        'app/Controllers/Http/Api/'+args.name+'Controller.js',
        'app/Models/'+args.model+'.js',
        'app/Validators/'+args.name+'.js'
      ]

      files_to_be_deleted.forEach((v,i)=>{
        this.warn(i+1+'. '+v)
      })

      let ask_delete = await this.ask(this.chalk.red("All above files will be deleted. Are you sure? (y/n)"))

      if(ask_delete !== 'y'){
        this.error("Operation Aborted")
        return false
      }

      await Promise.all(files_to_be_deleted.map(async (file) => {
        let dest_name = 'app/RecycleBin/'+file;
        //check src path
        if( this.pathExists(file)){
          //check dest path
          if( this.pathExists('app/RecycleBin/'+file)){
            dest_name = 'app/RecycleBin/'+file+'_'+Math.floor(new Date() / 1000)
          }
          try {
            await fse.moveSync(file,dest_name)
            this.info("Deleted: "+file)
          }catch (e) {
            console.log(e.message)
          }


        }
      })).then(()=>this.warn(this.chalk.blue("ALL DONE, Make sure to manually delete the route path of this module.")));

      return true //to stop further execution of script.
    }



    /****************************
     *CREATE
     ****************************/

    //MODEL CODE
    let model_content = "'use strict'\n" +
      "\n" +
      "/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */\n" +
      "const Model = use('Model')\n" +
      "\n" +
      "class "+pluralize.singular(args.model)+" extends Model {\n" +
      "  static get table(){\n" +
      "    return '"+pluralize.plural(args.model).toLowerCase()+"'\n" +
      "  }\n" +
      "\n" +
      "  static get primaryKey(){\n" +
      "    return 'id'\n" +
      "  }\n" +
      "}\n"+
      "\n" +
      "module.exports = "+args.model;



    //REPOSITORY CODE
    let repository_content = "'use strict'\n" +
      "\n" +
      "const { ioc } = require('@adonisjs/fold')\n" +
      "const BaseRepository = use('BaseRepository')\n" +
      "class "+args.name+"Repository extends BaseRepository{\n" +
      "\n" +
      "  constructor(model){\n" +
      "    super(model)\n" +
      "    this.model = model\n" +
      "  }\n" +
      "\n" +
      "}\n" +
      "\n" +
      "ioc.singleton('IoC"+args.name+"Repository', function (app) {\n" +
      "  const Model = app.use('App/Models/"+args.model+"')\n" +
      "  return new "+args.name+"Repository(Model)\n" +
      "})\n" +
      "\n" +
      "module.exports = ioc.use('IoC"+args.name+"Repository')\n" +
      "\n";


    //CONTROLLER CODE
    let controller_content = "'use strict'\n" +
      "\n" +
      "const "+args.name+"Repo = use('App/Repositories/"+args.name+"Repository')\n" +
      "const BaseController = use('BaseController')\n" +
      "class "+args.name+"Controller extends BaseController {\n" +
      "\n" +
      "  constructor(){\n" +
      "    super("+args.name+"Repo)\n" +
      "    this.repo = "+args.name+"Repo\n" +
      "  }\n" +
      "}\n" +
      "\n" +
      "module.exports = "+args.name+"Controller\n"

    //VALIDATION CODE
    let validator_content = "'use strict'\n" +
      "\n" +
      "class "+args.name+" {\n" +
      "\n" +
      "  // get sanitizationRules (){\n" +
      "  //   return {\n" +
      "  //     email:'trim|normalize_email',\n" +
      "  //     password: 'trim'\n" +
      "  //   }\n" +
      "  // }\n" +
      "\n" +
      "  // get rules () {\n" +
      "  //   return {\n" +
      "  //     field: 'required|trim|min:6',\n" +
      "  //     field2:'required|email'\n" +
      "  //   }\n" +
      "  // }\n" +
      "\n" +
      "  // get messages () {\n" +
      "  //   return {\n" +
      "  //     'email.required': 'You must provide a email address.',\n" +
      "  //     'username.required': 'User Name field is required',\n" +
      "  //     'password.min': 'Password should be atleast 6 character long.'\n" +
      "  //   }\n" +
      "  // }\n" +
      "\n" +
      "  async fails (errorMessages) {\n" +
      "    return this.ctx.response.send(errorMessages)\n" +
      "  }\n" +
      "\n" +
      "  get validateAll () {\n" +
      "    return true\n" +
      "  }\n" +
      "}\n" +
      "\n" +
      "module.exports = "+args.name

    //WRITING API CONTROLLER FILES
    const controller_exists = await this.pathExists('app/Controllers/Http/Api/'+args.name+'Controller.js')
    if(controller_exists){
      this.warn(args.name+"Controller already exists")
    }else{
      await this.writeFile('app/Controllers/Http/Api/'+args.name+'Controller.js',controller_content)
      this.info(args.name+"Controller is created")
    }

    //WRITING REPO FILES
    const repo_exists = await this.pathExists('app/Repositories/'+args.name+'Repository.js')
    if(repo_exists){
      this.warn(args.name+"Repository already exists")
    }else{
      await this.writeFile('app/Repositories/'+args.name+'Repository.js',repository_content)
      this.info(args.name+"Repository is created")
    }

    //WRITING MODEL FILES
    const model_exists = await this.pathExists('app/Models/'+args.model+'.js')
    if(model_exists){
      this.warn(args.model+" (Model) already exists")
    }else{
      await this.writeFile('app/Models/'+args.model+'.js',model_content)
      this.info(args.model+" (Model) is created")
    }

    //WRITING ROUTES FILE
    try {
      let route_content = "Route.resource('"+args.name.toLowerCase()+"','Api/"+args.name+"Controller')\n"
      fs.appendFileSync('start/routes.js', route_content);
      this.info('Route added')
    } catch (err) {
      this.error("Unable to add routes in start/routes.js")
    }

    //WRITING VALIDATOR FILES
    let ask_validator = await this.ask('Do you want to add Validator? (y/n)')
    ask_validator = ask_validator.toLowerCase()
    if(ask_validator === 'y'){
      const validator_exists = await this.pathExists('app/Validators/'+args.name+'.js')
      if(validator_exists){
        this.warn(args.name+" (Validator) already exists")
      }else{
        await this.writeFile('app/Validators/'+args.name+'.js',validator_content)
        this.info(args.model+" (Validator) is created")
      }
    }



    //ALL DONE
    this.success(args.name + " module has been generated. Make sure to adjust the followings:")
    console.log(this.chalk.blue('\t=> Move route to route group (if any)\n\t=> Check DB Table related to this model exists\n\t=> Add rules in Validator and link to route (if required)'))
  }
}

module.exports = Module
