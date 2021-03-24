import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';


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

export default function Medic() {

  const [medics, setmedics] = useState([]);
  useEffect(async () => {
    var res = await fetch('http://localhost:3001/medic/all');
    var data = await res.json();
    setmedics(data);
  }, []);

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  
  const handleDeleteMedic = async (e,id) => {
    e.preventDefault()
		setmedics(medics.filter(el => el._id != id))
		var res = await fetch(`http://localhost:3001/medic/delete/${id}`, {method: "DELETE"});
		var data = await res.json();
		console.log(data) 
  }

  const handleDeletePatient = async (e, id, lid, numdelot, indexMedics) => {
		e.preventDefault();
		var newMedics = medics;
		newMedics[indexMedics].lot = newMedics[indexMedics].lot.filter((el) => el._id != lid);
		setmedics([...newMedics]);
		console.log(newMedics);
		console.log(id, lid, numdelot, indexMedics);
		var res = await fetch(`http://localhost:3001/medic/deletem/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ numdelot: numdelot }),
		});
		var data = await res.json();
		console.log(data);
  };

  return (
		<div className={classes.root}>
			{medics.map((medics, indexMedics) => (
				<Accordion expanded={expanded === medics._id.toString()} onChange={handleChange(medics._id.toString())}>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls="panel1bh-content"
						id="panel1bh-header"
					>
						<IconButton onClick={(e) => handleDeleteMedic(e, medics._id)} aria-label="delete">
							<DeleteIcon />
						</IconButton>
						<Typography className={classes.heading}>{medics.name}</Typography>
					</AccordionSummary>

					<AccordionDetails>
						<TableContainer className={classes.top} component={Paper}>
							<Table className={classes.table} aria-label="simple table">
								<TableCell akign="left"> </TableCell>
								<TableCell align="left">Numéro de lot</TableCell>
								<TableCell align="left">Quantité</TableCell>
								<TableCell align="left">Expire</TableCell>
								{medics.lot.map((medic) => (
									<TableRow>
										<TableCell align="left">
											<IconButton
												onClick={(e) =>
													handleDeletePatient(
														e,
														medics._id,
														medic._id,
														medic.numdelot,
														indexMedics
													)
												}
												aria-label="delete"
											>
												<DeleteIcon />
											</IconButton>
										</TableCell>
										<TableCell align="left">{medic.numdelot}</TableCell>
										<TableCell align="left">{medic.quantite}</TableCell>
										<TableCell align="left">{medic.expire}</TableCell>
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
