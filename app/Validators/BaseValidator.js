'use strict'

class BaseValidator {

    sanitizationRules = {
        post_title: 'trim',
        status: 'to_int'
    }


    rules = {
        post_title: 'required',
        post_content: 'required',
        post_category_id: 'required|integer',
    }

    messages = {
        'post_title.required': 'You must provide a post title.',
        'name.required': 'You must provide name.',
        'description.required': 'You must provide description.',
        'post_content.required': 'You must provide post content.',
        'post_category_id.required': 'Select a category.',
        'price.required': 'Enter product price.',
        'advert_date.date': 'Invalid date format for Advert date',
        'deadline.date': 'Invalid date format for DeadLine',
        'profession_id.integer': 'Invalid data provided for profession',
        'location_id.integer': 'Invalid data provided for Location.',
        'password.confirmed': 'Password mismatched, please recheck',
        'password.required': 'Password is required',
        'username.required': 'Username is required',
        'email.required': 'Username or Email is required',
        'full_name.required': 'Full Name is required',
        'message.required': 'Message is required',
        'email.email': 'Email format is not valid',
        'subject.required': 'Subject is required',
        'tag.required_with_any': 'Please provide tag with new image',
        'phone.number': 'Invalid phone number',
        'job_application_email.required': 'Application Email is required',
        'job_application_email.email': 'Application Email is not valid.',
        'status.equal': 'The application should be unapproved first',
        'status.required': 'Status is required',
        'g-recaptcha-response.required': 'Please verify that you are not a bot.'

    }

    async fails(errorMessages) {
        return this.ctx.response.status(422).send(errorMessages)
    }

    get validateAll() {
        return true
    }

}

module.exports = BaseValidator
