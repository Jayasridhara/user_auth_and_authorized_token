
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

// Helper to check email via regex (or use a library)
function isValidEmail(email) {
  // simple regex for demonstration
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

const registerUser = async (req, res) => {
    try {
        // get the name, email, password from request body
        const { name, email, password } = req.body;
        // Basic presence checks
         if (!name || !email || !password) {
            return res.status(400).json({ message: 'Please enter all fields' });
        }
        // More validation
        
        if (typeof name !== 'string' || name.trim().length < 3) {
        return res.status(400).json({ message: 'Name should be a string of at least 2 characters.' });
        }
        if (!isValidEmail(email)) {
        return res.status(400).json({ message: 'Invalid email format.' });
        }
        if (typeof password !== 'string' || password.length < 6) {
        return res.status(400).json({ message: 'Password must be at least 6 characters long.' });
        }

        // check if the user already registered
        const existingUser = await User.findOne({ email: email.toLowerCase().trim() });

        // if the user already exists, return an error
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // create a new user
        const newUser = new User({
            name: name.trim(),
            email: email.toLowerCase().trim(),
            password: hashedPassword
        });


        // save the user to the database
        await newUser.save();

        // return success response

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('registerUser error:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

const loginUser = async (req, res) => {
    try {
        // get the email and password from request body
        const { email, password } = req.body;

          // Basic validation
        if (!email || !password) {
            return res.status(400).json({ message: 'Please provide email and password' });
        }

        if (!isValidEmail(email)) {
            return res.status(400).json({ message: 'Invalid email format.' });
        }
        
        // check if the user exists
        const user = await User.findOne({ email: email.toLowerCase().trim() });

        // if the user does not exist, return an error
        if (!user) {
            return res.status(400).json({ message: 'Invalid User' });
        }

        // check if the password is correct
        const isPasswordValid = await bcrypt.compare(password, user.password);

        // if the password is incorrect, return an error
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Incorrect Password' });
        }
        // generate a JWT token
            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

            // return success response
            res.status(200).json({ message: 'Login successful', token });
        } catch (error) {
            res.status(500).json({ message: 'Server error' });
        }
}
const me = async (req, res) => {
    try {
        const userId = req.userId;

        const user = await User.findById(userId).select('-password -__v');
        if (!user) {
            return res.status(404).json({ message: 'User not found or not logged in' });
        }
        res.status(200).json({ user });
    } catch (error) {
        
        res.status(500).json({ message: 'Server error' });
    }
}   

module.exports = {
    registerUser,
    loginUser,
    me
   
}