const express = require('express');
const router = express.Router();
const doctors = require('../Controllers/doctorController');

router.get('/all', (req, res) => doctors.findAll(req, res));
router.post('/register', (req, res) => doctors.create(req, res));
router.get('/find/:id', (req, res) => doctors.findOne(req, res));
router.put('/update/:id', (req, res) => doctors.Updatedoctor(req, res));
router.delete('/delete/:id', (req, res) => doctors.deleteOne(req, res));
router.put('/deleterdv/:id', (req, res) => doctors.deleteRdv(req, res));
router.post('/login', (req, res) => doctors.login(req, res));

module.exports = router;
