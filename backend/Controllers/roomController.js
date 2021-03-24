const RoomModel = require('../Models/roomModel');


async function create(req, res) {
	var name = req.body.name;
	var etage = req.body.etage;
    var nombredelits = req.body.nombredelits;
	var service = req.body.service
    var patienthospitalise = req.body.patienthopitalise
	


	if (
		!name ||
		!etage ||
		!nombredelits ||
		!service
	) {
		return res.status(400).send({
			message: 'Required field can not be empty',
		});
	}
	const roomFound = await RoomModel.findOne({ name: name });
	if (roomFound) {
		return res.send('Cette chambre existe dèja dans la base de donnée');
	}


	const Room = new RoomModel({
		name: req.body.name,
		etage: req.body.etage,
		nombredelits: req.body.nombredelits,
		service: req.body.service,
		patienthospitalise: req.body.patienthospitalise,
	});

	Room.save()
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || 'Some error occurred in User akhi.',
			});
		});
}

function findAll(req, res) {
	RoomModel.find()
		.sort({ name: -1 })
		.then((room) => {
			
			res.status(200).send(room);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || 'Error Akhi',
			});
		});
}

function findOne(req, res) {
	RoomModel.findById(req.params.id)
		.then((room) => {
			if (!room) {
				return res.status(404).send({
					message: 'room not found with this id akhi ' + req.params.id,
				});
			}
			res.status(200).send(room);
			console.log(room);
		})
		.catch((err) => {
			return res.status(500).send({
				message: 'Error retrieving room with id ' + req.params.id,
			});
		});
}

function deleteOne(req, res) {
	RoomModel.findByIdAndRemove(req.params.id)
		.then((room) => {
			if (!room) {
				return res.status(404).send({
					message: 'room not found ',
				});
			}
			res.send({ message: 'room deleted successfully!' });
		})
		.catch((err) => {
			return res.status(500).send({
				message: 'Could not delete room ',
			});
		});
}

function deletePatient(req, res) {
	RoomModel.findByIdAndUpdate(req.params.id, {$pull: {"patienthospitalise": {firstname: req.body.firstname}}})
		.then((patienthospitalise) => {
			console.log(patienthospitalise)
			if (!patienthospitalise) {
				return res.status(404).send({
					
					message: 'patienthospitalise not found ',
				});
			}
			res.send({ message: 'patienthospitalise deleted successfully!' });
		})
		.catch((err) => {
			return res.status(500).send({
				message: 'Could not delete patienthospitalise ', err
			});
		});
}



function Updateroom(req, res) {
	RoomModel.findByIdAndUpdate(req.params.id, {$push: {"patienthospitalise": {lastname: req.body.lastname, firstname: req.body.firstname, groupesanguin: req.body.groupesanguin, raison: req.body.raison}}}, { new: true })
		.then((room) => {
			if (!room) {
				return res.status(404).send({
					message: 'aucune chambre trouvée',
				});
			}
			res.status(200).send(room);
		})
		.catch((err) => {
			return res.status(404).send({
				message: 'error while updating the room',
			});
		});
}



module.exports = {
	create: create,
	findAll: findAll,
	findOne: findOne,
	deleteOne: deleteOne,
	Updateroom: Updateroom,
	deletePatient: deletePatient,
	
};
