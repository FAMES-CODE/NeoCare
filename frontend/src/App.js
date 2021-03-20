import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import SignInSide from './components/doctorsys/signin'
import Dashboard from "./components/Dashboard.js"
import Patient from "./components/PatientDashboard.js"
import Home2 from './components/Home/home2'
import Doctordashboard from "./components/DoctorDashboard"
import PatientREGISTER from './components/patientsys/register';
import PlogIn from './components/patientsys/login';
import Adminlogin from './components/adminSys/adminLogin'


 

function App() {


  return (
		<Router>
			<Switch>
			
				<Route exact path="/">
					<Home2 />
				</Route>

				<Route exact path="/doctor/">
					<Doctordashboard />
				</Route>

				<Route exact path="/doctor/login">
					<SignInSide />
				</Route>
				
				<Route exact path="/admin">
					<Dashboard />
				</Route>

				<Route exact path="/admin/login">
					<Adminlogin />
				</Route>
				
				<Route exact path="/patient/register">
					<PatientREGISTER />
				</Route>

				<Route exact path="/patient/login">
					<PlogIn />
				</Route>

				<Route exact path="/patient">
					<Patient />
				</Route>


			</Switch>
		</Router>
  );
}
 
 

export default App;
