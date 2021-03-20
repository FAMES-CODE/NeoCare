import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import cookie from 'react-cookies';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
    
      <div color="inherit">
        FOR DEMO : 
        <br/>
        Username : 
        <br/> 
        Password : 
      </div>{' '}
     
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', 
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Adminlogin() {
  const classes = useStyles();
  let history = useHistory();


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
     
     history.push('/admin');
    }, 1000);
  };

  async function sendDetailsToServer () {
    if (login.email.length && login.password.length) {
        var payload = {
            email: login.email,
            password: login.password,
        };
     await fetch('http://localhost:3001/admin/login', {
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
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Panneau d'administration
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              onChange={handelChange}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              placeholder="Nom d'utilisateur"
              name="email"
              autoFocus
            />
            <TextField
              onChange={handelChange}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              placeholder="Mot de passe"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
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
           
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}