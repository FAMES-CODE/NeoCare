import './page.css'
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import cookie from 'react-cookies';

export default function Page() {

	let history = useHistory();
	const handelSubmitClick = (e) => {
		e.preventDefault();
		sendDetailsToServer();
	};

	const quandjeclique = (e) =>{
		handelSubmitClick(e)
		history.push('/')


	}

	const sendDetailsToServer = () => {
	
		

					cookie.remove('token',{
						path: '/'
						
					})
					cookie.remove('patient', {
						path: '/'
						
					})
									  					 															
}

















		const [patient, setpatient] = useState(cookie.load('patient'));

	return (
		<div>
			<div class="container">
				<div class="main-body">
					<nav aria-label="breadcrumb" class="main-breadcrumb">
						<ol class="breadcrumb">
							<li class="breadcrumb-item">
								<a href="http://localhost:3000">Home</a>
							</li>
							<li class="breadcrumb-item active" aria-current="page">
								Profile
							</li>
						</ol>
					</nav>

					<div class="row gutters-sm">
						<div class="col-md-4 mb-3">
							<div class="card">
								<div class="card-body">
									<div class="d-flex flex-column align-items-center text-center">
										<img
											src="./images/patient.png"
											alt="patient"
											class="rounded-circle"
											width="150"
										/>
										<div class="mt-3">
											<h4>{patient.lastname}</h4>
                                            <hr />
											<p class="text-secondary mb-1">Patient</p>
									
										</div>
									</div>
								</div>
							</div>
						</div>

						<div class="col-md-8">
							<div class="card mb-3">
								<div class="card-body">
									<div class="row">
										<div class="col-sm-3">
											<h6 class="mb-0">Prenom</h6>
										</div>
										<div class="col-sm-9 text-secondary">{patient.firstname}</div>
									</div>
									<hr />
									<div class="row">
										<div class="col-sm-3">
											<h6 class="mb-0">Nom</h6>
										</div>
										<div class="col-sm-9 text-secondary">{patient.lastname}</div>
									</div>
									<hr />
									<div class="row">
										<div class="col-sm-3">
											<h6 class="mb-0">Email</h6>
										</div>
										<div class="col-sm-9 text-secondary">{patient.email}</div>
									</div>
									<hr />
									<div class="row">
										<div class="col-sm-3">
											<h6 class="mb-0">Téléphone</h6>
										</div>
										<div class="col-sm-9 text-secondary">{patient.num}</div>
									</div>
									<hr />

									<hr />
									<div class="row">
										<div class="col-sm-3">
											<h6 class="mb-0">Addresse</h6>
										</div>
										<div class="col-sm-9 text-secondary">{patient.adresse}</div>
									</div>
								</div>
							</div>
							<button type="button" onClick={quandjeclique} class="btn btn-primary">Se déconnecter</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}