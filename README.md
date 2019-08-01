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


### Deleting a module
In case of typo error or you want to delete a module. simply run this command:

```bash
adonis module module_name model_name --rollback
```
The deleted module will be available in App/RecycleBin/

NOTE: Carefully read the cli instructions after command execution.

That's all. Test your module crud api with postman. Don't forget to seed the database before testing in postman.

### Let me know the issues and let's expand this to the next level.
