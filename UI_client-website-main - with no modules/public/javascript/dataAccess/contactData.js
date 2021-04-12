//
//  Functions used to work with products and categories
//

// import everything from fetchAPI.js
// This will allow resources to be referenced as api.BASE_URL, etc.
import * as api from './fetchAPI.js';

//
// Get all products
let getContacts = async () => {
  try {
    // get products data - note only one parameter in function call
    return await api.getDataAsync(`${api.BASE_URL}/contact`);

  } // catch and log any errors
  catch (err) {
    console.log(err);
  }

}; // End Functions

// Called when add product form is submitted
let createOrUpdate = async (contact) => {

  // url for api call
  const url = `${api.BASE_URL}/contact`;
  // New product = POST, Update = PUT or PATCH
  let httpMethod = 'POST';

  // log to console
  console.log('%c Create or Update Contacts: ', 'color: green', contact);

  // Check if new product or update
  // Only existing products have formProduct._id > 0

  if (contact.id > 0) {
    httpMethod = 'PUT';
  }

  // build the request object - note: POST
  // reqBodyJson added to the req body


  const request = api.fetchInit(httpMethod, JSON.stringify(contact));

  try {
    // Call fetch and await the respose

    debugger;
    return await api.getDataAsync(url, request);

    // const json = await response.json();

    // Output result to console (for testing purposes)
    // console.log(json);
    // return true;
    // catch and log any errors
  } catch (err) {
    console.log(err);
    return err;
  }

}; // End function


//
// Delete product by id using an HTTP DELETE request
let deleteContact = async (id) => {
  // url for delete product endpoint
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
