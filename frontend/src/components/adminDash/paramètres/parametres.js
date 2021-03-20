import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useState, useEffect } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export default function Params() {
    const [name, setname] = useState('');
    const [password, setpassword] = useState('');
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
            name: name,
			password: password,
            
		});
		fetch('http://localhost:3001/admin/register', {
            method: 'post',
			headers: {
                'Content-Type': 'application/json',
			},
			body: JSON.stringify({
                name: name,
				password: password,
                
			}),
		})
        .then((res) => res.json)
        .catch((err) => console.log(err));
	};
    
    
    
    const useStyles = makeStyles((theme) => ({
        title: {
            
            marginTop: theme.spacing(2),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        
    }));
    
    const classes = useStyles();
    
    return (
        <div>

        <Form>
            <h1 className={classes.title}>Enregistrer un Secretaire</h1>
  <Form.Group controlId="formBasicEmail">
    <Form.Label>Nom d'utilisateur</Form.Label>
    <Form.Control type="name" placeholder="Nom d'utilisateur" onChange={(e) => setname(e.target.value)} />
  </Form.Group>

  <Form.Group controlId="formBasicPassword">
    <Form.Label>Mot de passe</Form.Label>
    <Form.Control type="password" placeholder="Mot de passe" onChange={(e) => setpassword(e.target.value)} />
  </Form.Group>

  <Button variant="primary" onClick={handleSubmit} type="submit">
    Enregistrer
  </Button>
  <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Admin enregistré avec succès !
        </Alert>
      </Snackbar>
</Form>


        </div>
    )
    
}