const express = require('express');
const router = express.Router();
const sec = require('../Controllers/secretaireController');

router.get('/all', (req, res) => sec.findAll(req, res));
router.post('/register', (req, res) => sec.create(req, res));
router.get('/find/:id', (req, res) => sec.findOne(req, res));
router.put('/update/:id', (req, res) => sec.UpdateUser(req, res));
router.delete('/delete/:id', (req, res) => sec.delete(req, res));
router.post('/login', (req, res) => sec.login(req, res));

module.exports = router;
