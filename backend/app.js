var express = require('express');
var app = express();
const patientsRouter = require('./Routes/patientRoute.Js');
const doctorRouter = require('./Routes/doctorRoute')
const secretaireRouter = require('./Routes/secretaireRoute')

const roomRouter = require('./Routes/roomRoute')
const rdvRouter = require('./Routes/rdvRoute')
const medicRouter = require('./Routes/medicRoute')

var bodyParser = require('body-parser');
var cors = require('cors')


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());



app.use('/patient', patientsRouter);
app.use('/doctor', doctorRouter);
app.use('/admin', secretaireRouter);
app.use('/room', roomRouter);
app.use('/rdv', rdvRouter);
app.use('/medic', medicRouter);





app.listen(3001);
console.log('Listening to PORT 3001');
