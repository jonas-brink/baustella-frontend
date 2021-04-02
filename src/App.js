import { Component } from 'react';
import './App.css';
import axios from 'axios';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhoneAlt, faHome, faMapMarkerAlt, faUser, faEnvelope, faCalendarDay } from '@fortawesome/free-solid-svg-icons';
import Button from '@material-ui/core/Button';
import PageHeader from './PageHeader.js';


class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			vorname: '',
			nachname: '',
			telefonnr: '',
			strasse: '',
			hausnr: '',
			plz: '',
			ort: '',
			email: '',
			datum: ''
		};

		this.sendInput = this.sendInput.bind(this);
	}

	sendInput() {
		axios.post('http://localhost:7000/server.php', JSON.stringify(this.state))
			.then(res => {
				console.log('Antwort vom Server:');
				console.log(res.data);
			})
	}

	render() {
		return (
			<div className="App" >
				<PageHeader />
				<InputGroup className="m-3 w-auto">
					<InputGroup.Prepend className="longPrepend">
						<InputGroup.Text className="longText">
							<FontAwesomeIcon icon={faCalendarDay} className="whiteIcon" />
						</InputGroup.Text>
					</InputGroup.Prepend>
					<DropdownButton id="dropdown-basic-button" title="Dropdown button">
						<Dropdown.Item href="#/action-1">Action</Dropdown.Item>
						<Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
						<Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
					</DropdownButton>
				</InputGroup>
				<InputGroup className="m-3 w-auto">
					<InputGroup.Prepend className="longPrepend">
						<InputGroup.Text className="longText">
							<FontAwesomeIcon icon={faUser} className="whiteIcon" />
						</InputGroup.Text>
					</InputGroup.Prepend>
					<FormControl
						placeholder="Vorname"
						aria-label="Vorname"
						aria-describedby="basic-addon1"
						onChange={event => { this.setState({ vorname: event.target.value }); }}
						className="darkControl"
					/>
					<FormControl
						placeholder="Nachname"
						aria-label="Nachname"
						aria-describedby="basic-addon1"
						onChange={event => { this.setState({ nachname: event.target.value }); }}
						className="darkControl"
					/>
				</InputGroup>
				<InputGroup className="m-3 w-auto">
					<InputGroup.Prepend className="longPrepend">
						<InputGroup.Text className="longText">
							<FontAwesomeIcon icon={faPhoneAlt} className="whiteIcon" />
						</InputGroup.Text>
					</InputGroup.Prepend>
					<FormControl
						placeholder="Telefon-Nr."
						aria-label="Telefon-Nr."
						aria-describedby="basic-addon1"
						onChange={event => { this.setState({ telefonnr: event.target.value }); }}
						className="darkControl"
					/>
				</InputGroup>
				<InputGroup className="ml-3 mr-3 w-auto">
					<InputGroup.Prepend className="longPrepend">
						<InputGroup.Text className="longText">
							<FontAwesomeIcon icon={faHome} className="whiteIcon" />
						</InputGroup.Text>
					</InputGroup.Prepend>
					<FormControl
						placeholder="Straße"
						aria-label="Straße"
						aria-describedby="basic-addon1"
						onChange={event => { this.setState({ strasse: event.target.value }); }}
						className="darkControl"
					/>
					<FormControl
						placeholder="Nr."
						aria-label="Nr."
						aria-describedby="basic-addon1"
						onChange={event => { this.setState({ hausnr: event.target.value }); }}
						className="darkControl"
					/>
				</InputGroup>
				<InputGroup className="ml-3 mr-3 w-auto">
					<InputGroup.Prepend className="longPrepend invisiblePrepend">
						<InputGroup.Text className="longText">
							<FontAwesomeIcon icon={faMapMarkerAlt} className="whiteIcon" />
						</InputGroup.Text>
					</InputGroup.Prepend>
					<FormControl
						placeholder="PLZ"
						aria-label="PLZ"
						aria-describedby="basic-addon1"
						onChange={event => { this.setState({ plz: event.target.value }); }}
						className="darkControl"
					/>
					<FormControl
						placeholder="Ort"
						aria-label="Ort"
						aria-describedby="basic-addon1"
						onChange={event => { this.setState({ ort: event.target.value }); }}
						className="darkControl"
					/>
				</InputGroup>
				<InputGroup className="m-3 w-auto">
					<InputGroup.Prepend className="longPrepend">
						<InputGroup.Text className="longText">
							<FontAwesomeIcon icon={faEnvelope} className="whiteIcon" />
						</InputGroup.Text>
					</InputGroup.Prepend>
					<FormControl
						placeholder="E-Mail"
						aria-label="E-Mail"
						aria-describedby="basic-addon1"
						onChange={event => { this.setState({ email: event.target.value }); }}
						className="darkControl"
					/>
				</InputGroup>
				<Button className="darkButton" variant="contained" color="primary" onClick={this.sendInput}>Abschicken</Button>
			</div >
		);
	}
}

export default App;
