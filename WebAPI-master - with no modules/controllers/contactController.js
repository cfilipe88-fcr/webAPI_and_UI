const router = require('express').Router();
const contactService = require('../services/contactService.js');
const userService = require('../services/userService.js');

//auth0
const { authConfig, checkJwt, checkAuth } = require('../middleware/jwtAuth.js');

// POST - Insert a new product.
// This async function sends a HTTP POST request
router.post('/', async (req, res) => {
    console.log("contactController: ", req);
    // the request body contains the new product values - copy it
    const newContact = req.body;

    // show what was copied in the console (server side)
    console.log("contactController: ", newContact);

    // Pass the new product data to the service and await the result
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


// GET listing of all products
// Address http://server:port/product
// returns JSON

router.get('/', async (req, res) => {

    // if (req.headers['authorization']) {

    //     try {

    //     let token = await req.headers['authorization'].replace('Bearer ', '');
    //     const userProfile = await userService.getAuthUser(token);
    //     console.log("%c user profile: ", 'color:blue', userProfile);
    //     console.log("%c user email: ", 'color: blue', userProfile.email);
    //     } catch (err) {
    //         console.log(`ERROR getting user profile: ${err.message}`);
    //     }
    // }

// Get products
try {
//call the product servoce to get a list of products
const result = await contactService.getContacts();

res.json(result);

// Catch and send any errors
} catch (err) {
res.status(500);
res.send(err.message);
}
});



// PUT update product
// Like post but productId is provided and method = put
router.put('/', async (req, res) => {

    const contact = req.body;

    console.log("contactController update: ", contact);

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
