import React, { Component } from 'react';
import './App.css';
//import axios from 'axios';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
//import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhoneAlt, faHome, faMapMarkerAlt, faUser, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import Button from '@material-ui/core/Button';
import PageHeader from './PageHeader.js';
//QRCode: MIT-license
import QRCode from "react-qr-code";
//Modal: MIT-license
import Modal from 'react-modal';
//React-PDF: MIT-license
//import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
//React-to-PDF: MIT-license
import ReactToPdf from "react-to-pdf";
//Import PDFDocument component
//import PDFDocument from './PDFDocument.js';

const ref = React.createRef();

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			//datum: '',
			vorname: '',
			nachname: '',
			telefonnr: '',
			strasse: '',
			hausnr: '',
			plz: '',
			ort: '',
			email: '',
			//array of options for Select-input
			//daten: [],
			//value of qr code
			qrValue: '',
			modalIsOpen: false
		};

		this.sendInput = this.sendInput.bind(this);
		this.closeModal = this.closeModal.bind(this);

	}

	componentDidMount() {
		//set modal app element
		Modal.setAppElement('body');

		/*var today = new Date(Date.now());
		var day = today.getDate();
		var month = (today.getMonth() + 1);
		var year = today.getFullYear();

		//Set render options for date select
		const selectOptions = [
			{ value: 0, label: day + '.' + month + '.' + year },
			{ value: 1, label: (day + 1) + '.' + month + '.' + year },
			{ value: 2, label: (day + 2) + '.' + month + '.' + year }
		];
		this.setState({ daten: selectOptions });*/
	}

	validateInput() {
		var letters = /^[a-zA-Z]+$/;
		var numbers = /^[0-9]+$/;
		var hausnrString = /^[0-9]+[a-zA-Z]?$/
		//var emailString = /^[a-zA-Z@._]+$/;

		var correctInput = true;

		if (!this.state.vorname.match(letters)) {
			console.log('vorname wrong !x');
			correctInput = false;
		}

		if (!this.state.nachname.match(letters)) {
			console.log('nachname wrong !x');
			correctInput = false;
		}

		if (!this.state.telefonnr.match(numbers)) {
			console.log('telefonnr wrong !x');
			correctInput = false;
		}

		if (!this.state.strasse.match(letters)) {
			console.log('strasse wrong !x');
			correctInput = false;
		}

		if (!this.state.hausnr.match(hausnrString)) {
			console.log('hausnr wrong !x');
			correctInput = false;
		}

		if (!this.state.plz.match(numbers)) {
			console.log('plz wrong !x');
			correctInput = false;
		}

		if (!this.state.ort.match(letters)) {
			console.log('ort wrong !x');
			correctInput = false;
		}

		/*if (!this.state.email.match(emailString)) {
			console.log('email wrong !x');
			correctInput = false;
		}*/
		console.log('.....................')
		return correctInput;
	}

	sendInput() {
		//var validInput = this.validateInput();
		var validInput = true;
		if (validInput) {
			var splitElem = "}";
			this.setState({
				qrValue: "BAU" + splitElem + this.state.vorname + splitElem + this.state.nachname + splitElem + this.state.telefonnr + splitElem
					+ this.state.strasse + splitElem + this.state.hausnr + splitElem + this.state.plz + splitElem + this.state.ort + splitElem + this.state.email,
				modalIsOpen: true
			});
		} else {
			alert('Bitte korrekte Angaben machen !');
		}

	}

	closeModal() {
		this.setState({
			modalIsOpen: false
		});
	}

	render() {
		//Style date select
		/*const customStyles = {
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
		}*/

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
								placeholder="Datum der Feier"
								onChange={selected => { this.setState({ datum: selected.label }) }}
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
						placeholder="E-Mail (optional)"
						aria-label="E-Mail (optional)"
						aria-describedby="basic-addon1"
						onChange={event => { this.setState({ email: event.target.value }); }}
						className="darkControl"
					/>
				</InputGroup>
				<Button className="darkButton" variant="contained" color="primary" onClick={this.sendInput}>Bestätigen</Button>
				<Modal isOpen={this.state.modalIsOpen} >
					<div style={{ textAlign: 'center' }}>
						<div className="pdfDiv" ref={ref}>
							<h3 >Zugangscode:</h3>
							<div>
								<QRCode
									value={this.state.qrValue}
									size={240}
								/>
							</div>
						</div>

						<div className="qrInfoDiv">
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
							<ReactToPdf targetRef={ref} filename="div-blue.pdf" scale={2.8} x={16} y={15}>
								{({ toPdf }) => (
									<Button className="darkButton" variant="contained" color="primary" onClick={toPdf}>PDF anzeigen</Button>
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
