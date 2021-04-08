import { Component } from 'react';
import './App.css';
import axios from 'axios';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Select from 'react-select';
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
			datum: '',
			daten: ''
		};

		this.sendInput = this.sendInput.bind(this);
	}

	componentDidMount() {
		const selectOptions = [
			{ value: '0', label: '03.04.21' },
			{ value: '1', label: '10.04.21' },
			{ value: '2', label: '17.04.21' }
		];
		this.setState({ daten: selectOptions });
	}

	sendInput() {
		var userData = {
			"datum": this.state.datum,
			"vorname": this.state.vorname,
			"nachname": this.state.nachname,
			"telefonnr": this.state.telefonnr,
			"strasse": this.state.strasse,
			"hausnr": this.state.hausnr,
			"plz": this.state.plz,
			"ort": this.state.ort,
			"email": this.state.email
		}

		axios.post('http://localhost:7000/server.php', JSON.stringify(userData))
			.then(res => {
				console.log('Antwort vom Server:');
				console.log(res.data);
			})
	}

	render() {

		const customStyles = {
			option: (base, state) => ({
				...base,
				backgroundColor: state.isSelected ? "lightgreen" : "black",
				color: state.isSelected ? "black" : "white",
				border: "1px solid white"
				//borderBottom: '1px dotted pink',
				//color: state.isSelected ? 'red' : 'blue',
				//padding: 20,
			}),
			control: (base, state) => ({
				...base,
				backgroundColor: "black"
				// none of react-select's styles are passed to <Control />
				//width: 200,
			}),
			singleValue: (base, state) => ({
				...base,
				color: "white"
				//const opacity = state.isDisabled ? 0.5 : 1;
				//const transition = 'opacity 300ms';

				//return { ...provided, opacity, transition };
			})
		}

		return (
			<div className="App" >
				<PageHeader />
				<InputGroup className="m-3 w-auto">
					<InputGroup.Prepend className="longPrepend">
						<InputGroup.Text className="longText">
							<FontAwesomeIcon icon={faCalendarDay} className="whiteIcon" />
						</InputGroup.Text>
					</InputGroup.Prepend>
					<div style={{ flex: '1 1 auto' }}>
						<Select
							styles={customStyles}
							className="darkSelect"
							options={this.state.daten}
							defaultValue={{ value: '3', label: '22.11.21' }}
							onChange={selected => { this.setState({ datum: selected }) }}
						/>
					</div>
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
