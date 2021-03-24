const mongoose = require('../db.Js');
const { Schema } = mongoose;

var roomsSchema = new Schema({

	name: {
        type: String,
        unique: true,
	   required: true,
    },
	etage: Number,
    nombredelits: Number,
    service: String,
    patienthospitalise: 
       [ {
            lastname: String,
            firstname: String,
            groupesanguin: String,
            raison: String,
         
        } ]

});

const Room = mongoose.model('Room', roomsSchema);

module.exports = Room;
