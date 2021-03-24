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
		history.push('/doctor/login')


	}

	const sendDetailsToServer = () => {
	
		

					cookie.remove('token',{
						path: '/'
						
					})
					cookie.remove('docteur', {
						path: '/'
						
					})
									  					 															
}
	
	

	const [docteur, setdocteur] = useState(cookie.load('docteur'))
	return (
		<div>
			<div className="container">
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
											src="./images/doctorimg.Png"
											alt="patient"
											class="rounded-circle"
											width="150"
										/>
										<div class="mt-3">
											<h4>Dr.{docteur.lastname}</h4>
											<hr />
											<p class="text-secondary mb-1">Docteur</p>
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
										<div class="col-sm-9 text-secondary">{docteur.firstname}</div>
									</div>
									<hr />
									<div class="row">
										<div class="col-sm-3">
											<h6 class="mb-0">Nom</h6>
										</div>
										<div class="col-sm-9 text-secondary">{docteur.lastname}</div>
									</div>
									<hr />
									<div class="row">
										<div class="col-sm-3">
											<h6 class="mb-0">Email</h6>
										</div>
										<div class="col-sm-9 text-secondary">{docteur.email}</div>
									</div>
									<hr />
									<div class="row">
										<div class="col-sm-3">
											<h6 class="mb-0">Téléphone</h6>
										</div>
										<div class="col-sm-9 text-secondary">{docteur.num}</div>
									</div>
									<hr />

									<hr />
									<div class="row">
										<div class="col-sm-3">
											<h6 class="mb-0">Addresse</h6>
										</div>
										<div class="col-sm-9 text-secondary">{docteur.adresse}</div>
									</div>
									<hr />

<hr />
                                     <div class="row">
										<div class="col-sm-3">
											<h6 class="mb-0">Service</h6>
										</div>
										<div class="col-sm-9 text-secondary">{docteur.service}</div>
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