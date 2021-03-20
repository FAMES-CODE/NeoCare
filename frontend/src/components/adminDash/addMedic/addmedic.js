import React, { useState, useEffect } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const useStyles = makeStyles((theme) => ({
    Typography: {
      fontSize: '2rem',
      display: 'flex',
      justifyContent: 'space-around'
    }

  }));

export default function Addmedic() {
    const classes = useStyles();



	const [name, setname] = useState('');
	const [numdelot, setnumdelot] = useState('');
	const [quantite, setquantite] = useState('');
	const [expire, setexpire] = useState("")
    const [medics, setmedics] = useState([])
    const [selectedmedic, setSelectedmedic] = useState(null)


	const [open, setOpen] = useState(false);
 

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
		  return;
		}
		setOpen(false);
	};


    const [openupdate, setOpenupdate] = useState(false);

	const handleCloseupdate = (event, reason) => {
		if (reason === 'clickaway') {
		  return;
		}
		setOpenupdate(false);
	};


    // Ajouter un médicament

	const handleSubmitRegister = (e) => {
		setOpen(true);
		e.preventDefault();
		console.log({ name: name, numdelot: numdelot, quantite: quantite, expire: expire});
		fetch('http://localhost:3001/medic/register', {
			method: 'post',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ name: name, numdelot: numdelot, quantite: quantite, expire: expire,}),
		})
			.then((res) => res.json)
			.catch((err) => console.log(err));
            setTimeout(() => {
                document.location.reload()
                
            }, 1000);
	};


    // Ajouter les lots
    
	useEffect(async () => {
		var res = await fetch('http://localhost:3001/medic/all');
		var data = await res.json();
		setmedics(data);
	}, []);



    
	const HandlesubmitUpdate = (e) => {
        setOpenupdate(true);
		e.preventDefault();
		console.log(selectedmedic);
		fetch(`http://localhost:3001/medic/update/${selectedmedic._id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ name: name, numdelot: numdelot, quantite: quantite, expire: expire }),
		})
			.then((res) => res.json)
			.catch((err) => console.log(err));
		
	};

    const medichandler = (value) => {

        console.log(medics[value]);
        setSelectedmedic(medics[value])
      }
    

	return (
        <div id="bg">
			<div class="row g-3">
            <Typography className={classes.Typography}>
                AJOUTER UN MEDICAMENT
            </Typography>
				<div class="col-sm-7">
					Nom
					<input
						type="text"
						onChange={(e) => setname(e.target.value)}
						class="form-control"
						placeholder="Nom"
						aria-label="name"
					/>
				</div>
			
			</div>
			<div class="col-auto" id="btn">
				<button type="submit" onClick={handleSubmitRegister} class="btn btn-primary">
					Confirmer
				</button>
				<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
          Médicament ajouté avec succès !
                 </Alert>
                 </Snackbar>
			</div>





            


            <br / >
            <hr />
            <br />









            <Typography className={classes.Typography}>
                AJOUTER LES LOTS
            </Typography>

                Médicament :
				<select class="form-select" onChange={e => medichandler(e.target.value)} aria-label="drrdv">
					{medics.map((medic, index) => (
						<option value={index} key={index}>
							{' '}
							{medic.name} 
						</option>
					))}
				</select>
                <br/>
            <div class="row g-3">
				<div class="col-sm-7">
                Numéro de lot
					<input
						type="text"
						onChange={(e) => setnumdelot(e.target.value)}
						class="form-control"
						placeholder="Numéro du lot"
						aria-label="numdelot"
					/>
				</div>

                <div class="col-sm-7">
                Quantité
					<input
						type="text"
						onChange={(e) => setquantite(e.target.value)}
						class="form-control"
						placeholder="Quantité"
						aria-label="quantite"
					/>
				</div>

                <div class="col-sm-7">
					Expire
					<input
						type="text"
						onChange={(e) => setexpire(e.target.value)}
						class="form-control"
						placeholder="Expire"
						aria-label="Expire"
                        
					/>
				</div>

                <div id="btn">
                
				<button type="submit" onClick={HandlesubmitUpdate} class="btn btn-primary">
					Confirmer
				</button>
				<Snackbar open={openupdate} autoHideDuration={6000} onClose={handleCloseupdate}>
                <Alert onClose={handleCloseupdate} severity="success">
          Lot ajouté !
                 </Alert>
                 </Snackbar>

			     </div>
			
			</div>









		</div>
	);
}
