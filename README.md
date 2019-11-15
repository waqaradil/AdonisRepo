# Adonis Repository Pattern

This is the basic boilerplate for AdonisJs 4.1, it comes with ready-made CRUD operation

The Repository pattern has Base Repository where all the CRUD functions are defined. 

All we need to do is to create a module that will generate some files such as Controller, Model, Repository, Validator, Routes.

### Project Setup
1. Clone this Repository

2. run command `npm install`

3. setup `.env` file

4. Make Migrations or Manually create database

## Setup
Use this command to generate files

```bash
adonis module module_name model_name
```

#### Note: Model name should be the singular version of your database table name.

During this command execution, you will be asked if you need a Validator or not.

***************
**Note:** The Routes  needs to be copied inside the ```api/v1/ route group```
***************
## Generated Files and Folder Structure
- Controller _(extends BaseController)_ `App -> Controllers -> Http -> Api -> UserController.js`
- Repository _(extends BaseRepository)_ `App -> Repositories -> UserRepository.js`
- Mysql Model _(Basic Crud DataBase Operations for MySql)_ `App -> Models -> Sql -> User.js`
- MongoDb Model _(Basic Crud DataBase Operations for Mongoose)_ `App -> Models -> NoSql -> User.js`
- Validator
 
#### How to Start
Since Basic Crud is already there, you just need to create more business logics / functions in Repository related module just created. 

Add more things in Models already linked with Repository.

## Deleting a module
In case of typo error or you want to delete a module. simply run this command:

```bash
adonis module module_name model_name --rollback
```
The deleted module will be available in App/RecycleBin/

NOTE: Carefully read the cli instructions after command execution.

That's all. Test your module crud api with postman. Don't forget to seed the database before testing in postman.

## Choosing between mysql and mongoose
You can choose either mongoose or mysql as data source, steps to perform database selection:
* copy .env.example placed on root and rename it to .env
  * uncomment ```DB_CONNECTION``` and related params for either mysql or mongodb - currently only 4 basic operations (CRUD) are available on module creation. 
* when a new module is generated, the generator will create models for both mysql and mongodb
* Make sure both databases have same structure in order work perfectly for switching between mongo and mysql

***************
**Problem:** What if the Model name is different from your mongodb collection name? 

**Solution:** Navigate to App/Models/NoSql/```ModelName```  Look for a function ```schemaOptions()``` and change the collection name. 
***************

### Coming up next
* Postman export file on module creation
* GUI for creating Database


### Let me know the issues and let's expand this to the next level.
