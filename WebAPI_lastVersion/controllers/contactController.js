const router = require('express').Router();
const contactService = require('../services/contactService.js');
const userService = require('../services/userService.js');

//auth0
const { authConfig, checkJwt, checkAuth } = require('../middleware/jwtAuth.js');

// POST - Insert a new contact.
// This async function sends a HTTP POST request
router.post('/', async (req, res) => {
    
    // the request body contains the new contact values - copy it
    const newContact = req.body;

    // show what was copied in the console (server side)
    console.log("contactController: ", newContact);

    // Pass the new contact data to the service and await the result
    try {

    // Send response with JSON result
    result = await contactService.createContact(newContact);

    // send a json response back to the client
    res.json(result);

    // handle server (status 500) errors
    } catch (err) {
    res.status(500)
    res.send(err.message)
    }
    });


// GET listing of all contacts
// Address http://server:port/contact
// returns JSON

router.get('/', async (req, res) => {

// Get contacts
try {
//call the contact service to get a list of contacts
const result = await contactService.getContacts();

res.json(result);

// Catch and send any errors
} catch (err) {
res.status(500);
res.send(err.message);
}
});



// PUT update contact
router.put('/', async (req, res) => {

    const contact = req.body;

    try {

        result = await contactService.updateContact(contact);
        res.json(result);
            } catch (err) {
                res.status(500)
                res.send(err.message)
            }
});




// DELETE single task.
router.delete('/:id', async (req, res) => {

    const contactId = req.params.id;

    try {
    const result = await contactService.deleteContact(contactId);
    res.json(result);

    }catch (err) {
        res.status(500);
        res.send(err.message);
    }
});


// Export as a module
module.exports = router;
