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
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';

const useStyles = makeStyles({
  table: {
    minWidth: 650
  },
  pag:{
    
  backgroundImage: "linear-gradient(to right, #ECE9E6 0%, #FFFFFF  51%, #ECE9E6  100%)",
   
    

  
  
  
  
}, secondaryHeading: {
  fontSize: '1rem',
  color: 'grey'
}, heading :{
  flexBasis: '33.33%',
    flexShrink: 0,

}
});




export default function SimpleTable() {

  const [doctors, setdoctors] = useState([]);
  useEffect(async () => {
    var res = await fetch('http://localhost:3001/doctor/all');
    var data = await res.json();
    setdoctors(data);
  }, []);


  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
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
             setRecherche(e.target.value)
           }}
         />
       </FormControl>
   
      
		{doctors.filter(item => {
      if(recherche == "") {
        return item
      }else if(
        item.lastname.toLowerCase().includes(recherche.toLocaleLowerCase())
      ){
        return item
      }
    }).map((doctors) => (
      <Accordion expanded={expanded === doctors._id.toString()} onChange={handleChange(doctors._id.toString())}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.heading}>Dr.{doctors.lastname}</Typography>
          <Typography className={classes.secondaryHeading}>Service : {doctors.service}</Typography>

        </AccordionSummary>

        <AccordionDetails>
          <TableContainer className={classes.top} component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableCell align="left">Nom</TableCell>
              <TableCell align="left">Prénom</TableCell>
              <TableCell align="left">Date</TableCell>
              {doctors.drrdv.map((doctors) => (
                <TableRow>
                  <TableCell align="left">{doctors.lastname}</TableCell>
                  <TableCell align="left">{doctors.firstname}</TableCell>
                  <TableCell align="left">{doctors.date}</TableCell>
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