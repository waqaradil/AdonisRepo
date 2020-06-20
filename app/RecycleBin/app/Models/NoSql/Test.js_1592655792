'use strict'

const BaseModel = use('MongooseModel')

/**
 * @class Test
 */
class Test extends BaseModel {
  static boot ({ schema }) {
    // Hooks:
    // this.addHook('preSave', () => {})
    // this.addHook('preSave', 'TestHook.method')
    // Indexes:
    // this.index({}, {background: true})
  }
  /**
   * Test's schema
   */
  static get schema () {
    return {

    }
  }

  //Link Model and collection, in case where model name mismatch collection name
  static get schemaOptions() {
    return { collection: 'Tests', };
  }
}

module.exports = Test.buildModel('Test')
