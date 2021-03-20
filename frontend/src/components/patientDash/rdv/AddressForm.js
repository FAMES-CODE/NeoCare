import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';
import { useState, useEffect } from 'react';


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

export default function AddressForm() {


	const [doctors, setdoctors] = useState([]);


	useEffect(async () => {
		var res = await fetch('http://localhost:3001/doctor/all');
		var data = await res.json();
		setdoctors(data);
	}, []);



	const classes = useStyles();
	return (
		<React.Fragment>
			<Typography variant="h6" gutterBottom>
				Informations
			</Typography>
			<Grid container spacing={3}>
				<Grid item xs={12} sm={6}>
					<TextField
						required
						id="firstName"
						name="firstName"
						label="Prenom"
						fullWidth
						autoComplete="given-name"
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						required
						id="lastName"
						name="lastName"
						label="Nom"
						fullWidth
						autoComplete="family-name"
					/>
				</Grid>
				<Grid item xs={12}>
			Docteur : 
<select class="form-select" aria-label="drrdv">
{doctors.map((docteur) => (
  <option value="1"> Dr.{docteur.lastname} | {docteur.service}</option>
 
  ))}
</select>
										
				</Grid>

				
		
				<Grid item xs={12} sm={6}>
				<TextField
    id="date"
    label="Date et heure"
    type="datetime-local"
    defaultValue="2021-02-24T10:30"
    className={classes.textField}
    InputLabelProps={{
      shrink: true,
    }}
  />
				</Grid>
			
				
			</Grid>
		</React.Fragment>
	);
}
