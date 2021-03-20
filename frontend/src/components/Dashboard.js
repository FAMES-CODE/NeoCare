// Material ui & react
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew';
import ListAltIcon from '@material-ui/icons/ListAlt';
import HotelIcon from '@material-ui/icons/Hotel';
import AddBoxIcon from '@material-ui/icons/AddBox';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import ClearAllIcon from '@material-ui/icons/ClearAll';
import LocalPharmacyIcon from '@material-ui/icons/LocalPharmacy';
import GetAppIcon from '@material-ui/icons/GetApp';
import ViewListRoundedIcon from '@material-ui/icons/ViewListRounded';
import PropTypes from 'prop-types';
import SettingsIcon from '@material-ui/icons/Settings';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import cookie from 'react-cookies';
//// End of Material ui & react


//// Admin Dashboard
import Rendezvous from './adminDash/rendeznous/rendezvous';
import Addroom from './adminDash/addroom/index'
import SignUp from '../components/doctorsys/signup';
import SimpleTable from './adminDash/dashboard/test'
import Patientlist from './adminDash/patientlist/new'
import Doctorlist from './adminDash/doctorlist/doctorlist'
import Roooom from './adminDash/rooms/room'
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import Hos from './adminDash/hospitaliserdespatients/hos'
import Medic from './adminDash/medic/medic'
import Addmedic from './adminDash/addMedic/addmedic'
import Params from './adminDash/paramètres/parametres'
/// End of Admin Dashboard


function TabPanel(props) {
	const { children, value, index, ...other } = props;
  
	return (
	  <div
		role="tabpanel"
		hidden={value !== index}
		id={`scrollable-force-tabpanel-${index}`}
		aria-labelledby={`scrollable-force-tab-${index}`}
		{...other}
	  >
		{value === index && (
		  <Box p={3}>
			<Typography>{children}</Typography>
		  </Box>
		)}
	  </div>
	);
  }

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired,
};

function a11yProps(index) {
	return {
		id: `vertical-tab-${index}`,
		'aria-controls': `vertical-tabpanel-${index}`,
	};
}

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		height: "100vh",
	

	

		backgroundColor: " #D4E0E9",
		



	},
	tabs: {
		borderRight: `5px solid ${theme.palette.divider}`,
		backgroundColor: "white",
		boxShadow: "0px 3px 9px 1px rgba(0,0,0,0.75)",
	},
	
}));


export default function VerticalTabs() {
	const [admin, setadmin] = useState(cookie.load('admin'));
	const classes = useStyles();
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<div className={classes.root}>
		  <AppBar position="static" color="default">
        <Tabs className={classes.tabs}
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="on"
          indicatorColor="primary"
          textColor="primary"
          aria-label="scrollable force tabs example"
        >
          <Tab label="Rendez-vous des docteurs" icon={<ViewListRoundedIcon />} {...a11yProps(0)} />
          <Tab label="Listes des Patients" icon={<AccessibilityNewIcon />} {...a11yProps(1)} />
          <Tab label="Listes des Docteurs" icon={<ListAltIcon />} {...a11yProps(2)} />
          <Tab label="Listes des Rendez-vous" icon={<ClearAllIcon />} {...a11yProps(3)} />
          <Tab label="Chambres" icon={<HotelIcon />} {...a11yProps(4)} />
		  <Tab label="Médicaments" icon={<LocalPharmacyIcon />} {...a11yProps(5)} />
		  <Tab label="Hospitalisations" icon={<HomeWorkIcon />} {...a11yProps(6)} />
          <Tab label="Ajouter une chambre" icon={<AddBoxIcon />} {...a11yProps(7)} />
          <Tab label="Enregister un docteur" icon={<LocalHospitalIcon />} {...a11yProps(8)} />
		  <Tab label="Ajouter un médicament" icon={<GetAppIcon />} {...a11yProps(9)} />
		  <Tab label="Paramètres" icon={<SettingsIcon />} {...a11yProps(10)} />

        </Tabs>
      </AppBar>
			<TabPanel value={value} index={0}>
				<SimpleTable />
			</TabPanel>
			<TabPanel value={value} index={1}>
				<Patientlist />
			</TabPanel>
			<TabPanel value={value} index={2}>
				<Doctorlist />
			</TabPanel>
			<TabPanel value={value} index={3}>
				<Rendezvous />
			</TabPanel>
			<TabPanel value={value} index={4}>
				<Roooom />
			</TabPanel>
			<TabPanel value={value} index={5}>
		        <Medic />
			</TabPanel>
			<TabPanel value={value} index={6}>
				<Hos />
			</TabPanel>
			<TabPanel value={value} index={7}>
			<Addroom />
			</TabPanel>
			<TabPanel value={value} index={8}>
				<SignUp />
			</TabPanel>
			<TabPanel value={value} index={9}>
				<Addmedic />
			</TabPanel>
			<TabPanel value={value} index={10}>
			<Params />
			</TabPanel>
		</div>
	);
}
