import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Page from './doctorDash/doctorProfil/page'
import Doctorrdv from './doctorDash/docteurrdv/index.js';
import PatientREGISTER from './patientsys/register'
import Listes from './doctorDash/Listes/listes'
import Patientlists from './doctorDash/patientslist/index'

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`full-width-tabpanel-${index}`}
			aria-labelledby={`full-width-tab-${index}`}
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
		id: `full-width-tab-${index}`,
		'aria-controls': `full-width-tabpanel-${index}`,
	};
}

const useStyles = makeStyles((theme) => ({
	root: {
		width: "100vw",
	},
}));

export default function Doctordashboard() {
	const classes = useStyles();
	const theme = useTheme();
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const handleChangeIndex = (index) => {
		setValue(index);
	};

	return (
		<div className={classes.root}>
			<AppBar position="static" color="default">
				<Tabs
					value={value}
					onChange={handleChange}
					indicatorColor="primary"
					textColor="primary"
					variant="fullWidth"
					aria-label="full width tabs example"
				>
					<Tab label="Mon profile" {...a11yProps(0)} />
					<Tab label="Rendez-vous" {...a11yProps(1)} />
					<Tab label="Ajouter un Patient" {...a11yProps(2)} />
					<Tab label="Listes des Hospitalisations" {...a11yProps(3)} />
					<Tab label="Listes des Patients" {...a11yProps(4)} />
				</Tabs>
			</AppBar>
			<SwipeableViews
				axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
				index={value}
				onChangeIndex={handleChangeIndex}
			>
				<TabPanel value={value} index={0} dir={theme.direction}>
					<Page />
				</TabPanel>
				<TabPanel value={value} index={1} dir={theme.direction}>
					<Doctorrdv />
				</TabPanel>
				<TabPanel value={value} index={2} dir={theme.direction}>
					<PatientREGISTER />
				</TabPanel>
				<TabPanel value={value} index={3} dir={theme.direction}>
					<Listes />
				</TabPanel>
				<TabPanel value={value} index={4} dir={theme.direction}>
                    <Patientlists />
				</TabPanel>
			</SwipeableViews>
		</div>
	);
}
