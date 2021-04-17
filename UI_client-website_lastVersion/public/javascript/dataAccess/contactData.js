//
//  Functions used to work with contacts
//

// importing from fetchAPI.js
import * as api from './fetchAPI.js';

//
// Get all contacts
let getContacts = async () => {
  try {
    // get contacts data - note only one parameter in function call
    return await api.getDataAsync(`${api.BASE_URL}/contact`);

  } // catch and log any errors
  catch (err) {
    console.log(err);
  }

}; // End Functions

// Called when add contact form is submitted
let createOrUpdate = async (contact) => {

  // url for api call
  const url = `${api.BASE_URL}/contact`;
  // New contact = POST, Update = PUT or PATCH
  let httpMethod = 'POST';

  // log to console
  console.log('%c Create or Update Contacts: ', 'color: green', contact);

  // Checking if new contact or update
  if (contact.id > 0) {
    httpMethod = 'PUT';
  }

  // reqBodyJson added to the req body
  const request = api.fetchInit(httpMethod, JSON.stringify(contact));

  try {

    return await api.getDataAsync(url, request);

  } catch (err) {
    console.log(err);
    return err;
  }

}; // End function



// Delete contact by id using an HTTP DELETE request
let deleteContact = async (id) => {
  
  const url = `${api.BASE_URL}/contact/${id}`;

  // Build the request object
  const request = api.fetchInit('DELETE');

  // Confirm delete
  if (confirm("Are you sure?")) {
    try {
      // call the api and get a result
      return await api.getDataAsync(url, request);
      // catch and log any errors
    } catch (err) {
      console.log(err);
      return err;
    }
  }
} // End Function

export {
  getContacts,
  createOrUpdate,
  deleteContact
}
