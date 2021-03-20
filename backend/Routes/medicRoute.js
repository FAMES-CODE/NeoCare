const express = require('express');
const router = express.Router();
const medic = require('../Controllers/medicController');

router.get('/all', (req, res) => medic.findAll(req, res));
router.post('/register', (req, res) => medic.create(req, res));
router.get('/find/:id', (req, res) => medic.findOne(req, res));
router.put('/update/:id', (req, res) => medic.Updatemedic(req, res));
router.delete('/delete/:id', (req, res) => medic.deleteOne(req, res));
router.put('/deletem/:id', (req, res) => medic.deleteMedic(req, res));
router.post('/login', (req, res) => medic.login(req, res));

module.exports = router;