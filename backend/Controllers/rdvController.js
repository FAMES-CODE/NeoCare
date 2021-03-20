const RdvModel = require('../Models/rdvModel');

async function create(req, res) {
	var date = req.body.date;
	var nometprenom = req.body.nometprenom;
	var docteur = req.body.docteur;
	var probleme = req.body.probleme;
	var num = req.body.num

	if (!date || !nometprenom || !probleme || !num ) {
		return res.status(400).send({
			message: 'Required field can not be empty',
		});
	}
	const rdvFound = await RdvModel.findOne({ nometprenom: nometprenom });
	if (rdvFound) {
		return res.send('Rendez-vous déjà pris avec ce nom');
	}

	const Rdv = new RdvModel({
		date: req.body.date,
		nometprenom: req.body.nometprenom,
		probleme : req.body.probleme,
		num : req.body.num,
	});

	Rdv.save()
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
	RdvModel.find()
		.sort({ name: -1 })
		.then((rdv) => {
			res.status(200).send(rdv);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || 'Error',
			});
		});
}

function findOne(req, res) {
	RdvModel.findById(req.params.id)
		.then((rdv) => {
			if (!rdv) {
				return res.status(404).send({
					message: 'aucun rendez-vous trouvé avec cet id ' + req.params.id,
				});
			}
			res.status(200).send(rdv);
			console.log(rdv);
		})
		.catch((err) => {
			return res.status(500).send({
				message: 'Error retrieving rdv with id ' + req.params.id,
			});
		});
}

function deleteOne(req, res) {
	RdvModel.findByIdAndRemove(req.params.id)
		.then((rdv) => {
			if (!rdv) {
				return res.status(404).send({
					message: 'Rendez-vous pas trouvé ',
				});
			}
			res.send({ message: 'Rendez-vous supprimé !' });
		})
		.catch((err) => {
			return res.status(500).send({
				message: 'Impossible de supprimer le rendez-vous ',
			});
		});
}

function Updaterdv(req, res) {
	if (!req.body.date || !req.body.patient || !req.body.docteur) {
		res.status(400).send({
			message: 'required fields cannot be empty',
		});
	}
	RdvModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
		.then((rdv) => {
			if (!rdv) {
				return res.status(404).send({
					message: 'aucun rendez-vous trouvée',
				});
			}
			res.status(200).send(rdv);
		})
		.catch((err) => {
			return res.status(404).send({
				message: 'erreur pendant la mise à jour du rendez-vous',
			});
		});
}

module.exports = {
	create: create,
	findAll: findAll,
	findOne: findOne,
	deleteOne: deleteOne,
	Updaterdv: Updaterdv,
};
