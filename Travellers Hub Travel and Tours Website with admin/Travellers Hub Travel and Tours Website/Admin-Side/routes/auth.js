const express = require('express');
//const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');
const router = express.Router();

/*
// Middleware for Role-Based Access Control
function authorizeRoles(...roles) {
    return (req, res, next) => {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!roles.includes(decoded.role)) {
            return res.status(403).json({ message: 'Access denied' });
        }
        req.admin = decoded;
        next();
    };
}*/
/*
// Middleware for Role-Based Access Control
function authorizeRoles(...roles) {
    return (req, res, next) => {
        if (!req.headers.authorization) {
            return res.status(403).json({ message: 'Access denied' });
        }
        const token = req.headers.authorization.split(' ')[1];
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            if (!roles.includes(decoded.role)) {
                return res.status(403).json({ message: 'Access denied' });
            }
            req.admin = decoded;
            next();
        } catch (error) {
            return res.status(401).json({ message: 'Invalid token' });
        }
    };
}*/

/* Create a New Admin (Only SuperAdmin can access this)
router.post('/create-admin'/*, authorizeRoles('SuperAdmin'), async (req, res) => {
    const { name, email, contactNumber, password, selectRole } = req.body;

    try {
        // Check if an admin with the same email already exists
        let admin = await Admin.findOne({ email });
        if (admin) return res.status(400).json ({msg:'User already exists' });

      
        admin = new Admin({
            name,
            email,
            contactNumber,
            password,
            selectRole
        });

        await admin.save();
        res.status(201).json({ message: 'Admin created successfully' });
    } catch (error) {
        console.error('Error creating admin:', error);
        res.status(500).json({ message: error.message });
    }
});*/

router.post('/create-admin' /*, authorizeRoles('SuperAdmin')*/, async (req, res) => {
    console.log(req.body); // Log the incoming data to verify

    const { name, email, contactNumber, password, selectRole } = req.body;

    try {
        // Check if an admin with the same email already exists
        let admin = await Admin.findOne({ email });
        if (admin) return res.status(400).json({ msg: 'User already exists' });

        admin = new Admin({
            name,
            email,
            contactNumber,
            password,
            selectRole
        });

        await admin.save();
        res.status(201).json({ message: 'Admin created successfully' });
    } catch (error) {
        console.error('Error creating admin:', error);
        res.status(500).json({ message: error.message });
    }
});



//Modify Admin (SuperAdmin and Admin roles can access this)
router.post('/modify-admin', /*authorizeRoles('SuperAdmin', 'Admin'),*/ async (req, res) => {
    const { name, email, contactNumber, password, selectRole } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'Email is required to identify the admin' });
    }

    try {
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        // Update fields if they are provided
        if (name) admin.name = name;
        if (contactNumber) admin.contactNumber = contactNumber;
        if (selectRole) admin.selectRole = selectRole;
        if (password) admin.password = await bcrypt.hash(password, 10);

        await admin.save();
        res.status(200).json({ message: 'Admin modified successfully' });
    } catch (error) {
        console.error('Error modifying admin:', error);
        res.status(500).json({ message: error.message });
    }
});


// Login Route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const admin = await Admin.findOne({ email });
        if (!admin || !bcrypt.compareSync(password, admin.password)) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ id: admin._id, role: admin.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, role: admin.role });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
