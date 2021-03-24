import { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles((theme) => ({
	container: {
	  display: 'flex',
	  flexWrap: 'wrap',
	},
	textField: {
	  marginLeft: theme.spacing(1),
	  marginRight: theme.spacing(1),
	  width: 200,
	},
  }));

export default function Prendrerdv() {
    	
	const [lastname, setlastname] = useState('');
	const [firstname, setfirstname] = useState('');
	const [date, setDate] = useState('')
	const [doctors, setdoctors] = useState([]);


  const [selecteddoctor, setSelectedDoctor] = useState(null)

  const doctorhandler = (value) => {

    console.log(doctors[value]);
    setSelectedDoctor(doctors[value])
  }

  

	useEffect(async () => {
		var res = await fetch('http://localhost:3001/doctor/all');
		var data = await res.json();
		setdoctors(data);
	}, []);


    
	const Handlesubmit = (e) => {
		e.preventDefault();
		console.log(selecteddoctor);
		fetch(`http://localhost:3001/doctor/update/${selecteddoctor._id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ lastname: lastname, firstname: firstname, date: date }),
		})
			.then((res) => res.json)
			.catch((err) => console.log(err));
		
	};


    const classes = useStyles();
    return (
		<div id="bg">
			<div class="row g-3">
				<div class="col-sm-7">
					Nom
					<input
						type="text"
						onChange={(e) => setlastname(e.target.value)}
						class="form-control"
						placeholder="Nom"
						aria-label="name"
					/>
				</div>

				<div class="col-sm-5">
					Prénom
					<input
						type="text"
						onChange={(e) => setfirstname(e.target.value)}
						class="form-control"
						placeholder="Prénom"
						aria-label="firstname"
					/>
				</div>
				<br />
			</div>
			<Grid item xs={12}>
				Docteur :
				<select class="form-select" onChange={e => doctorhandler(e.target.value)} aria-label="drrdv">
					{doctors.map((docteur, index) => (
						<option value={index} key={index}>
							{' '}
							Dr.{docteur.lastname} | {docteur.service}
						</option>
					))}
				</select>
				<Grid item xs={12} sm={6}>
					<TextField
						id="date"
						onChange={(e) => setDate(e.target.value)}
						label="Date et heure"
						type="datetime-local"
						defaultValue=""
						className={classes.textField}
						InputLabelProps={{
							shrink: true,
						}}
					/>
				</Grid>
			</Grid>
			<div class="col-auto" id="btn">
				<button type="submit" onClick={Handlesubmit} class="btn btn-primary">
					Confirmer
				</button>
			</div>
		</div>
	);

}