//db connection
const {sql, dbConnPoolPromise} = require('../database/db.js');

//models
const contact = require('../models/contact.js');

const SQL_INSERT = 'INSERT INTO dbo.contact (firstName, lastName, email, userMessage) VALUES (@firstName, @lastName, @email, @userMessage);';
const SQL_UPDATE = 'UPDATE dbo.contact SET id = @id, firstName = @firstName, lastName = @lastName, email = @email, userMessage = @userMessage WHERE id = @id; SELECT * FROM dbo.contact WHERE id = @id;';
const SQL_DELETE = 'DELETE FROM dbo.contact WHERE id = @id;';

// Get all contacts from the contacts table
const SQL_SELECT_ALL = 'SELECT * FROM dbo.contact ORDER BY id ASC for json path;';


// Get all contact
let getContacts = async () => {

    // variable to store contacts
    let contacts;

    // DB connection and SQL
    try {
        const pool = await dbConnPoolPromise;
        const result = await pool.request()
            
            .query(SQL_SELECT_ALL);

        contacts = result.recordset[0];

    } catch (err) {
        console.log('DB Error - get all contacts: ', err.message);
    }

    return contacts;
};



// insert/ create a new contact
let createContact = async (contact) => {

    // variable
    let insertedContact;

    // Insert a new contact
    try {

        const pool = await dbConnPoolPromise;
        const result = await pool.request()

            // named parameter(s) in query
            .input('firstName', sql.NVarChar, contact.firstName)
            .input('lastName', sql.NVarChar, contact.lastName)
            .input('email', sql.NVarChar,  contact.email)
            .input('userMessage', sql.NVarChar, contact.userMessage)

            .query(SQL_INSERT);

        // The newly inserted contact is returned by the query
        insertedContact = result.recordset[0];

        console.log('insertedContact', insertedContact);

        // catch and log DB errors
        } catch (err) {
            console.log('DB Error - error inserting a new Contact: ', err.message);
        }

        // Return the contact data
        return insertedContact;
};


// update a contact
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

        return updatedContact;
};


let deleteContact = async (contactId) => {

    // variable
    let rowsAffected = 0;

    try {

        const pool = await dbConnPoolPromise
        const result = await pool.request()

            // named parameter(s) in query
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
