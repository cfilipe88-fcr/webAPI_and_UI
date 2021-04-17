
const validator = require('validator');

//require databe connection
const contactRepository = require('../repositories/contactRepository.js');
const contactValidator = require('../validators/contactValidators.js');


// Insert a new contact
// This function accepts contact data as a paramter from the controller.
let createContact = async (contact) => {

    // console.log("createContact service: ", contact);

    // variable
    let newlyInsertedContact;

    newlyInsertedContact = await contactRepository.createContact(contact);

    return newlyInsertedContact;
    };


// contact update service
let updateContact = async (contact) => {

 //variable
 let updatedContact;
 
 updatedContact = await contactRepository.updateContact(contact);

 return updatedContact;
 };


// delete contacts
let deleteContact = async (contactId) => {

    let deleteResult = false;

    deleteResult = await contactRepository.deleteContact(contactId);
    return deleteResult;
    };



// Get all contacts via the repository
let getContacts = async () => {
    const contacts = await contactRepository.getContacts();
    return contacts;
    };



module.exports = {
    createContact,
    updateContact,
    deleteContact,
    getContacts,
};


