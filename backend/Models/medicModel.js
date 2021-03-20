const mongoose = require('../db.Js');
const { Schema } = mongoose;

const medicsSchema = new Schema({
	name: String,
	lot: [
		{
			numdelot: String,
			quantite: String,
			expire: String,
		},
	],
});

const Medic = mongoose.model('Medic', medicsSchema);

module.exports = Medic;
