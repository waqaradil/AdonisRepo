const {hooks} = require('@adonisjs/ignitor')


hooks.after.providersBooted(() => {
    const Env = use('Env')
    const edge = require('edge.js')
    const Route = use('Route')
    const moment = require('moment')
    const fs = require('fs')
    const HTMLDecoderEncoder = require('html-encoder-decoder')
    const Config = use('Config')


    /*base Url*/
    edge.global('baseUrl', function (route = "") {
        return Env.get('APP_URL') + '/' + route
    })

    /*Route List*/
    edge.global('routeList', function () {
        let list = Route.list().map((route) => {
            return route.toJSON()
        })
        return list
    })

    /*Date Format*/
    edge.global('dateFormat', function (date, format) {
        return moment(date || new Date()).format(format)
    })


    /*******************************
     *Image Not found
     *******************************/
    edge.global('imageExist', function (imagePath, fileName, version = null, type = null) {
        /*
        * imagePath will be the path after public folder e.g: pic/
        * fileName will be the name of file with any slash e.g mypic.png
        * Version will be either medium or small
        * Return file path if exist other with notfound image path will be returned
        * */

        let filepath,
            notFound = type === 'user' ? Config.get('constants.notFoundUser') : Config.get('constants.notFound')


        if (fileName) {
            /*Version selection*/
            switch (version) {
                case 'medium':
                    filepath = imagePath + 'medium_' + fileName
                    break;
                case 'small':
                    filepath = imagePath + 'small_' + fileName
                    break;
                default:
                    filepath = imagePath + fileName
            }

            /*Final output*/
            if (!fs.existsSync('./public/' + filepath)) {
                filepath = notFound
            }
        } else {
            filepath = notFound
        }
        return filepath
    })


    /****************************************
     *HTML Decoder
     ***************************************/
    edge.global('htmlDecoder', function (content) {
        return HTMLDecoderEncoder.decode(content)
    })


    /*******************************
     * ENV Variable in Edge
     *******************************/
    edge.global('env', function (varName) {
        return Env.get(varName)
    })

    /*******************************
     *Constants
     *******************************/
    edge.global('constant', function (name) {
        if (!name) {
            return
        }
        return Config.get('constants.' + name)
    })

    /*******************************
     * Math.Floor function
     *******************************/
    edge.global('floor', function (v) {
        return Math.floor(v)
    })

    /*******************************
     *Null to N/A
     *******************************/
    edge.global('ntn', function (value, label) {
        // return value || `<a href="${Env.get('APP_URL') + '/edit-profile'}">Add ${label}</a>`
        return (value || value !== 'undefined') || label
    })


    /*******************************
     *Ago Format
     *******************************/
    edge.global('timeAgo', function (date, format) {
        return moment(date, format).fromNow()
    })


})