// Input validation package
// https://www.npmjs.com/package/validator

const validator = require('validator');
const baseValidators = require('./baseValidators.js');

// models
const contact = require('../models/contact.js');

// Validate the body data, sent by the client, for a new product
// formProduct represents the data filled in a form
// It needs to be validated before using in gthe application
let validateNewContact = (formContact) => {

// Declare constants and variables
let validatedContact;
let contactId = 0;

// debug to console - if no data
if (formContact === null) {
console.log("validateNewContact(): Parameter is null");
}

if (formProduct.hasOwnProperty('ContactId')) {
    contactId = formContact.contactId
}

// Validate form data for new product fields
    // Creating a product does not need a product id
    // Adding '' to the numeric values makes them strings for validation purposes ()
    // appending + '' to numbers as the validator only works with strings
    if (
        baseValidators.id(id) &&
        !validator.isEmpty(formContact.firstName) &&
        !validator.isEmpty(formContact.lastName) &&
        !validator.isEmpty(formContact.email)
    ) {
        // Validation passed
        // create a new Product instance based on Product model object
        // no value for product id (passed as null)
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
    // return new validated product object
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
