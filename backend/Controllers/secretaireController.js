const SecModel = require('../Models/secretaireModel');
const bcrypt = require('bcryptjs');
const saltRounds = 10;
var jwt = require('jsonwebtoken');

async function create(req, res) {
	var name = req.body.name;
    var password = req.body.password;
   

	if (
		!name ||
		!password
		
	) {
		return res.status(400).send({
			message: 'Required field can not be empty',
		});
	}
	const secretaireFound = await SecModel.findOne({ name: name });
	if (secretaireFound) {
		return res.send('Ce compte (secretaire) existe dèja dans la base de donnée');
	}

	const salt = bcrypt.genSaltSync(saltRounds);

	const hash = bcrypt.hashSync(req.body.password, salt);

	const Secretaire = new SecModel({
		name: req.body.name,
		password: hash,

	});

	Secretaire.save()
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || 'Some error occurred in Secretaire akhi.',
			});
		});
}

function findAll(req, res) {
	SecModel.find()
		.sort({ name: -1 })
		.then((secretaire) => {
			res.status(200).send(secretaire);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || 'Error Akhi',
			});
		});
}

function findOne(req, res) {
	SecModel.findById(req.params.id)
		.then((secretaire) => {
			if (!secretaire) {
				return res.status(404).send({
					message: 'secretaire not found with this id ' + req.params.id,
				});
			}
			res.status(200).send(secretaire);
			console.log(secretaire);
		})
		.catch((err) => {
			return res.status(500).send({
				message: 'Error retrieving product with id ' + req.params.id,
			});
		});
}

function deleteOne(req, res) {
	secretaire.findByIdAndRemove(req.params.id)
		.then((secretaire) => {
			if (!secretaire) {
				return res.status(404).send({
					message: 'secretaire not found ',
				});
			}
			res.send({ message: 'secretaire deleted successfully!' });
		})
		.catch((err) => {
			return res.status(500).send({
				message: 'Could not delete secretaire ',
			});
		});
}

function Updatesecretaire(req, res) {
	if (!req.body.name || !req.body.email || !req.body.service || !req.body.num) {
		res.status(400).send({
			message: 'required fields cannot be empty (secretaire)',
		});
	}
	SecModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
		.then((secretaire) => {
			if (!secretaire) {
				return res.status(404).send({
					message: 'aucun secretaire found',
				});
			}
			res.status(200).send(secretaire);
		})
		.catch((err) => {
			return res.status(404).send({
				message: 'error while update',
			});
		});
}

function login(req, res) {
	var name = req.body.name;
	var password = req.body.password;
	if (req.body.name == null || req.body.password == null) {
		res.end('<p> ur not in the right place </p>');
	} else {
		SecModel.findOne({ name: name }, function (err, secretaire) {
			if (err) {
				consloe.log('there is an error' + error);
				return res.send('secretaire introuvable');
			}
			
			if (secretaire) {
				
				var isSame = bcrypt.compareSync(password, secretaire.password);
				var token = jwt.sign({ foo: 'bar' }, 'shhhhh');
				if (isSame) {
					res.json({secretaire:secretaire, token: token});
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
	Updatesecretaire: Updatesecretaire,
	login: login,
};
