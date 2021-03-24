import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
import Paper from "@material-ui/core/Paper";
import { useState, useEffect } from 'react';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles({
  table: {
    minWidth: 650
  },
  pag:{
    
  backgroundImage: "linear-gradient(to right, #ECE9E6 0%, #FFFFFF  51%, #ECE9E6  100%)",
   
    

  
  
  
  
},
top:{
    marginTop: "1rem"
}});




export default function Doctorlist() {

  
	const [doctors, setdoctors] = useState([])
	useEffect(async () => {
		var res = await fetch('http://localhost:3001/doctor/all');
		var data = await res.json();
		setdoctors(data)
	}, []);

  
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  
  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const emptyRows =
  rowsPerPage - Math.min(rowsPerPage, doctors.length - page * rowsPerPage);
  

     const handleDeleteDocteur = async (e, id) => {
			e.preventDefault();
			setdoctors(doctors.filter((el) => el._id != id));
			var res = await fetch(`http://localhost:3001/doctor/delete/${id}`, { method: 'DELETE' });
			var data = await res.json();
			console.log(data);
		};

		const [recherche, setRecherche] = useState('')

  return (
		<div>
			<FormControl fullWidth className={classes.margin} variant="outlined">
				<OutlinedInput
					id="outlined-adornment-amount"
					startAdornment={<InputAdornment position="start">Recherche : </InputAdornment>}
					labelWidth={60}
					onChange={(e) => {
						setRecherche(e.target.value)
					  }}
				/>
			</FormControl>

			<TableContainer className={classes.top} component={Paper}>
				<Table className={classes.table} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell align="left">Supprimer</TableCell>
							<TableCell align="left">Prenom</TableCell>
							<TableCell align="left">Nom</TableCell>
							<TableCell align="left">Téléphone</TableCell>
							<TableCell align="left">Email</TableCell>
							<TableCell align="left">Adresse</TableCell>
							<TableCell align="left">Service</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{doctors.filter(item => {
							if(recherche == ''){
								return item 
							}else if(
								item.lastname.toLowerCase().includes(recherche.toLowerCase())
							){
								return item
							}
						}).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((docteur, index) => (
							<TableRow key={docteur.firstname}>
								<TableCell align="left">
									<IconButton
										onClick={(e) => handleDeleteDocteur(e, docteur._id)}
										aria-label="delete"
									>
										<DeleteIcon />
									</IconButton>
								</TableCell>
								<TableCell component="th" scope="row">
									{docteur.firstname}
								</TableCell>
								<TableCell align="left">{docteur.lastname}</TableCell>
								<TableCell align="left">{docteur.num}</TableCell>
								<TableCell align="left">{docteur.email}</TableCell>
								<TableCell align="left">{docteur.adresse}</TableCell>
								<TableCell align="left">{docteur.service}</TableCell>
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
					rowsPerPageOptions={[5, 15, 25]}
					component="div"
					count={doctors.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onChangePage={handleChangePage}
					onChangeRowsPerPage={handleChangeRowsPerPage}
				/>
			</TableContainer>
		</div>
  );
}