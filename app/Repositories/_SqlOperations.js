'use strict'

const _ = require('lodash')

class _SqlOperations {

    constructor(model) {
        this.model = model
        this.noRecordFound = 'No record found'
    }

    //Get all records
    async index(ctx, order = ['id', 'asc']) {
        let result = await this.model.query().orderBy(order[0], order[1]).fetch()
        result = result.toJSON()
        return result
    }


    //Save a record
    async store(request, response) {
        let input = request.except instanceof Function ? request.except(['password_confirmation']) : request;
        let modelObj = new this.model()

        /*
          *check if the input is not empty -> No need to check here, validator on route will take care of this
        */

        //assigning input data in db fields
        _.forEach(input, function (e, i) {
            modelObj[i] = e
        })

        await modelObj.save()

        return modelObj
    }


    //Show single record
    async show(params, response) {
        const modelObj = await this.model.find(params.id)
        if (!modelObj) {
            return response.status(404).json({msg: this.noRecordFound})
        }
        return modelObj
    }


    //Update a record
    async update(params, request, response) {
        const input = request.all()
        const modelObj = await this.model.find(params.id)

        //check if the row related to this id exists
        if (!modelObj) {
            return response.status(404).json({msg: this.noRecordFound})
        }

        /*
        *check if the input is not empty -> No need to check here, validator on route will take care of it
        */

        //assigning input data in db fields
        _.forEach(input, function (e, i) {
            modelObj[i] = e
        })

        await modelObj.save()

        return modelObj
    }


    async destroy(params, response) {
        const modelObj = await this.model.find(params.id)
        if (!modelObj) {
            return response.status(404).json({data: this.noRecordFound})
        }
        await modelObj.delete()
        return response.status(200).json({msg: this.model.name + " deleted", data: modelObj})
    }
}

module.exports = _SqlOperations
