import React from 'react';
import { useHistory } from 'react-router-dom';
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
import cookie from 'react-cookies';
import { useState } from 'react';

function Copyright() {
  return (
		<Typography variant="body2" color="textSecondary" align="center">
			<Link color="inherit">
				<br />
				Email : samyayoub@gmail.com
				<br />
				Mot de passe : samyayoub
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {

    paddingTop: '5rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '80vh',
  },
  avatar: {

    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
  
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function PlogIn() {
  	let history = useHistory();
  const classes = useStyles();

  const [login, setLogin] = useState({
    email: '',
    password: '',
});
const handelChange = (e) => {
    const { id, value } = e.target;
    setLogin((prevState) => ({
        ...prevState,
        [id]: value,
    }));
};
const handelSubmitClick = (e) => {
    e.preventDefault();
    sendDetailsToServer();
};


	 const quandjeclique = (e) => {
     handelSubmitClick(e);
     setTimeout(() => {
       
       history.push('/patient');
      }, 1000);
		};

async function sendDetailsToServer () {
    if (login.email.length && login.password.length) {
        var payload = {
            email: login.email,
            password: login.password,
        };
     await fetch('http://localhost:3001/patient/login', {
            headers: { 'Content-Type': 'application/json', Accept: '*/*' },
            method: 'POST',
            body: JSON.stringify(payload),
        })
            .then((response) => response.json())
            .then((response) => {
                console.log(response);
                const expires = new Date();
                expires.setDate(Date.now() + 1000 * 60 * 60 * 24 * 14);

                cookie.save('token', response.token, {
                    path: '/',
                    expires
                });
                	cookie.save('patient', response.patient, {
						path: '/',
						expires,
					});
                console.log(cookie.loadAll())
            })
            .catch(function (error) {
                console.log(error);
            });
    } else {
        alert('email ou mot de passe manquant');
    }
};

  return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Se connecter en tant que Patient
				</Typography>
				<form className={classes.form} noValidate>
					<TextField
						onChange={handelChange}
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="email"
						placeholder="Email Address"
						name="email"
						autoComplete="email"
						autoFocus
					/>
					<TextField
						onChange={handelChange}
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="password"
						placeholder="Password"
						type="password"
						id="password"
						autoComplete="current-password"
					/>

					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						onClick={quandjeclique}
						className={classes.submit}
					>
						Se conntecter
					</Button>
				
				</form>
			</div>
			<Box mt={8}>
				<Copyright />
			</Box>
		</Container>
  );
}