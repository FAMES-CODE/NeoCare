import './register.css'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { useState, useEffect } from 'react';


function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
export default function PatientREGISTER (){

	const [firstname, setfirstname] = useState('');
	const [email, setemail] = useState('');
	const [lastname, setlastname] = useState('');
	const [age, setage] = useState('');
	const [password, setpassword] = useState('');
	const [num, setnum] = useState('');
	const [gender, setgender] = useState('');
	const [poids, setpoids] = useState('');
	const [taille, settaille] = useState('');
	const [dateDeNaissance, setdateDeNiassance] = useState('');
	const [antecedentDuPatient, setantecedentDuPatient] = useState('');
	const [adresse, setadresse] = useState("")
	const [probleme, setprobleme] = useState('');
	const [groupesang, setgroupesang] = useState('');
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
			email: email,
			lastname: lastname,
			age: age,
			password: password,
			num: num,
			gender: gender,
			poids: poids,
			taille: taille,
			dateDeNaissance: dateDeNaissance,
			antecedentDuPatient: antecedentDuPatient,
			adresse: adresse,
			probleme: probleme,
			groupesang: groupesang
		});
		fetch('http://localhost:3001/patient/register', {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				firstname: firstname,
				email: email,
				lastname: lastname,
				age: age,
				password: password,
				num: num,
				gender: gender,
				poids: poids,
				taille: taille,
				dateDeNaissance: dateDeNaissance,
				antecedentDuPatient: antecedentDuPatient,
				adresse: adresse,
				probleme: probleme,
				groupesang: groupesang,
			}),
		})
			.then((res) =>
				fetch('http://localhost:3001/patient/register', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ 
					firstname: firstname,
					lastname: lastname,

					})

				})
			)
			.catch((err) => console.log(err));
	};

    return (
		<div>
			<div class="page-wrapper bg-gra-01 p-t-180 p-b-100 font-poppins">
				<div class="wrapper wrapper--w780">
					<div class="card card-3">
						<div class="card-heading"></div>
						<div class="card-body">
							<h2 class="title">Enregistrer un Patient</h2>
							<form method="POST">
								<div class="input-group">
									<input
										class="input--style-3"
										onChange={(e) => setfirstname(e.target.value)}
										type="text"
										placeholder="Prenom"
										name="firstname"
									/>
								</div>
								<div class="input-group">
									<input
										class="input--style-3"
										onChange={(e) => setlastname(e.target.value)}
										type="text"
										placeholder="Nom"
										name="lastname"
									/>
								</div>
								<div class="input-group">
									<input
										class="input--style-3 js-datepicker"
										type="text"
										onChange={(e) => setdateDeNiassance(e.target.value)}
										placeholder="Date de naissance (JJ/MM/AA)"
										name="birthday"
									/>
									<i class="zmdi zmdi-calendar-note input-icon js-btn-calendar"></i>
								</div>
								<div class="input-group">
									<input
										class="input--style-3"
										onChange={(e) => setage(e.target.value)}
										type="text"
										placeholder="Age"
										name="age"
									/>
								</div>
								<div class="input-group">
									<input
										class="input--style-3"
										onChange={(e) => setgender(e.target.value)}
										type="text"
										placeholder="Homme / Femme"
										name="gender"
									/>
								</div>

								<div class="input-group">
									<input
										class="input--style-3"
										onChange={(e) => setemail(e.target.value)}
										type="email"
										placeholder="Email"
										name="email"
									/>
								</div>
								<div class="input-group">
									<input
										class="input--style-3"
										type="text"
										onChange={(e) => setpassword(e.target.value)}
										placeholder="Mot de passe"
										name="password"
									/>
								</div>
								<div class="input-group">
									<input
										class="input--style-3"
										onChange={(e) => setnum(e.target.value)}
										type="text"
										placeholder="Numéro de téléphone"
										name="num"
									/>
								</div>
								<div class="input-group">
									<input
										class="input--style-3"
										onChange={(e) => settaille(e.target.value)}
										type="text"
										placeholder="Taille (cm)"
										name="taille"
									/>
								</div>
								<div class="input-group">
									<input
										class="input--style-3"
										onChange={(e) => setpoids(e.target.value)}
										type="text"
										placeholder="Poids (Kg)"
										name="poids"
									/>
								</div>
								<div class="input-group">
									<input
										class="input--style-3"
										onChange={(e) => setadresse(e.target.value)}
										type="text"
										placeholder="Adresse"
										name="adresse"
									/>
								</div>
								<div class="input-group">
									<input
										class="input--style-3"
										onChange={(e) => setprobleme(e.target.value)}
										type="text"
										placeholder="Problème"
										name="probleme"
									/>
								</div>
								<div class="input-group">
									<input
										class="input--style-3"
										onChange={(e) => setgroupesang(e.target.value)}
										type="text"
										placeholder="Groupe sanguin"
										name="groupesang"
									/>
								</div>
								<div class="input-group">
									<input
										class="input--style-3"
										type="text"
										onChange={(e) => setantecedentDuPatient(e.target.value)}
										placeholder="Antécedants médicaux (a1, a2, etc)"
										name="num"
									/>
								</div>
								
								<div class="p-t-10">
									<button class="btn btn--pill btn--green" onClick={handleSubmit} type="submit">
										Soumettre
									</button>
									<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
          Lot ajouté !
                 </Alert>
                 </Snackbar>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}