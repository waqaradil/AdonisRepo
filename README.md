# Adonis Repository Pattern

This is the basic boilerplate for AdonisJs, it comes with ready-made CRUD operation

The Repository pattern has Base Repository where all the CRUD functions are defined. 

All we need to do is to create a module that will generate some files such as Controller, Model, Repository, Validator, Routes.

### Project Setup
1. Clone this Repository

2. run command `npm install`

3. setup `.env` file


## Setup
Use this command to generate files

```bash
adonis module module_name model_name
```

During this command execution, you will be asked if you need a Validator or not.


### Deleting a module
In case of typo error or you want to delete a module. simply run this command:

```bash
adonis module module_name model_name --rollback
```
Note: The deleted module will be available in App/RecycleBin/

NOTE: Carefully read the cli instructions after command execution.

### Let me know if the issue and let's expand this to the next level.
