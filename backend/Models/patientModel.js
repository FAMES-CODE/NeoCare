const mongoose = require('../db.Js');
const { Schema } = mongoose;

const patientsSchema = new Schema({
	firstname: String,
	lastname: String,
	num: String,
	gender: String,
	poids: Number,
	taille: Number,
	dateDeNaissance: String,
	antecedentDuPatient: String,
	adresse: String,
	probleme: String,
	age: Number,
	password: String,
	email: String,
	groupesang: String,
});

const Patient = mongoose.model('Patient', patientsSchema);

module.exports = Patient;
