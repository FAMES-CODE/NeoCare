const medicModel = require('../Models/medicModel');


async function create(req, res) {
	var name = req.body.name;
    var lot = req.body.lot;
	
	if (
		!name 
     
	) {
		return res.status(400).send({
			message: 'Required field can not be empty',
		});
	}
	const medicFound = await medicModel.findOne({ name: name });
	if (medicFound) {
		return res.send('Ce médicament existe dèja dans la base de donnée');
	}


	const Medic = new medicModel({
		name: req.body.name,
        lot : req.body.lot
	
	});

	Medic.save()
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
	medicModel.find()
		.sort({ name: -1 })
		.then((medic) => {
			res.status(200).send(medic);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || 'Error ',
			});
		});
}

function findOne(req, res) {
	medicModel.findById(req.params.id)
		.then((medic) => {
			if (!medic) {
				return res.status(404).send({
					message: 'medic not found with this id  ' + req.params.id,
				});
			}
			res.status(200).send(medic);
			console.log(medic);
		})
		.catch((err) => {
			return res.status(500).send({
				message: 'Error retrieving medic with id ' + req.params.id,
			});
		});
}

function deleteOne(req, res) {
	medicModel.findByIdAndRemove(req.params.id)
		.then((medic) => {
			if (!medic) {
				return res.status(404).send({
					message: 'medic not found ',
				});
			}
			res.send({ message: 'medic deleted successfully !' });
		})
		.catch((err) => {
			return res.status(500).send({
				message: 'Could not delete medic  ',
			});
		});
}


function deleteMedic(req, res) {
	medicModel
		.findByIdAndUpdate(req.params.id, { $pull: { lot: { numdelot: req.body.numdelot } } })
		.then((medic) => {
			if (!medic) {
				return res.status(404).send({
					message: 'medic not found ',
				});
			}
			res.send({ message: 'medic deleted successfully !' });
		})
		.catch((err) => {
			return res.status(500).send({
				message: 'Could not delete medic  ',
			});
		});
}

function Updatemedic(req, res) {

	medicModel.findByIdAndUpdate(req.params.id, {$push: {"lot": {numdelot: req.body.numdelot, quantite: req.body.quantite, expire: req.body.expire}}}, { new: true })
		.then((medic) => {
			if (!medic) {
				return res.status(404).send({
					message: 'aucun medic found',
				});
			}
			res.status(200).send(medic);
		})
		.catch((err) => {
			return res.status(404).send({
				message: ' ! , error while updating the medic',
			});
		});
}


module.exports = {
	create: create,
	findAll: findAll,
	findOne: findOne,
	deleteOne: deleteOne,
	Updatemedic: Updatemedic,
	deleteMedic: deleteMedic,

};
