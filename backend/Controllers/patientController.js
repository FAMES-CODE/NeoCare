const PatientModel = require('../Models/patientModel');
const bcrypt = require('bcryptjs');
const saltRounds = 10;
var jwt = require('jsonwebtoken');

async function create(req, res) {
	var firstname = req.body.firstname;
	var email = req.body.email
	var lastname = req.body.lastname;
	var age = req.body.age;
    var password = req.body.password;
    var num = req.body.num;
	var gender = req.body.gender;
	var poids = req.body.poids;
	var taille = req.body
	.taille;
	var dateDeNaissance = req.body.dateDeNaissance;
	var antecedentDuPatient = req.body.antecedentDuPatient;
	var adresse = req.body.adresse;
	var probleme = req.body.probleme;
	var groupesang = req.body.groupesang;

	if (
		!firstname ||
		!email ||
		!lastname ||
		!age ||
		!password ||
		!num ||
		!gender ||
		!poids ||
		!taille ||
		!dateDeNaissance ||
		!antecedentDuPatient ||
		!adresse ||
		!probleme ||
		!groupesang
	) {
		return res.status(400).send({
			message: 'Required field can not be empty',
		});
	}
	const patientFound = await PatientModel.findOne({ firstname: firstname, lastname: lastname });
	if (patientFound) {
		return res.send('Ce patient existe dèja dans la base de donnée');
	}

	const salt = bcrypt.genSaltSync(saltRounds);

	const hash = bcrypt.hashSync(req.body.password, salt);

	const User = new PatientModel({
		firstname: req.body.firstname,
		email: req.body.email,
		lastname: req.body.lastname,
		age: req.body.age,
		password: hash,
		num: req.body.num,
		gender: req.body.gender,
		poids: req.body.poids,
		taille: req.body.taille,
		dateDeNaissance: req.body.dateDeNaissance,
		antecedentDuPatient: req.body.antecedentDuPatient,
		adresse: req.body.adresse,
		probleme: req.body.probleme,
		groupesang: req.body.groupesang,
	});

	User.save()
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || 'Some error occurred.',
			});
		});
}




function findAll(req, res) {
	PatientModel.find()
		.sort({ name: -1 })
		.then((Patient) => {
			res.status(200).send(Patient);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || 'Error',
			});
		});
}



function findOne(req, res) {
	PatientModel.findById(req.params.id)
		.then((Patient) => {
			if (!Patient) {
				return res.status(404).send({
					message: 'Patient not found with this id' + req.params.id,
				});
			}
			res.status(200).send(Patient);
			console.log(Patient);
		})
		.catch((err) => {
			return res.status(500).send({
				message: 'Error retrieving patient with id ' + req.params.id,
			});
		});
}

function deleteOne(req, res) {
	PatientModel.findByIdAndRemove(req.params.id)
		.then((Patient) => {
			if (!Patient) {
				return res.status(404).send({
					message: 'Patient not found ',
				});
			}
			res.send({ message: 'Patient deleted successfully!' });
		})
		.catch((err) => {
			return res.status(500).send({
				message: 'Could not delete Patient',
			});
		});
}

function UpdatePatient(req, res) {
	if (!req.body.name || !req.body.age) {
		res.status(400).send({
			message: 'required fields cannot be empty',
		});
	}
	PatientModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
		.then((user) => {
			if (!user) {
				return res.status(404).send({
					message: 'aucun User found',
				});
			}
			res.status(200).send(user);
		})
		.catch((err) => {
			return res.status(404).send({
				message: 'error while update',
			});
		});
}



function login(req, res) {
	var email = req.body.email;
	var password = req.body.password;
	if (req.body.email == null || req.body.password == null) {
		res.end('<p> ur not in the right place </p>');
	} else {

		PatientModel.findOne({ email: email }, function (err, patient) {
			
			if (err) {
				consloe.log('there is an error' + err);
				return res.send('patient introuvable');
			}
			
			if (patient) {
				var isSame = bcrypt.compareSync(password, patient.password);
				var token = jwt.sign({ foo: 'bar' }, 'shhhhh');

				if (isSame) {
					
					res.json({patient, token});
					
				} else {
					res.send('Error !');
				}
			} else {
				res.send("no patient found")
			}
		});
	}
}


module.exports = {
	create: create,
	findAll: findAll,
	findOne: findOne,
	deleteOne: deleteOne,
	UpdatePatient: UpdatePatient,
	login: login,

};
