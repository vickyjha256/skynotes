const express = require('express');
const User = require('../models/User'); // Here, we import the (User) from models. 
const router = express.Router();
const { body, validationResult } = require('express-validator'); // This is for adding validation.
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = "VeloUVisthepowerfulbondintheworld$ever."

// ROUTE 1:--> Create a user using: POST "/api/auth/createuser". No login required.
router.post('/createuser', [
    body('name', 'Please Enter a valid name !!').isLength({ min: 3 }),
    body('email', 'Please Enter a valid Email !!').isEmail(),
    body('password', 'Password is too short, Enter atleast 5 characters !!').isLength({ min: 5 }),
], async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) { // It returns error 400 bad request if error occured.
        return res.status(400).json({ success, errors: errors.array() });
    }
    // Below code check whether the user with this email exists already.
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ success, error: 'Sorry, user already exists with this email !!' })
        }

        const salt = await bcrypt.genSalt(10);
        const secPassWord = await bcrypt.hash(req.body.password, salt);

        user = await User.create({ // It creates new user in the database.
            name: req.body.name,
            email: req.body.email,
            password: secPassWord,
        });
        const data = {
            id: user.id
        }
        const authtoken = jwt.sign(data, JWT_SECRET);

        success = true;
        res.json({ success, authtoken });
        // res.json(user);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send("Some error occurred.");
    }
})

// ROUTE 2:--> Authenticate a user using: POST "/api/auth/login". No login required.
router.post('/login', [
    body('email', 'Enter a valid email.').isEmail(),
    body('password', 'Password field cannot be empty.').exists(),
], async (req, res) => {
    let success = false;
    // If there are errors, return bad request and the errors.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body; // Using destructuring method of javascript.

    try {
        let user = await User.findOne({ email }); // It finds the user (in Database) with the entered email of the client.
        if (!user) {
            success = false;
            return res.status(400).json({ error: "Please try to login with correct email and password !!" });
        }

        const passwordCompare = await bcrypt.compare(password, user.password); // It compares the entered password with database's password.
        if (!passwordCompare) {
            success = false;
            return res.status(400).json({ error: "Please try to login with correct email and password !!" });
        }

        const data = {
            user: {
                id: user.id
            }
        }

        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authtoken });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Internal Server Error.");
    }
});

// ROUTE 3:--> Get Logged in user details using: POST "/api/auth/getuser". Login required.
router.post('/getuser', fetchuser, async (req, res) => {

    try {
        let userId = req.user.id;
        // userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Internal Server Error.");
    }
})
module.exports = router;