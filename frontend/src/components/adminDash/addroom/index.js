import React, { useState, useEffect } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';


function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

export default function Addroom() {
	const [name, setname] = useState('');
	const [etage, setetage] = useState('');
	const [nombredelits, setnombredelits] = useState('');
	const [service, setservice] = useState("")
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
		console.log({ name: name, etage: etage, nombredelits: nombredelits,});
		fetch('http://localhost:3001/room/create', {
			method: 'post',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ name: name, etage: etage, nombredelits: nombredelits, service: service,}),
		})
			.then((res) => res.json)
			.catch((err) => console.log(err));
	};
	return (
		<div id="bg">
			<div class="row g-3">
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

				<div class="col-sm-7">
					Service
					<input
						type="text"
						onChange={(e) => setservice(e.target.value)}
						class="form-control"
						placeholder="Service"
						aria-label="service"
					/>
				</div>


				<div class="col-sm-5">
					Etage
					<input
						type="text"
						onChange={(e) => setetage(e.target.value)}
						class="form-control"
						placeholder="L'étage"
						aria-label="etage"
					/>
				</div>
				<div class="col-sm-5">
					Nombre de lits
					<input
						type="text"
						onChange={(e) => setnombredelits(e.target.value)}
						class="form-control"
						placeholder="Nombre de lits"
						aria-label="nombredelits"
					/>
				</div>
			</div>
			<br />
			<div class="col-auto" id="btn">
				<button type="submit" onClick={handleSubmit} class="btn btn-primary">
					Confirmer
				</button>
				<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Chambre ajoutée avec succès !
        </Alert>
      </Snackbar>
			</div>
		</div>
	);
}
