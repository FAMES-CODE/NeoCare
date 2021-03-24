import React, { useState, useEffect } from 'react';
import cookie from 'react-cookies';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

export default function Doctorlist() {
	const useStyles = makeStyles({
	
	
	});

	const classes = useStyles();

	const [recherche, setRecherche] = useState('')

	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);
	const handleChangePage = (event, newPage) => {
	  setPage(newPage);
	};
	const [docteur, setdocteur] = useState(cookie.load('docteur'));
	useEffect(() => {
		console.log(docteur);
		
	}, [])
	
	const handleChangeRowsPerPage = event => {
		setRowsPerPage(parseInt(event.target.value, 5));
		setPage(0);
	  };
	  const emptyRows =
		rowsPerPage - Math.min(rowsPerPage, docteur.length - page * rowsPerPage);


	



		   const handleDeleteDrrdv = async (e, id, rdvid, firstname) => {
				e.preventDefault();
				var newDocteur = docteur;
				console.log(newDocteur)
				newDocteur.drrdv = newDocteur.drrdv.filter((el) => el._id != rdvid);
				cookie.save('docteur', newDocteur)
                window.location.reload(false);
				setdocteur(newDocteur);	
				var res = await fetch(`http://localhost:3001/doctor/deleterdv/${id}`, {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ firstname: firstname }),
				});
				var data = await res.json();
				console.log(data);
			};

	return (
		<div className={classes.doctorlist}>
			<FormControl fullWidth className={classes.margin} variant="outlined">
				<OutlinedInput
					id="outlined-adornment-amount"
					startAdornment={<InputAdornment position="start">Recherche : </InputAdornment>}
					labelWidth={60}
					onChange={(e) => {
						setRecherche(e.target.value);
					}}
				/>
			</FormControl>

			<TableContainer className={classes.top} component={Paper}>
				<Table className={classes.table} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell align="left"></TableCell>
							<TableCell align="left">Nom</TableCell>
							<TableCell align="left">Prenom</TableCell>
							<TableCell align="left">Date</TableCell>
						</TableRow>
					</TableHead>

					<TableBody>
						{docteur.drrdv
							.filter((item => {
								if (recherche == '') {
									return item;
								} else if (item.lastname.toLowerCase().includes(recherche.toLowerCase())) {
									return item;
								}
							}))
							.map((rdv, indexDocteur) => (
								<TableRow key={rdv.firstname}>
									<TableCell align="left">
										<IconButton
											onClick={(e) =>
												handleDeleteDrrdv(e, docteur._id, rdv._id, rdv.firstname, indexDocteur)
											}
											aria-label="delete"
										>
											<DeleteIcon />
										</IconButton>
									</TableCell>
									<TableCell align="left" component="th" scope="row">
										{rdv.lastname}
									</TableCell>
									<TableCell align="left" component="th" scope="row">
										{rdv.firstname}
									</TableCell>
									<TableCell align="left" component="th" scope="row">
										{rdv.date}
									</TableCell>
								</TableRow>
							))}

						{emptyRows > 0 && (
							<TableRow style={{ height: 53 * emptyRows }}>
								<TableCell colSpan={6} />
							</TableRow>
						)}
					</TableBody>
				</Table>
				<TablePagination
					className={classes.pag}
					rowsPerPageOptions={[5, 10, 25]}
					component="div"
					count={docteur.drrdv.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onChangePage={handleChangePage}
					onChangeRowsPerPage={handleChangeRowsPerPage}
				/>
			</TableContainer>
		</div>
	);
}
