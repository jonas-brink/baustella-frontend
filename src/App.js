import React, { Component } from 'react';
import './App.css';
//import axios from 'axios';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhoneAlt, faHome, faMapMarkerAlt, faUser, faEnvelope, faCalendarDay } from '@fortawesome/free-solid-svg-icons';
import Button from '@material-ui/core/Button';
import PageHeader from './PageHeader.js';
//QRCode: MIT-license
import QRCode from "react-qr-code";
//Modal: MIT-license
import Modal from 'react-modal';
//React-PDF: MIT-license
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
//React-to-PDF: MIT-license
import ReactToPdf from "react-to-pdf";
//Import PDFDocument component
import PDFDocument from './PDFDocument.js';

const ref = React.createRef();

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
			daten: '',
			qrValue: '',
			modalIsOpen: false
		};

		this.sendInput = this.sendInput.bind(this);
		this.closeModal = this.closeModal.bind(this);

	}

	componentDidMount() {
		//set modal app element
		Modal.setAppElement('body');

		//Set render options for date select
		/*const selectOptions = [
			{ value: '0', label: '03.04.21' },
			{ value: '1', label: '10.04.21' },
			{ value: '2', label: '17.04.21' }
		];
		this.setState({ daten: selectOptions });*/
	}

	sendInput() {
		//Send data to php-Server
		/*var userData = {
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
			})*/

		this.setState({
			qrValue: this.state.vorname + ", " + this.state.nachname + ", " + this.state.telefonnr + ", " + this.state.strasse + " " + this.state.hausnr + ", " + this.state.plz + " " + this.state.ort + ", " + this.state.email,
			modalIsOpen: true
		});
	}

	closeModal() {
		this.setState({
			modalIsOpen: false
		});
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
			<div className="App">
				<PageHeader />
				{
					/*<InputGroup className="m-3 w-auto">
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
					</InputGroup>*/
				}
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
				<Modal isOpen={this.state.modalIsOpen} >
					<div style={{ textAlign: 'center' }}>
						<div ref={ref}>
							<h3 >Zugangscode:</h3>
							<QRCode
								value={this.state.qrValue}
								size={160}
							/>
						</div>

						<div>
							Bitte am Eingang einen Screenshot dieser Seite oder das heruntergeladene PDF-Dokument vorzeigen.
						</div>
						{
							// QR-Code
							/*<QRCode
								value={this.state.qrValue}
								size={90}
							/>*/
						}
						{
							// Show in PDF-Viewer
							/*<PDFViewer>
								<PDFDocument />
							</PDFViewer>*/
						}
						{
							// Download-Link zum PDF 
							/*<PDFDownloadLink document={<PDFDocument />} fileName="somename.pdf">
								{({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')}
							</PDFDownloadLink>*/
						}
						{
							//
							<ReactToPdf targetRef={ref} filename="div-blue.pdf" scale={3} x={28} y={20}>
								{({ toPdf }) => (
									<Button className="darkButton" variant="contained" color="primary" onClick={toPdf}>Download PDF</Button>
								)}
							</ReactToPdf>
						}
						<Button className="darkButton" variant="contained" color="primary" onClick={this.closeModal}>Schließen</Button>
					</div>
				</Modal>
			</div >
		);
	}
}

export default App;
