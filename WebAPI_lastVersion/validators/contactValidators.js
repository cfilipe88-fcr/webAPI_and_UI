// Input validation package
const validator = require('validator');
const baseValidators = require('./baseValidators.js');

// models
const contact = require('../models/contact.js');

let validateNewContact = (formContact) => {

// variables
let validatedContact;
let contactId = 0;

// debug to console - if no data
if (formContact === null) {
console.log("validateNewContact(): Parameter is null");
}

if (formContact.hasOwnProperty('ContactId')) {
    contactId = formContact.contactId
}

    if (
        baseValidators.id(id) &&
        !validator.isEmpty(formContact.firstName) &&
        !validator.isEmpty(formContact.lastName) &&
        !validator.isEmpty(formContact.email)
    ) {
        
        validatedContact = new Contact(
                contactId,
                formContact.uerId,
                // escape is to sanitize - it removes/ encodes any html tags
                validator.escape(formContact.firstName),
                validator.escape(formContact.lastName),
                formContact.email,
                formContact.userMessage
            );
    } else {
        // debug
        console.log("validateNewContact(): Validation failed");
    }
    // return new validated contact object
    return validatedContact;
}



let validateId = (id) => {

    // check if number is numeric
    if (validator.isNumeric(id + '', { no_symbols: true, allow_negatives: false })) {
    return true;
    }

    else {
    console.log("Contact validator: invalid id parameter");
    }

    // validation failed
    return false;
    }


    // Module exports
    // expose these functions
    module.exports = {
    validateNewContact,
    validateId,

    }
