import React, { Component } from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
//import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhoneAlt, faUser, faBirthdayCake, faRoad, faCity  } from '@fortawesome/free-solid-svg-icons';
import Button from '@material-ui/core/Button';

//React-to-PDF: MIT-license
import ReactToPdf from "react-to-pdf";
//QRCode: MIT-license
import QRCode from "react-qr-code";
//Modal: MIT-license
import Modal from 'react-modal';



class QRGenerator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //datum: '',
            vorname: '',
            nachname: '',
            gebdatum: '',
            telefonnr: '',
            strasse: '',
            hausnr: '',
            plz: '',
            ort: '',
            //array of options for Select-input
            //daten: [],
            //value of qr code
            qrValue: '',
            modalIsOpen: false
        };

        this.myRef = React.createRef();

        this.sendInput = this.sendInput.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    componentDidMount() {
        //set modal app element
        Modal.setAppElement('body');
    }


    validateInput() {
        var letters = /^[a-zA-Z- ßäöüÄÖÜ.]+$/;
        var numbers = /^[0-9+ /]+$/;
        var dates = /^[0-9]+.[0-9]+.[0-9]+$/;
        var hausnrString = /^[0-9 ]+[a-zA-Z ]*$/

        var correctInput = true;

        if (!this.state.vorname.match(letters)) {
            console.log('vorname wrong !x');
            correctInput = false;
        }

        if (!this.state.nachname.match(letters)) {
            console.log('nachname wrong !x');
            correctInput = false;
        }

        if (!this.state.gebdatum.match(dates)) {
            console.log('gebdatum wrong !x');
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

        return correctInput;
    }

    sendInput() {
        var validInput = this.validateInput();
        //var validInput = true;
        if (validInput) {
            var splitElem = "}";
            var qrVal = "BAU" + splitElem + this.state.vorname + splitElem + this.state.nachname + splitElem + this.state.gebdatum + splitElem + this.state.telefonnr + splitElem
                + this.state.strasse + splitElem + this.state.hausnr + splitElem + this.state.plz + splitElem + this.state.ort;
            this.setState({
                qrValue: encodeURI(qrVal),
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

    showSettings(event) {
        event.preventDefault();
    }

    render() {
        return (
            <div>
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
                            <FontAwesomeIcon icon={faBirthdayCake} className="whiteIcon" />
                        </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                        placeholder="Geburtsdatum (TT.MM.JJJJ)"
                        aria-label="Geburtsdatum (TT.MM.JJJJ)"
                        aria-describedby="basic-addon1"
                        onChange={event => { this.setState({ gebdatum: event.target.value }); }}
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
                <InputGroup className="m-3 w-auto">
                    <InputGroup.Prepend className="longPrepend">
                        <InputGroup.Text className="longText">
                            <FontAwesomeIcon icon={faRoad} className="whiteIcon" />
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
                        placeholder="Haus-Nr."
                        aria-label="Haus-Nr."
                        aria-describedby="basic-addon1"
                        onChange={event => { this.setState({ hausnr: event.target.value }); }}
                        className="darkControl"
                    />
                </InputGroup>
                <InputGroup className="m-3 w-auto">
                    <InputGroup.Prepend className="longPrepend">
                        <InputGroup.Text className="longText">
                            <FontAwesomeIcon icon={faCity} className="whiteIcon" />
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
                <Button className="darkButton" variant="contained" color="primary" onClick={this.sendInput}>Bestätigen</Button>
                <Modal isOpen={this.state.modalIsOpen} >
                    <div style={{ textAlign: 'center' }}>
                        <div className="pdfDiv" ref={this.myRef}>
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
                            <ReactToPdf targetRef={this.myRef} filename="Baustella_QR.pdf" scale={2.8} x={16} y={15}>
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

export default QRGenerator;
