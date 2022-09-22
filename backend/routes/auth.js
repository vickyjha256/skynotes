const express = require('express');
const User = require('../models/User'); // Here, we import the (User) from models. 
const router = express.Router();
const { body, validationResult } = require('express-validator'); // This is for adding validation.
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
const otpgenerator = require('otp-generator');
const nodemailer = require('nodemailer');

const JWT_SECRET = "VeloUVisthepowerfulbondintheworld$ever."

// ROUTE 1:--> Create a user using: POST "/api/auth/createuser". No login required.
router.post('/createuser', [
    body('name', 'Please Enter a valid name !!').isLength({ min: 3 }),
    body('email', 'Please Enter a valid Email !!').isEmail().toLowerCase(),
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
});

// ROUTE 2:--> Authenticate a user using: POST "/api/auth/login". No login required.
router.post('/login', [
    body('email', 'Enter a valid email.').isEmail().toLowerCase(),
    body('password', 'Password field cannot be empty.').exists(),
], async (req, res) => {
    let success = false;
    // If there are errors, return bad request and the errors.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body; // Using destructuring method of javascript, Get the email and password from body.

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
});

// ROUTE 4:--> Verifying User using: POST "/api/auth/forgotpassword". No Login required.
let genotp; // This is created globally for accessing in multiple routes. Such as for (otpverify) route.
let userauth; // This variable is created globally for resetting password and for access in multiple routes.
router.post('/forgotpassword', [
    body('email', 'Enter a valid email.').isEmail().toLowerCase(),
], async (req, res) => {
    let success = false;
    // If there are errors, return bad request and the errors.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email } = req.body; // Using destructuring method of javascript, Get the email from body.

    try {
        // let user = await User.findOne({ email }); // It finds the user (in Database) with the entered email of the client.
        userauth = await User.findOne({ email }); // It finds the user (in Database) with the entered email of the client.
        if (!userauth) {
            success = false;
            return res.status(400).json({ error: "Please enter correct email !!" });
        }

        genotp = otpgenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });
        let userName = userauth.name;

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'skynotes.verify@gmail.com',
                pass: 'baqilinctibumuqu'
            }
        });

        var mailOptions = {
            from: 'skynotes.verify@gmail.com',
            to: `${email}`,
            subject: 'OTP for user verification.',
            html: `<h3> Hello, ${userName}</h3>Please use the 6 digit OTP below to reset your password:<br><b>${genotp}</b>
            <br>If you didn't request this, you can ignore this email.<h4>Thanks<br>Skynotes</h4>`
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        success = true;
        res.json({ success });

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Internal Server Error.");
    }
});

// ROUTE 5:--> Matching OTP using: POST "/api/auth/otpverify". No Login required.
let otp;
router.post('/otpverify', [
    body('otp', 'Enter a valid OTP.').isInt(),
], async (req, res) => {
    let success = false;
    // If there are errors, return bad request and the errors.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    otp = req.body.otp; // Using destructuring method of javascript, Get the otp from body.

    try {
        if (otp != genotp) {
            success = false;
            return res.status(400).json({ error: "Please enter correct OTP !!" });
        }

        success = true;
        res.json({ success });

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Internal Server Error.");
    }
});

// ROUTE 6:--> Resetting Password using: POST "/api/auth/resetpassword". No Login required.
router.post('/resetpassword', [
    body('newpassword', 'Password is too short, Enter atleast 5 characters !!').isLength({ min: 5 }),
], async (req, res) => {
    let success = false;
    // If there are errors, return bad request and the errors.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { newpassword } = req.body; // Using destructuring method of javascript, Get the otp from body.

    try {
        if (!userauth || otp != genotp) {
            success = false;
            return res.status(400).json({ error: "Unauthorized action performed 😠😠 !!" });
        }

        const salt = await bcrypt.genSalt(10);
        const newsecPassWord = await bcrypt.hash(newpassword, salt);

        const user = await userauth.updateOne({ // It creates new user in the database.
            password: newsecPassWord,
        });

        success = true;
        res.json({ success });

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Internal Server Error.");
    }
});

// ROUTE 7:--> Changing Password using: POST "/api/auth/changepassword". Login required.
router.post('/changepassword', fetchuser, [
    body('currentpassword', 'Password is too short, Enter atleast 5 characters !!').isLength({ min: 5 }),
    body('newpassword', 'Password is too short, Enter atleast 5 characters !!').isLength({ min: 5 })
], async (req, res) => {
    let success = false;
    // If there are errors, return bad request and the errors.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { currentpassword, newpassword } = req.body; // Using destructuring method of javascript, Get the otp from body.

    try {
        let userId = req.user.id;
        // userId = req.user.id;
        const user = await User.findById(userId); // Here, select is used for showing details except password.

        const passwordCompare = await bcrypt.compare(currentpassword, user.password); // It compares the entered password with database's password.
        if (!passwordCompare) {
            success = false;
            return res.status(400).json({ error: "Please enter correct password !!" });
        }

        const salt = await bcrypt.genSalt(10);
        const newsecPassWord = await bcrypt.hash(newpassword, salt);

        const loggedINuser = await user.updateOne({ // It updates the password of user.
            password: newsecPassWord,
        });

        success = true;
        res.json({ success });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error.");
    }
})

module.exports = router;