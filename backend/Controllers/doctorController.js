const DoctorModel = require('../Models/doctorModel.Js');
const bcrypt = require('bcryptjs');
const saltRounds = 10;
var jwt = require('jsonwebtoken');

async function create(req, res) {
	var firstname = req.body.firstname;
	var lastname = req.body.lastname;
	var age = req.body.age;
	var password = req.body.password;
	var email = req.body.email;
	var service = req.body.service;
	var num = req.body.num;
	var gender = req.body.gender;
	var adresse = req.body.adresse;
	var drrdv = req.body.drrdv

	if (!firstname || !lastname || !password || !num || !gender || !email || !service || !adresse) {
		return res.status(400).send({
			message: 'Required field can not be empty',
		});
	}
	const doctorFound = await DoctorModel.findOne({ firstname: firstname, lastname: lastname });
	if (doctorFound) {
		return res.send('Ce docteur existe dèja dans la base de donnée');
	}

	const salt = bcrypt.genSaltSync(saltRounds);

	const hash = bcrypt.hashSync(req.body.password, salt);

	const Doctor = new DoctorModel({
		adresse : req.body.adresse,
		firstname: req.body.firstname,
		lastname: req.body.lastname,
		age: req.body.age,
		password: hash,
		num: req.body.num,
		gender: req.body.gender,
		service: req.body.service,
		email: req.body.email,
		drrdv: req.body.drrdv,
	});

	Doctor.save()
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
	DoctorModel.find()
		.sort({ name: -1 })
		.then((doctor) => {
			res.status(200).send(doctor);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || 'Error',
			});
		});
}

function findOne(req, res) {
	DoctorModel.findById(req.params.id)
		.then((doctor) => {
			if (!doctor) {
				return res.status(404).send({
					message: 'doctor not found with this id' + req.params.id,
				});
			}
			res.status(200).send(doctor);
			console.log(doctor);
		})
		.catch((err) => {
			return res.status(500).send({
				message: 'Error retrieving product with id ' + req.params.id,
			});
		});
}

function deleteOne(req, res) {
	DoctorModel.findByIdAndRemove(req.params.id)
		.then((doctor) => {
			if (!doctor) {
				return res.status(404).send({
					message: 'doctor not found ',
				});
			}
			res.send({ message: 'doctor deleted successfully!' });
		})
		.catch((err) => {
			return res.status(500).send({
				message: 'Could not delete doctor  ',
			});
		});
}

function deleteRdv(req, res) {
	DoctorModel.findByIdAndUpdate(req.params.id, {
		$pull: { "drrdv": {firstname: req.body.firstname} },
	})
		.then((rdv) => {
			console.log(rdv);
			if (!rdv) {
				return res.status(404).send({
					message: 'rendez-vous not found ',
				});
			}
			res.send({ message: 'rendez-vous deleted successfully!' });
		})
		.catch((err) => {
			return res.status(500).send({
				message: 'Could not delete rendez-vous ',
				err,
			});
		});
}


function Updatedoctor(req, res) {
	
	DoctorModel.findByIdAndUpdate(req.params.id, {$push: {"drrdv": {lastname: req.body.lastname, firstname: req.body.firstname, date: req.body.date}}}, { new: true })
		.then((doctor) => {
			if (!doctor) {
				return res.status(404).send({
					message: 'doctor not found',
				});
			}
			res.status(200).send(doctor);
		})
		.catch((err) => {
			return res.status(404).send({
				message: 'error while updating the doctor',
			});
		});
}

function login(req, res) {
	var email = req.body.email;
	var password = req.body.password;
	if (req.body.email == null || req.body.password == null) {
		res.end('<p> ur not in the right place </p>');
	} else {
		DoctorModel.findOne({ email: email }, function (err, doctor) {
			if (err) {
				consloe.log('there is an error' + err);
				return res.send('doctor not found');
			}

			if (doctor) {
				var isSame = bcrypt.compareSync(password, doctor.password);
								var token = jwt.sign({ foo: 'bar' }, 'shhhhh');

				if (isSame) {
					res.json({doctor:doctor, token: token});
				} else {
					res.send('Error !');
				}
			}
		});
	}
}

module.exports = {
	create: create,
	findAll: findAll,
	findOne: findOne,
	deleteOne: deleteOne,
	Updatedoctor: Updatedoctor,
	login: login,
	deleteRdv: deleteRdv,
};
