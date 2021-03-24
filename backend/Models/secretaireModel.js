const mongoose = require('../db.Js');
const { Schema } = mongoose;

const secretaireSchema = new Schema({
	name: String,
	password: String,
});

const Secretaire = mongoose.model('Secretaire', secretaireSchema);

module.exports = Secretaire;
