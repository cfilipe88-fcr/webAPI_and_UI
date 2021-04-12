//dependencies
//input validation package
//http://www.npmjs.com/package/validator
const validator = require('validator');

//require databe connection
const contactRepository = require('../repositories/contactRepository.js');
const contactValidator = require('../validators/contactValidators.js');



// Insert a new product
// This function accepts product data as a paramter from the controller.
let createContact = async (contact) => {

    console.log("createContact service: ", contact);

    // declare variables
    let newlyInsertedContact;

    // Call the product validator - kept seperate to avoid clutter here
    // let validatedContact = contactValidator.validateNewContact(contact);

    newlyInsertedContact = await contactRepository.createContact(contact);

    // If validation returned a product object - save to database
    // if (validatedContact != null) {
    // newlyInsertedContact = await contactRepository.createContact(validatedContact);
    // } else {

    // // Product data failed validation
    // newlyInsertedContact = {"error": "invalid Contact"};

    // // log the result
    // console.log("ContactService.createContact(): form data validate failed");
    // }

    // return the newly inserted product
    return newlyInsertedContact;
    };



// product update service
let updateContact = async (contact) => {

 //declare variables
 let updatedContact;
 
 // Call the product validator - kept seperate to avoid clutter here
 //let validatedContact = contactValidator.validateNewContact(contact);

 //If validation returned a product object - save to database

  //console.log("updating.....", contact);

 updatedContact = await contactRepository.updateContact(contact);

//  if (validatedContact != null) {
//  updatedContact = await contactRepository.updateContact(validatedContact);
//  } else {
 
 // Product data failed validation
//  updatedContact = {"error": "Contact updated failed"};
 
//  // log the result
//  console.log("contactService.updateContact(): form data validate failed");
//  }

 // return the newly inserted product
 return updatedContact;
 };


// delete contacts
let deleteContact = async (contactId) => {

    let deleteResult = false;

    // if(!contactValidator.validateId(contactId)) {
    //     console.log("deleteContact service error: invalid id parameter");
    //     return false;
    // }
    deleteResult = await contactRepository.deleteContact(contactId);
    return deleteResult;
    };



// Get all products via the repository
// return products

let getContacts = async () => {
    const contacts = await contactRepository.getContacts();
    return contacts;
    };




// Module exports
// expose these functions
module.exports = {
    createContact,
    updateContact,
    deleteContact,
    getContacts,
};


