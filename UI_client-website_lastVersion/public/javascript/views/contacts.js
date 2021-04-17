import * as contactData from '../dataAccess/contactData.js';
import { Contact } from '../models/Contact.js';

// Get values from contact form
// Create new Contact and return
let getContactForm = () => {

  // new Contact object constructed from the form values
  return new Contact(
    document.getElementById('id').value,
    document.getElementById('fname').value,
    document.getElementById('lname').value,
    document.getElementById('email').value,
    document.getElementById('message').value,
  );
};


let addOrUpdateContact = async () => {
  // Get the form data
  const contactForm = getContactForm();

  if (contactForm) {
    await contactData.createOrUpdate(contactForm);
  }
};


let init = async () => {
  // Add Event Listeners to the Add Contact and form save buttons
  document.getElementById('createContact').addEventListener('click', () => {
    return addOrUpdateContact();
  });
};


export {
  addOrUpdateContact,
  init,
};


init();


