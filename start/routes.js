'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')


Route.on('/').render('welcome')

Route.group(() => {
    Route.resource('users', 'Api/UserController')
        .validator(new Map([
            // [['users.store'], ['SaveUser']],
            [['users.update'], ['UpdateUser']],
            [['users.delete'], ['DeleteUser']]
        ]))
    Route.delete('delete-all-users', 'Api/UserController.deleteAllUsers')
}).prefix('api/v1/')


