//
// Function used to update index.html
//

import { API_ROLES } from '../auth/auth0-variables.js';
import { checkAuth } from '../auth/jwtAuth.js';
import { Contact } from '../models/Contact.js';
import * as contactData from '../dataAccess/contactData.js';

let displayContacts = ((contacts) => {
    console.log('displayContacts', contacts);

    //leave as PRODUCT due the auth0-variables -----------------------------------
    const showUpdate = checkAuth(API_ROLES.UPDATE_PRODUCT);
    const showDelete = checkAuth(API_ROLES.DELETE_PRODUCT);
    const showAdd = checkAuth(API_ROLES.CREATE_PRODUCT);

    // if (showAdd) {
    //     document.getElementById('AddProductButton').style.display = 'block';
    // } else {
    //     document.getElementById('AddProductButton').style.display = 'block';
    // }

    const rows = contacts.map(contact => {
        // returns a template string for each product, values are inserted using ${ }
        // <tr> is a table row and <td> a table division represents a column
        // product_price is converted to a Number value and displayed with two decimal places
        // icons - https://icons.getbootstrap.com/
        let row = `<tr>
        <td>${contact.id}</td> 
        <td>${contact.firstName}</td>
        <td>${contact.lastName}</td>
        <td>${contact.email}</td>
        <td>${contact.userMessage}</td>`;

        if (showUpdate){
            row += `<td><button id="${contact.id}" class="btn btn-sm btn-outline-primary btn-update-product"
              data-bs-toggle="modal" data-bs-target="#ProductFormDialog">
              <span class="bi bi-pencil-square" 
              data-toggle="tooltip" title="Edit Product">
              </span></button></td>`;
            }

            if (showDelete) {
                row += `<td><button id="${contact.id}" class="btn btn-sm btn-outline-danger btn-delete-product">
                <span class="bi bi-trash" data-toggle="tooltip" 
                  title="Delete Product"></span></button></td>`;
            }

            row += `</tr>`;
            return row;
            });


    // Set the innerHTML of the productRows root element = rows
    // join('') converts the rows array to a string, replacing the ',' delimiter with '' (blank)
    document.getElementById('contactsRow').innerHTML = rows.join('');

    // Add Event listners
    // 1. Find button all elements with matching class name
    const updateButtons = document.getElementsByClassName('btn-update-product');
    const deleteButtons = document.getElementsByClassName('btn-delete-product');

    // 2. Assign a 'click' event listener to each button
    // Both arrays have same length so only need 1 loop
    for (let i = 0; i < updateButtons.length; i++) {
        updateButtons[i].addEventListener("click", prepareProductUpdate);
        deleteButtons[i].addEventListener("click", deleteProduct);
    }
}); // end function




// // Get values from product form
// // Create new Product and return
// let getProductForm = () => {
//     // new Product object constructed from the form values
//     // Note: These should be validated!!
//     return new Product(
//         // read the form values and pass to the Product constructor
//             document.getElementById('_id').value,
//             document.getElementById('category_id').value,
//             document.getElementById('product_name').value,
//             document.getElementById('product_description').value,
//             document.getElementById('product_stock').value,
//             document.getElementById('product_price').value,
//     );
// } // End function


//
// // Setup product form
// function productFormSetup(title) {
//     // reset the form and change the title
//     document.getElementById('productForm').reset();
//     document.getElementById('productFormTitle').innerHTML = title;

//     // form reset doesn't work for hidden inputs!!
//     // do this to rreset previous id if set
//     document.getElementById("_id").value = 0;
// } // End function




// When a product is selected for update/ editing
// get by id and fill out the form
// async function prepareProductUpdate() {
//     try {
//         // 1. Get broduct by id
//         const product = await productData.getProductById(this.id);
//         // 2. Set form defaults
//         productFormSetup(`Update Product ID: ${product.ProductId}`);

//         // 3. Fill out the form
//         document.getElementById('_id').value = product.ProductId; // uses a hidden field - see the form
//         document.getElementById('category_id').value = product.CategoryId;
//         document.getElementById('product_name').value = product.ProductName;
//         document.getElementById('product_description').value = product.ProductDescription;
//         document.getElementById('product_stock').value = product.ProductStock;
//         document.getElementById('product_price').value = product.ProductPrice;

//     } // catch and log any errors
//     catch (err) {
//         console.log(err);
//     }
// } // End function

let addOrUpdateContact = async () => {
    // Get the form data
    const formProduct = getProductForm();

    if (formProduct) {
        const result = await productData.createOrUpdate(formProduct);
        loadProducts();
    }
} // End Function


async function deleteProduct() {
    const result = await productData.deleteProductById(this.id);
    if (result === true) {
        loadProducts();
    }
}

//
// Get all categories and products then display
let loadContacts = async () => {
    // get category data - note only one parameter in function call
    const contacts = await contactData.getContacts();
    console.log('contacts', contacts);
    // pass json data for display
    if (contacts) {
        displayContacts(contacts);
    }
    // Add Event Listeners to the Add Product  and form save buttons
    // document.getElementById('AddProductButton').addEventListener('click', () => {
    //     productFormSetup('Add Product');
    // });


} // End function

export {
    loadContacts,
    deleteProduct,
    addOrUpdateContact
};

// When this script is loaded, get things started by calling loadContacts()
loadContacts();
