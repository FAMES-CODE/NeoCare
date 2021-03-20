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
import InputLabel from '@material-ui/core/InputLabel';
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
}



});




export default function Rendezvous() {

    const [rdvs, setrdvs] = useState([]);
    useEffect(async () => {
        var res = await fetch('http://localhost:3001/rdv/allrdv');
        var data = await res.json();
        setrdvs(data);
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
    rowsPerPage - Math.min(rowsPerPage, rdvs.length - page * rowsPerPage);
    
    

    const [recherche, setRecherche] = useState('')

      
    const handleDeleteRdv = async (e, id) => {
			e.preventDefault();
			setrdvs(rdvs.filter((el) => el._id != id));
			var res = await fetch(`http://localhost:3001/rdv/delete/${id}`, { method: 'DELETE' });
			var data = await res.json();
			console.log(data);
		};

 
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
            <TableCell align="left">Nom</TableCell>
            <TableCell align="left">Date</TableCell>
            <TableCell align="left">Téléphone</TableCell>
            <TableCell align="left">Spécialité souhaitée</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {rdvs.filter(item => {
            if(recherche == '') {
              return item
            }else if(
              item.nometprenom.toLowerCase().includes(recherche.toLowerCase())
            ){
              return item
            }
          })
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((rdvs, index) => (
              
                <TableRow key={rdvs.nometprenom}>
                  <TableCell align="left">



                  <IconButton onClick={(e) => handleDeleteRdv(e, rdvs._id)} aria-label="delete">
                  <DeleteIcon />
                  </IconButton>
                  </TableCell>


                <TableCell align="left" component="th" scope="row">
                  
                  {rdvs.nometprenom}

                </TableCell>
 
                <TableCell align="left">{rdvs.date}</TableCell>
                <TableCell align="left">{rdvs.num}</TableCell>
                <TableCell align="left">{rdvs.probleme} 
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
      <TablePagination className={classes.pag}
        rowsPerPageOptions={[5, 10, 25,]}
        component="div"
        count={rdvs.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        />
    </TableContainer>
        </div>
  );
}