import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Jumbotron from 'react-bootstrap/Jumbotron';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers';
import './style2.css';
import cookie from 'react-cookies';
import { TextField } from '@material-ui/core';
import { DatePicker, Space } from 'antd';
import { useState, useEffect } from 'react';
import $ from 'jquery';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'




function Home2() {
	const [nometprenom, setnometprenom] = useState('');
	const [date, setdate] = useState('');
	const [num, setnum] = useState('');
	const [probleme, setprobleme] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log({
			nometprenom: nometprenom,
			date: date,
			num: num,
			probleme: probleme,
		});
		fetch('http://localhost:3001/rdv/getrdv', {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				nometprenom: nometprenom,
				date: date,
				num: num,
				probleme: probleme,
			}),
		})
			.then((res) => res.json)
			.catch((err) => console.log(err));
	};

	useEffect(() => {
		console.log(cookie.loadAll());
	});

	const [doctors, setdoctors] = useState([]);
	useEffect(async () => {
		var res = await fetch('http://localhost:3001/doctor/all');
		var data = await res.json();
		setdoctors(data);
	}, []);



	return (
		<div>
			<header className="header-area header-sticky">
				<div className="container">
					<div className="row">
						<div className="col-12">
							<nav className="main-nav">
								<div className="logo">
									<i className="fa fa-hospital fa-2x"></i>
								</div>
								<ul className="nav">
									<li>
										<a href="#welcome" className="active">
											Home
										</a>
									</li>
									<li>
										<a href="#features">A propos</a>
									</li>
									<li>
										<a href="#why">Pourquoi NeoCare ?</a>
									</li>
									<li>
										<a href="#demo">DEMO</a>
									</li>
									<li>
										<a href="#contact-us">Nous contacter</a>
									</li>
								</ul>
								<button className="menu-trigger">
									<span>Menu</span>
								</button>
							</nav>
						</div>
					</div>
				</div>


			</header>

			<div className="welcome-area" id="welcome">
				<img src="/images/banner-bg.png" className="bgimg" alt="" />
				<div className="header-text">
					<div className="container">
						<div className="row">
							<div className="offset-xl-3 col-xl-6 offset-lg-2 col-lg-8 col-md-12 col-sm-12">
								<h1>
									<strong>NeoCare </strong>
									<br />
									APPLICATION DE GESTION
									<br /> DE CLINIQUE
								</h1>

								<a href="#features" className="main-button-slider">
									En découvrir d'avantage
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>

			<section className="section padding-top-70 padding-bottom-0" id="features">
				<div className="container">
					<div className="row">
						<div
							className="col-lg-5 col-md-12 col-sm-12 align-self-center"
							data-scroll-reveal="enter left move 30px over 0.6s after 0.4s"
						>
							<img src="/images/blog-item-01.png" className="rounded img-fluid d-block mx-auto" alt="" />
						</div>
						<div className="col-lg-1"></div>
						<div className="col-lg-6 col-md-12 col-sm-12 align-self-center mobile-top-fix">
							<div className="left-heading">
								<h2 className="section-title">NeoCare</h2>
							</div>
							<div className="left-text">
								<p>
									Est une application web qui vous permez de gérer votre clinique plus facilement 
								</p>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-lg-12">
							<div className="hr"></div>
						</div>
					</div>
				</div>
			</section>

			<section className="section padding-bottom-100" id="features">
				<div className="container">
					<div className="row">
						<div className="col-lg-6 col-md-12 col-sm-12 align-self-center mobile-bottom-fix">
							<div className="left-heading">
								<h2 className="section-title">
									<i className="far fa-smile fa-4x"></i>
								</h2>
							</div>
							<div className="left-text">
								<p>
									Cette application sera bien évidement toujours améliorer pour rajouter de nouvelles fonctionnalitées
								</p>
							</div>
						</div>
						<div className="col-lg-1"></div>
						<div
							className="col-lg-5 col-md-12 col-sm-12 align-self-center mobile-bottom-fix-big"
							data-scroll-reveal="enter right move 30px over 0.6s after 0.4s"
						>
							<img src="/images/blog-item-02.png" className="rounded img-fluid d-block mx-auto" alt="" />
						</div>
					</div>
				</div>
			</section>

			<section className="mini" id="why">
				<div className="mini-content">
					<div className="container">
						<div className="row">
							<div className="offset-lg-3 col-lg-6">
								<div className="info">
									<h1>Pourquoi NeoCare ?</h1>
									<p></p>
								</div>
							</div>
						</div>

						<div className="row">
							<div className="col-lg-2 col-md-3 col-sm-6 col-6">
								<div className="mini-box">
									<i className="fa fa-shield-alt fa-8x"></i>
									<strong>Sécurisé</strong>
									<span>
										Toutes les données sont stocker <br /> sur votre machine, vous n'avez pas besoin d'internet
									</span>
								</div>
							</div>

							<div className="col-lg-2 col-md-3 col-sm-6 col-6">
								<div className="mini-box">
									<i className="fa fa-gem fa-8x"></i>
									<strong>Evolution</strong>
									<span>
										Nous prévoyons de rajouter de nouvelles fonctionnalitées <br />
										et d'améliorer <br /> notre application sans cesse.
									</span>
								</div>
							</div>
							<div className="col-lg-2 col-md-3 col-sm-6 col-6">
								<div className="mini-box">
									<i className="fas fa-mobile-alt"></i>
									<strong>Responsive</strong>
									<span>
										Sur ordinateur comme sur mobile, <br /> vous n'avez rien a installé <br />
										aucune perte de temps.
									</span>
								</div>
							</div>
							<div className="col-lg-2 col-md-3 col-sm-6 col-6">
								<div className="mini-box">
									<i className="fa fa-wrench fa-8x"></i>
									<strong>Mise à jour</strong>
									<span>
										Nous mettons régulièrement l'application à jour pour appliquer les derniers
										patch de sécurité.
									</span>
								</div>
							</div>

							<div class="col-lg-2 col-md-3 col-sm-6 col-6">
								<div class="mini-box">
									<i>
										<i class="fa fa-sliders-h fa-8x"></i>
									</i>
									<strong>Direct</strong>
									<span>
										Suivez en temps réel les dernières nouvelles de votre clinique et <br/> ayez un controle sur tout ce qui se passe.
									</span>
								</div>
							</div>
							<div class="col-lg-2 col-md-3 col-sm-6 col-6">
								<a class="mini-box">
									<i>
										<i class="fa fa-smile-wink fa-8x"></i>
									</i>
									<strong>Un test gratuit</strong>
									<span>
										Profitez d'un mois gratuit pour vous faire une idée de l'application directement
										sur votre lieu de travail.
									</span>
								</a>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="section colored" id="demo">
				<div className="container">
					<div className="row">
						<div className="col-lg-12">
							<div className="center-heading">
								<h2 className="section-title">Demo</h2>
							</div>
						</div>
						<div className="offset-lg-3 col-lg-6">
							<div className="center-text">
								<p>
									Ici vous pouvez essayer notre application pour vous faire une idée.
								</p>
							</div>
						</div>
					</div>

					<div className="row">
						<div
							className="col-lg-4 col-md-6 col-sm-12"
							data-scroll-reveal="enter bottom move 50px over 0.6s after 0.2s"
						>
							<div className="pricing-item">
								<div className="pricing-header">
									<h3 className="pricing-title"></h3>
								</div>
								<div className="pricing-body">
									<div className="price-wrapper">
										<span className="currency"></span>
										<span className="price">Patient</span>
										<span className="period"></span>
									</div>
									<ul className="list">
										<li className="active">Essayez en tant que Patient</li>
									</ul>
								</div>
								<div className="pricing-footer">
									<a href="http://localhost:3000/patient/login" className="main-button">
										DEMO
									</a>
								</div>
							</div>
						</div>

						<div
							className="col-lg-4 col-md-6 col-sm-12"
							data-scroll-reveal="enter bottom move 50px over 0.6s after 0.4s"
						>
							<div className="pricing-item active">
								<div className="pricing-header">
									<h3 className="pricing-title"></h3>
								</div>
								<div className="pricing-body">
									<div className="price-wrapper">
										<span className="currency"></span>
										<span className="price">Administration</span>
										<span className="period"></span>
									</div>
									<ul className="list">
										<li className="active">Essayez en tant qu'Administrateur ( secretariat )</li>
									</ul>
								</div>
								<div className="pricing-footer">
									<a href="http://localhost:3000/admin" className="main-button">
										DEMO
									</a>
								</div>
							</div>
						</div>

						<div
							className="col-lg-4 col-md-6 col-sm-12"
							data-scroll-reveal="enter bottom move 50px over 0.6s after 0.6s"
						>
							<div className="pricing-item">
								<div className="pricing-header">
									<h3 className="pricing-title"></h3>
								</div>
								<div className="pricing-body">
									<div className="price-wrapper">
										<span className="currency"></span>
										<span className="price">Docteur</span>
										<span className="period"></span>
									</div>
									<ul className="list">
										<li className="active">Essayez en tant que Patient</li>
									</ul>
								</div>
								<div className="pricing-footer">
									<a href="http://localhost:3000/doctor/login" className="main-button">
										DEMO
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>

				<br />
				<br />
				<br />
				<br />

				<div className="container">
					<div className="row">

						<div className="col-lg-4 col-md-6 col-sm-12">
							<h5 className="margin-bottom-30">Prendre rendez-vous</h5>
							<div className="contact-text">
								<p>
									Prenez un rendez-vous avec un medecin
									<br />
									Remplissez les informations correctement
									<br />
									Un assistant vous contactera pour confirmer votre rendez-vous
								</p>
							</div>
						</div>

						<div className="col-lg-8 col-md-6 col-sm-12">
							<div className="contact-form">
								<form id="contact" action="" method="get">
									<div className="row">
										<div className="col-lg-6 col-md-12 col-sm-12">
											<fieldset>
												<input
													onChange={(e) => setnometprenom(e.target.value)}
													name="name"
													type="text"
													className="form-control"
													id="name"
													placeholder="Nom et prénom"
													required=""
												/>
											</fieldset>
										</div>
										<div className="col-lg-6 col-md-12 col-sm-12">
											<fieldset>
												<input
													onChange={(e) => setdate(e.target.value)}
													name="date"
													type="text"
													className="form-control"
													id="date"
													placeholder="Date souhaité"
													required=""
												/>
											</fieldset>
										</div>
										<div className="col-lg-6 col-md-12 col-sm-12">
											<fieldset>
												<input
													onChange={(e) => setnum(e.target.value)}
													name="num"
													type="text"
													className="form-control"
													id="num"
													placeholder="Numéro de téléphone"
													required=""
												/>
											</fieldset>
										</div>
										<div className="col-lg-12">
											<fieldset>
												<textarea
													onChange={(e) => setprobleme(e.target.value)}
													name="probleme"
													rows="6"
													className="form-control"
													id="message"
													placeholder="La spécialité du Médecin que vous voulez consulter"
													required=""
												></textarea>
											</fieldset>

											<br />
										</div>
										<div className="col-lg-12">
											<fieldset>
												<button
													type="submit"
													onClick={handleSubmit}
													id="form-submit"
													className="main-button"
												>
													Confirmer
												</button>
											</fieldset>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="section colored" id="contact-us">
				<div id="nouscontact">Nous contacter</div>
				<section id="contact">
					<div class="inner">
						<iframe
							id="maps"
							src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3196.4227938028553!2d3.023234751326458!3d36.760423579858525!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x128fb21984c040e3%3A0x6ebf9c589c115616!2sBoulevard%20du%2011%20Decembre%201960%2C%20El%20Biar!5e0!3m2!1sfr!2sdz!4v1614530283871!5m2!1sfr!2sdz"
						></iframe>

						<section class="split">
							<section>
								<div class="contact-method">
									<span class="icon solid alt">
										<i class="fa fa-envelope-open fa-2x"></i>
									</span>
									<h3>Email</h3>
									<a mailto="#">ferkaniamineamine08@gmail.com</a>
								</div>
							</section>
							<section>
								<div class="contact-method">
									<span class="icon solid alt">
										{' '}
										<i class="fa fa-phone fa-2x"></i>
									</span>
									<h3>Téléphone</h3>
									<span>(+213) 021479534 </span>
								</div>
							</section>
							<section>
								<div class="contact-method">
									<span class="icon solid alt">
										<i class="fa fa-home fa-2x"></i>
									</span>
									<h3>Addresse</h3>
									<span>
										El biar
										<br />
										Alger
										<br />
										Algérie
									</span>
								</div>
							</section>
						</section>
					</div>
				</section>
			</section>
		</div>
	);
}





export default Home2;
