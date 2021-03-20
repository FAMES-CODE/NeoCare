import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
	},
	heading: {
		fontSize: theme.typography.pxToRem(15),
		flexBasis: '33.33%',
		flexShrink: 0,
	},
	secondaryHeading: {
		fontSize: theme.typography.pxToRem(15),
		color: theme.palette.text.secondary,
	},
}));

export default function Listes() {
	const [rooms, setrooms] = useState([]);
	useEffect(async () => {
		var res = await fetch('http://localhost:3001/room/all');
		var data = await res.json();
		console.log({ data });
		setrooms(data);
	}, []);

	const classes = useStyles();
	const [expanded, setExpanded] = React.useState(false);

	const handleChange = (panel) => (event, isExpanded) => {
		setExpanded(isExpanded ? panel : false);
	};


	const handleDeletePatient = async (e, id,ptid, firstname, lastname,indexRoom) => {
		e.preventDefault();
		var newRooms = rooms;
		newRooms[indexRoom].patienthospitalise = newRooms[indexRoom].patienthospitalise.filter((el) => el._id != ptid);
		setrooms([...newRooms]);
		console.log(newRooms)
		console.log(id,ptid, firstname ,lastname,indexRoom)
		var res = await fetch(`http://localhost:3001/room/deletep/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ lastname: lastname, firstname: firstname }),
		});
		var data = await res.json();
		console.log(data);
	};

	const [recherche, setRecherche] = useState('')

	return (
		<div className={classes.root}>
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

			{rooms
				.filter((item) => {
					if (recherche == '') {
						return item;
					} else if (item.name.toLowerCase().includes(recherche.toLowerCase())) {
						return item;
					}
				})
				.map((room,indexRoom) => (
					<Accordion expanded={expanded === room._id.toString()} onChange={handleChange(room._id.toString())}>
						<AccordionSummary
							expandIcon={<ExpandMoreIcon />}
							aria-controls="panel1bh-content"
							id="panel1bh-header"
						>
							<Typography className={classes.heading}>Chambre : {room.name}</Typography>

							<Typography className={classes.heading}> Service : {room.service}</Typography>
						</AccordionSummary>

						<AccordionDetails>
							<TableContainer className={classes.top} component={Paper}>
								<Table className={classes.table} aria-label="simple table">
									<TableCell akign="left"> </TableCell>
									<TableCell align="left">Prenom</TableCell>
                                    <TableCell align="left">Nom</TableCell>
                                    <TableCell align="left">Groupe sanguin</TableCell>
                                    <TableCell align="left">Raison de l'hospitalisé</TableCell>
								
									{room.patienthospitalise.map((patient) => (
										<TableRow>
											<TableCell align="left">
												<IconButton
													onClick={(e) => handleDeletePatient(e, room._id,patient._id,patient.lastname, patient.firstname,indexRoom)}
													aria-label="delete"
												>
													<DeleteIcon />
												</IconButton>
											</TableCell>
											<TableCell align="left">
												{patient.firstname}
											</TableCell>
                                            <TableCell align="left">
												{patient.lastname}
											</TableCell>
                                            <TableCell align="left">
												{patient.groupesanguin}
											</TableCell>
                                            <TableCell align="left">
												{patient.raison}
											</TableCell>
										
										</TableRow>
									))}
								</Table>
							</TableContainer>
						</AccordionDetails>
					</Accordion>
				))}
		</div>
	);
}
