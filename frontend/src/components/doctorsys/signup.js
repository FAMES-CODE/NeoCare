import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useState, useEffect } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';


function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
  }


const useStyles = makeStyles((theme) => ({
  paper: {
	
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {

    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
	  
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();

  	const [firstname, setfirstname] = useState('');
	const [lastname, setlastname] = useState('');
	const [age, setage] = useState('')
	const [num, setnum] = useState('');
	const [email, setemail] = useState('');
	const [service, setservice] = useState('');
	const [gender, setgender] = useState('');
	const [password, setpassword] = useState('');
	const [adresse, setadresse] = useState('');
	const [open, setOpen] = useState(false);

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
		  return;
		}
		setOpen(false);
	};





	const handleSubmit = (e) => {
		setOpen(true);
		e.preventDefault();
		console.log({
			firstname: firstname,
			lastname: lastname,
			age: age,
			password: password,
			email: email,
			service: service,
			num: num,
			gender: gender,
			adresse: adresse,
		});
		fetch('http://localhost:3001/doctor/register', {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				firstname: firstname,
				lastname: lastname,
				age: age,
				password: password,
				email: email,
				service: service,
				num: num,
				gender: gender,
				adresse: adresse,
			}),
		})
			.then((res) => res.json)
			.catch((err) => console.log(err));
	};

  return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Typography component="h1" variant="h5">
					Enregistrer un docteur
				</Typography>
				<form className={classes.form} noValidate>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6}>
							<TextField
								autoComplete="fname"
								onChange={(e) => setfirstname(e.target.value)}
								name="firstname"
								variant="outlined"
								required
								fullWidth
								id="firstname"
								placeholder="Prenom"
								autoFocus
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								onChange={(e) => setlastname(e.target.value)}
								variant="outlined"
								required
								fullWidth
								id="lastName"
								placeholder="Nom"
								name="lastName"
								autoComplete="lname"
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								onChange={(e) => setage(e.target.value)}
								variant="outlined"
								required
								fullWidth
								id="age"
								placeholder="Age"
								name="age"
								autoComplete="age"
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								onChange={(e) => setservice(e.target.value)}
								variant="outlined"
								required
								fullWidth
								id="service"
								placeholder="Service"
								name="service"
								autoComplete="service"
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								onChange={(e) => setgender(e.target.value)}
								variant="outlined"
								required
								fullWidth
								id="gender"
								placeholder="Sexe"
								name="gender"
								autoComplete="gender"
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								onChange={(e) => setnum(e.target.value)}
								variant="outlined"
								required
								fullWidth
								name="num"
								placeholder="Numéro de téléphone"
								type="num"
								id="num"
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								onChange={(e) => setemail(e.target.value)}
								variant="outlined"
								required
								fullWidth
								id="email"
								placeholder="Addresse Email"
								name="email"
								autoComplete="email"
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								onChange={(e) => setadresse(e.target.value)}
								variant="outlined"
								required
								fullWidth
								id="adresse"
								placeholder="Adresse"
								name="adresse"
								autoComplete="adresse"
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								onChange={(e) => setpassword(e.target.value)}
								variant="outlined"
								required
								fullWidth
								name="password"
								placeholder="Mot de passe"
								type="password"
								id="password"
								autoComplete="current-password"
							/>
						</Grid>
						<Grid item xs={12}></Grid>
					</Grid>
					<Button
						type="submit"
						onClick={handleSubmit}
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
					>
						Confirmer
					</Button>
					<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Docteur enregistré avec succès !
        </Alert>
      </Snackbar>
				</form>
			</div>
		</Container>
  );
}