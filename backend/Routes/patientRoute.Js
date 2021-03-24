const express = require('express');
const router = express.Router();
const users = require('../Controllers/patientController');

router.get('/allusers', (req, res) => users.findAll(req, res));
router.post('/register', (req, res) => users.create(req, res));
router.get('/find/:id', (req, res) => users.findOne(req, res));
router.put('/update/:id', (req, res) => users.UpdatePatient(req, res));
router.delete('/delete/:id', (req, res) => users.deleteOne(req, res));
router.post('/login', (req, res) => users.login(req, res));

module.exports = router;
