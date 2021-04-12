//dependencies

//db connection
const {sql, dbConnPoolPromise} = require('../database/db.js');

//models
const contact = require('../models/contact.js');

const SQL_INSERT = 'INSERT INTO dbo.contact (firstName, lastName, email, userMessage) VALUES (@firstName, @lastName, @email, @userMessage);';
const SQL_UPDATE = 'UPDATE dbo.contact SET id = @id, firstName = @firstName, lastName = @lastName, email = @email, userMessage = @userMessage WHERE id = @id; SELECT * FROM dbo.contact WHERE id = @id;';
const SQL_DELETE = 'DELETE FROM dbo.contact WHERE id = @id;';

// Define SQL statements here for use in function below
// These are parameterised queries note @named parameters.
// Input parameters are parsed and set before queries are executed
// Get all products from the products table
// for json path - Tell MS SQL to return results as JSON (avoiding the need to convert here)
const SQL_SELECT_ALL = 'SELECT * FROM dbo.contact ORDER BY id ASC for json path;';


// Get all products
// This is an async function named getProducts defined using ES6 => syntax
let getContacts = async () => {

    // define variable to store products
    let contacts;

    // Get a DB connection and execute SQL (uses imported database module)
    // Note await in try/catch block
    try {
        const pool = await dbConnPoolPromise;
        const result = await pool.request()
            // execute query
            .query(SQL_SELECT_ALL);

        // first element of the recordset contains products
        contacts = result.recordset[0];

    // Catch and log errors to cserver side console
    } catch (err) {
        console.log('DB Error - get all contacts: ', err.message);
    }

    // return products
    return contacts;
};



// insert/ create a new product
// parameter: a validated product model object
let createContact = async (contact) => {

    // Declare constanrs and variables
    let insertedContact;

    // Insert a new product
    // Note: no Product yet
    try {
        // Get a DB connection and execute SQL
        const pool = await dbConnPoolPromise;
        const result = await pool.request()

            // set named parameter(s) in query
            // checks for potential sql injection
            // .input('userId', sql.Int, contact.userId)
            .input('firstName', sql.NVarChar, contact.firstName)
            .input('lastName', sql.NVarChar, contact.lastName)
            .input('email', sql.NVarChar,  contact.email)
            .input('userMessage', sql.NVarChar, contact.userMessage)

            // Execute Query
            .query(SQL_INSERT);

        // The newly inserted product is returned by the query
        insertedContact = result.recordset[0];


        console.log('insertedContact', insertedContact);

        // catch and log DB errors
        } catch (err) {
            console.log('DB Error - error inserting a new Contact: ', err.message);
        }

        // Return the product data
        return insertedContact;
};


// insert/ update a product
// parameter: a validated product model object
let updateContact = async (contact) => {

    // Declare constanrs and variables
    let updatedContact;

    try {
        // Get a DB connection and execute SQL
        const pool = await dbConnPoolPromise
        const result = await pool.request()

            // set named parameter(s) in query
            // checks for potential sql injection
            .input('id', sql.Int, contact.id)
            .input('firstName', sql.NVarChar, contact.firstName)
            .input('lastName', sql.NVarChar, contact.lastName)
            .input('email', sql.NVarChar,  contact.email)
            .input('userMessage', sql.NVarChar, contact.userMessage)

            // Execute Query
            .query(SQL_UPDATE);

        updatedContact = result.recordset[0];

        console.log('updateContact', updatedContact);

        // catch and log DB errors
        } catch (err) {
            console.log('DB Error - error updating contact: ', err.message);
        }

        // Return the product data
        return updatedContact;
};


let deleteContact = async (contactId) => {

    // Declare constanrs and variables
    let rowsAffected = 0;

    try {
        // Get a DB connection and execute SQL
        const pool = await dbConnPoolPromise
        const result = await pool.request()

            // set named parameter(s) in query
            // checks for potential sql injection
            .input('id', sql.Int, contactId)
            .query(SQL_DELETE);

        rowsAffected = Number(result.rowsAffected);

        // catch and log DB errors
        } catch (err) {
            console.log('DB Error - Delete contact by Id: ', err.message);
        }

        if(rowsAffected === 0)
        return false;
        return true;
};



// Export
module.exports = {
    getContacts,
    createContact,
    updateContact,
    deleteContact,
};
