const express = require('express');
const router = express.Router();
const room = require('../Controllers/roomController');

router.get('/all', (req, res) => room.findAll(req, res));
router.post('/create', (req, res) => room.create(req, res));
router.get('/find/:id', (req, res) => room.findOne(req, res));
router.put('/update/:id', (req, res) => room.Updateroom(req, res));
router.delete('/delete/:id', (req, res) => room.deleteOne(req, res));
router.put('/deletep/:id', (req, res) => room.deletePatient(req, res));


module.exports = router;
