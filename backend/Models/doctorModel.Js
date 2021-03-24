const mongoose = require('../db.Js');
const { Schema } = mongoose;

const doctorsSchema = new Schema({
	lastname: String,
	firstname: String,
	num: String,
	gender: String,
	email: String,
	service: String,
	age: String,
	password: String,
	adresse: String,
	drrdv: [{
		
		lastname: String,
		firstname: String,
		date: Date,
	}] 
      
    	
});

const Doctor = mongoose.model('Doctor', doctorsSchema);

module.exports = Doctor;
