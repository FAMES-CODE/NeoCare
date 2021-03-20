import { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';


function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

const useStyles = makeStyles((theme) => ({
	container: {
	  display: 'flex',
	  flexWrap: 'wrap',
	},
	
  }));

export default function Prendrerdv() {
    	
	const [lastname, setlastname] = useState('');
	const [firstname, setfirstname] = useState('');
	const [groupesanguin, setGroupesanguin] = useState('')
  const [raison, setRaison] = useState('')
	const [rooms, setrooms] = useState([]);


  const [selectedroom, setselectedroom] = useState(null)
  const [open, setOpen] = useState(false);
 
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
	setOpen(false);
};

  const roomhandler = (value) => {

    console.log(rooms[value]);
    setselectedroom(rooms[value])
  }

  
  // Fetch pour avoir toutes les chambres :

	useEffect(async () => {
		var res = await fetch('http://localhost:3001/room/all');
		var data = await res.json();
		setrooms(data);
	}, []);


 // A faire quand on clique sur le boutton confirmer : 

	const Handlesubmit = (e) => {
		setOpen(true);
		e.preventDefault();
		console.log(selectedroom);
		fetch(`http://localhost:3001/room/update/${selectedroom._id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ lastname: lastname, firstname: firstname, groupesanguin: groupesanguin, raison: raison }),
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
		
				<div class="col-sm-5">
					Groupe sanguin
					<input
						type="text"
						onChange={(e) => setGroupesanguin(e.target.value)}
						class="form-control"
						placeholder="Groupe Sanguin"
						aria-label="groupesanguin"
					/>
				</div>

        <div class="col-sm-5">
					Raison
					<input
						type="text"
						onChange={(e) => setRaison(e.target.value)}
						class="form-control"
						placeholder="Raison de l'hospitalisation"
						aria-label="raison"
					/>
				</div>

        Chambres :
				<select class="form-select" onChange={e => roomhandler(e.target.value)} aria-label="patienthospitalise">
					{rooms.map((room, index) => (
						<option value={index} key={index}>
							{' '}
							{room.name} | Service : {room.service}
						</option>
					))}
				</select>
			</Grid>
			<div class="col-auto" id="btn">
				<button type="submit" onClick={Handlesubmit} class="btn btn-primary">
					Confirmer
				</button>
				<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Patient hospitalisé avec succès !
        </Alert>
      </Snackbar>
			</div>
		</div>
	);

}