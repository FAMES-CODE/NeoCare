const express = require('express');
const router = express.Router();
const rdv = require('../Controllers/rdvController');

router.get('/allrdv', (req, res) => rdv.findAll(req, res));
router.post('/getrdv', (req, res) => rdv.create(req, res));
router.get('/find/:id', (req, res) => rdv.findOne(req, res));
router.put('/update/:id', (req, res) => rdv.Updateroom(req, res));
router.delete('/delete/:id', (req, res) => rdv.deleteOne(req, res));

module.exports = router;
