'use strict'

const {Command} = require('@adonisjs/ace')
const _case = require('case')
const pluralize = require('pluralize')
const fs = require('fs')
const fse = require('fs-extra')
const Env = use('Env')

class Module extends Command {
    static get signature() {
        return `
      module
      {name: Name of the module}
      {model: Name of the model(Singular & capitalized version of your db table)}
      {--rollback: Delete module files}
      `
    }

    static get description() {
        return 'This command will create Controller, Repository, Model, Validator, Route. To create ready-made CRUD operation of this newly created module'
    }

    async handle(args, options) {

        /****************************
         *VALIDATION
         ****************************/
        if (_case.of(args.name) !== 'capital' && _case.of(args.name) !== 'pascal') {
            this.error('ERROR: The case of module name should be Capital or PascalCase')
            return false;
        }

        if (_case.of(args.model) !== 'capital' && _case.of(args.model) !== 'pascal') {
            this.error('ERROR: The case of model(param 2) name should be Capital or PascalCase')
            return false;
        }

        /****************************
         *DELETE
         ****************************/
        if (options.rollback) {
            this.warn('########## FILES ##########')
            let files_to_be_deleted = [
                'app/Repositories/' + args.name + 'Repository.js',
                'app/Controllers/Http/Api/' + args.name + 'Controller.js',
                'app/Models/Sql/' + args.model + '.js',
                'app/Models/NoSql/' + args.model + '.js',
                'app/Validators/' + args.name + '.js'
            ]

            files_to_be_deleted.forEach((v, i) => {
                this.warn(i + 1 + '. ' + v)
            })

            let ask_delete = await this.ask(this.chalk.red("All above files will be deleted. Are you sure? (y/n)"))

            if (ask_delete !== 'y') {
                this.error("Operation Aborted")
                return false
            }

            await Promise.all(files_to_be_deleted.map(async (file) => {
                let dest_name = 'app/RecycleBin/' + file;
                //check src path
                if (this.pathExists(file)) {
                    //check dest path
                    if (this.pathExists('app/RecycleBin/' + file)) {
                        dest_name = 'app/RecycleBin/' + file + '_' + Math.floor(new Date() / 1000)
                    }
                    try {
                        await fse.moveSync(file, dest_name)
                        this.info("Deleted: " + file)
                    } catch (e) {
                        console.log(e.message)
                    }


                }
            })).then(() => this.warn(this.chalk.blue("ALL DONE, Make sure to manually delete the route path of this module.")));

            return true //to stop further execution of script.
        }


        /****************************
         *CREATE
         ****************************/
        let singular_model_name = pluralize.singular(args.model)
        //SQL MODEL CODE
        let model_sql_content = "'use strict'\n" +
            "\n" +
            "/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */\n" +
            "const Model = use('Model')\n" +
            "\n" +
            "class " + singular_model_name + " extends Model {\n" +
            "  static get table(){\n" +
            "    return '" + pluralize.plural(_case.snake(args.model)) + "'\n" +
            "  }\n" +
            "\n" +
            "  static get primaryKey(){\n" +
            "    return 'id'\n" +
            "  }\n" +
            "}\n" +
            "\n" +
            "module.exports = " + args.model;


        //NOSQL MODEL CODE

        let model_nosql_content = "'use strict'\n" +
            "\n" +
            "const BaseModel = use('MongooseModel')\n" +
            "\n" +
            "/**\n" +
            " * @class " + singular_model_name + "\n" +
            " */\n" +
            "class " + singular_model_name + " extends BaseModel {\n" +
            "  static boot ({ schema }) {\n" +
            "    // Hooks:\n" +
            "    // this.addHook('preSave', () => {})\n" +
            "    // this.addHook('preSave', '" + singular_model_name + "Hook.method')\n" +
            "    // Indexes:\n" +
            "    // this.index({}, {background: true})\n" +
            "  }\n" +
            "  /**\n" +
            "   * " + singular_model_name + "'s schema\n" +
            "   */\n" +
            "  static get schema () {\n" +
            "    return {\n" +
            "\n" +
            "    }\n" +
            "  }\n" +
            "\n" +
            "  //Link Model and collection, in case where model name mismatch collection name\n" +
            "  static get schemaOptions() {\n" +
            "    return { collection: '" + pluralize.plural(args.model) + "', };\n" +
            "  }\n" +
            "}\n" +
            "\n" +
            "module.exports = " + singular_model_name + ".buildModel('" + singular_model_name + "')\n"


        //REPOSITORY CODE


        let repository_content = `'use strict'
const { ioc } = require('@adonisjs/fold')
const BaseRepository = use('App/Repositories/_BaseRepository')
const Config = use('Config')

class ${args.name}Repository extends BaseRepository{
  model
  constructor(model){
    super(model)
    this.model = model
  }

}

ioc.singleton('${args.name}Repository', function (app) {
  const model = app.use(Config.get('constants.modelPath')+'${args.model}')
  return new ${args.name}Repository(model)
})

module.exports = ioc.use('${args.name}Repository')`;

        let controller_content = `'use strict'

const ${args.name}Repo = use('App/Repositories/${args.name}Repository')
const BaseController = use('BaseController')
class ${args.name}Controller extends BaseController {
  
  constructor(){
    super(${args.name}Repo)
  }
  
}
module.exports = ${args.name}Controller`;

        let validator_content = `'use strict'
const BaseValidator = use('App/Validators/BaseValidator')

class ${args.name} extends BaseValidator {
    constructor() {
        super()
    }

    rules = {
        name: 'required',
        file: 'required'
    }
}

module.exports = ${args.name}
`


        //WRITING API CONTROLLER FILES
        const controller_exists = await this.pathExists('app/Controllers/Http/Api/' + args.name + 'Controller.js')
        if (controller_exists) {
            this.warn(args.name + "Controller already exists")
        } else {
            await this.writeFile('app/Controllers/Http/Api/' + args.name + 'Controller.js', controller_content)
            this.info(args.name + "Controller is created")
        }

        //WRITING REPO FILES
        const repo_exists = await this.pathExists('app/Repositories/' + args.name + 'Repository.js')
        if (repo_exists) {
            this.warn(args.name + "Repository already exists")
        } else {
            await this.writeFile('app/Repositories/' + args.name + 'Repository.js', repository_content)
            this.info(args.name + "Repository is created")
        }

        //WRITING SQL MODEL FILES
        const model_sql_exists = await this.pathExists('app/Models/Sql/' + args.model + '.js')
        if (model_sql_exists) {
            this.warn(args.model + " (Model) already exists")
        } else {
            await this.writeFile('app/Models/Sql/' + args.model + '.js', model_sql_content)
            this.info(args.model + " (SQL Model) is created")
        }

        //WRITING NOSQL MODEL FILES
        const model_nosql_exists = await this.pathExists('app/Models/NoSql/' + args.model + '.js')
        if (model_nosql_exists) {
            this.warn(args.model + " (Model) already exists")
        } else {
            await this.writeFile('app/Models/NoSql/' + args.model + '.js', model_nosql_content)
            this.info(args.model + " (NOSQL Model) is created")
        }

        //WRITING ROUTES FILE
        try {
            let route_content = "Route.resource('" + args.name.toLowerCase() + "','Api/" + args.name + "Controller')\n"
            fs.appendFileSync('start/routes.js', route_content);
            this.info('Route added')
        } catch (err) {
            this.error("Unable to add routes in start/routes.js")
        }

        //WRITING VALIDATOR FILES
        let ask_validator = await this.ask('Do you want to add Validator? (y/n)')
        ask_validator = ask_validator.toLowerCase()
        if (ask_validator === 'y') {
            const validator_exists = await this.pathExists('app/Validators/' + args.name + '.js')
            if (validator_exists) {
                this.warn(args.name + " (Validator) already exists")
            } else {
                await this.writeFile('app/Validators/' + args.name + '.js', validator_content)
                this.info(args.model + " (Validator) is created")
            }
        }


        //ALL DONE
        this.success(args.name + " module has been generated. Make sure to adjust the followings:")
        console.log(this.chalk.blue('\t=> Move route to route group (if any)\n\t=> Check DB Table related to this model exists\n\t=> Add rules in Validator and link to route (if required)'))
    }
}

module.exports = Module
