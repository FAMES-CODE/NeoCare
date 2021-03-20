const mongoose = require('../db.Js');
const { Schema } = mongoose;

const rdvSchema = new Schema({
	nometprenom: String,
      
	date: String,
	probleme: String,
	num: String,
});

const Rdv = mongoose.model('Rdv', rdvSchema);

module.exports = Rdv;
