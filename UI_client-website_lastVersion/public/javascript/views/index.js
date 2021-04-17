//
// Function used to update index.html
//

import { API_ROLES } from '../auth/auth0-variables.js';
import { checkAuth } from '../auth/jwtAuth.js';

import * as contactData from '../dataAccess/contactData.js';

let displayContacts = ((contacts) => {
    console.log('displayContacts', contacts);

    //leaving as PRODUCT coz' I'm using the auth0-variables 
    const showUpdate = checkAuth(API_ROLES.UPDATE_PRODUCT);
    const showDelete = checkAuth(API_ROLES.DELETE_PRODUCT);
   

    const rows = contacts.map(contact => {
        // returns a template string for each contact
        let row = `<tr>
        <td>${contact.id}</td> 
        <td>${contact.firstName}</td>
        <td>${contact.lastName}</td>
        <td>${contact.email}</td>
        <td>${contact.userMessage}</td>`;

        if (showUpdate){
            row += `<td><button id="${contact.id}" class="btn btn-sm btn-outline-primary btn-update-contact"
              data-bs-toggle="modal" data-bs-target="#contactForm">
              <span class="bi bi-pencil-square" 
              data-toggle="tooltip" title="Edit contact">
              </span></button></td>`;
            }

            if (showDelete) {
                row += `<td><button id="${contact.id}" class="btn btn-sm btn-outline-danger btn-delete-contact">
                <span class="bi bi-trash" data-toggle="tooltip" 
                  title="Delete contact"></span></button></td>`;
            }

            row += `</tr>`;
            return row;
            });


    document.getElementById('contactsRow').innerHTML = rows.join('');
  
    const updateButtons = document.getElementsByClassName('btn-update-contact');
    const deleteButtons = document.getElementsByClassName('btn-delete-contact');

    // 'click' event listener to each button
    //  Both arrays have same length so only need 1 loop
    for (let i = 0; i < updateButtons.length; i++) {
        updateButtons[i].addEventListener("click", addOrUpdateContact);
        deleteButtons[i].addEventListener("click", deleteContact);
    }
}); // end function




let addOrUpdateContact = async () => {
    // Get the form data
    const formContact = getProductForm();

    if (formContact) {
        const result = await contactData.createOrUpdate(formContact);
        loadProducts();
    }
} // End Function


async function deleteContact() {
    const result = await contactData.deleteContactById(this.id);
    if (result === true) {
        loadContact();
    }
}

//
// Get all Contacts then display
let loadContacts = async () => {
    // get category data - note only one parameter in function call
    const contacts = await contactData.getContacts();
    console.log('contacts', contacts);
    // pass json data for display
    if (contacts) {
        displayContacts(contacts);
    }
    

} // End function

export {
    loadContacts,
    deleteContact,
    addOrUpdateContact
};

// When this script is loaded, get things started by calling loadContacts()
loadContacts();
