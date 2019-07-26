'use strict'

const { Command } = require('@adonisjs/ace')

class Quote extends Command {
  static get signature () {
    return `
      customController 
      {name: Name of the Controller}
      `
  }

  static get description () {
    return 'Tell something helpful about this command'
  }

  async handle (args, options) {
    // this.info('Dummy implementation for quote command, args=' +  + ' and flag= '+ options)
    // console.log(`the class name is ${args.name}`)
    // await this.writeFile(Helpers.appRoot(`App/Controllers/Http/First.js`), '…')
    const contents = await this.writeFile('app/Controllers/Http/UserController.js', 'hey')
    console.log(contents)
  }
}

module.exports = Quote
