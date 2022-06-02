import React, { Component } from 'react';
import Slider from '@mui/material/Slider';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Form from 'react-bootstrap/Form';
import Modal from 'react-modal';
import './Food.css';

const sausageMarks = [
    { value: 0, label: '0' },
    { value: 0.5, label: '0,5' },
    { value: 1, label: '1' },
    { value: 1.5, label: '1,5' },
    { value: 2, label: '2' },
    { value: 2.5, label: '2,5' },
    { value: 3, label: '3' },
    { value: 3.5, label: '3,5' }
];

const meatMarks = [
    { value: 0, label: '0' },
    { value: 0.5, label: '0,5' },
    { value: 1, label: '1' },
    { value: 1.5, label: '1,5' },
    { value: 2, label: '2' },
    { value: 2.5, label: '2,5' },
    { value: 3, label: '3' },
    { value: 3.5, label: '3,5' }
];

const baguetteMarks = [
    { value: 0, label: '0' },
    { value: 0.5, label: '0,5' },
    { value: 1, label: '1' },
    { value: 1.5, label: '1,5' },
    { value: 2, label: '2' }
];

const defSausages = 2;
const defMeat = 1;
const defBaguettes = 1;


//TODO: fix all sites for mobile
//TODO: fix table for mobile
//TODO: fix labels on bestellung for mobile

//TODO: Einzelne Bestellungen löschen können
class Food extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            cntSausages: defSausages,
            cntMeat: defMeat,
            cntBaguettes: defBaguettes,
            dates: [],
            dropDownIndex: 0,
            showModal: false
        };

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.orderFood = this.orderFood.bind(this);
    }

    componentDidMount() {
        var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
        xmlhttp.open('GET', 'https://barbecueapp.000webhostapp.com/getDates.php');
        xmlhttp.onreadystatechange = () => {
            if (xmlhttp.readyState === 4) {
                console.log('response: ');
                const datesResponse = JSON.parse(xmlhttp.response);
                console.log(datesResponse);
                this.setState({
                    dates: datesResponse
                });
            }
        }
        xmlhttp.send();
    }

    orderFood() {
        let order = {
            name: this.state.name,
            cntSausages: this.state.cntSausages,
            cntMeat: this.state.cntMeat,
            cntBaguettes: this.state.cntBaguettes,
            currDateID: this.state.dates[this.state.dropDownIndex].ID
        };
        console.log(order);
        if (this.state.name.trim() !== '') {
            var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
            xmlhttp.open('POST', 'https://barbecueapp.000webhostapp.com/orderFood.php');
            xmlhttp.onreadystatechange = () => {
                if (xmlhttp.readyState === 4) {
                    console.log('Order Food: ');
                    console.log(xmlhttp.response);
                    
                    this.setState({
                        name: '',
                        cntSausages: defSausages,
                        cntMeat: defMeat,
                        cntBaguettes: defBaguettes
                    }, () => {
                        this.openModal();
                    });
                }
            }
            xmlhttp.send(JSON.stringify(order));
        } else {
            console.log("No name specified");
        }
    }

    handleChange(sliderNum, value) {
        if (sliderNum === 0) {
            this.setState({
                cntSausages: value
            });
        } else if (sliderNum === 1) {
            this.setState({
                cntMeat: value
            });
        } else if (sliderNum === 2) {
            this.setState({
                cntBaguettes: value
            });
        }
    }

    handleSelect(event) {
        this.setState({
            dropDownIndex: event.target.value
        });
    }

    openModal() {
        this.setState({
            showModal: true
        });
    }

    closeModal() {
        this.setState({
            showModal: false
        });
    }

    render() {
        return (
            <div style={{ width: "100%" }}>
                {
                    this.state.dates.length > 0
                        ?
                        <div>
                            <div style={{width: "100%", overflow: "hidden"}}>
                                <div style={{width: "80%", marginLeft: "auto", marginRight: "auto", overflow: "hidden"}}>
                                    <Form.Group controlId="formBasicSelect" style={{width: "100%", float: "left", marginTop: "20px", marginBottom: "33px"}}>
                                        <Form.Label style={{color: "white"}}>Tag auswählen:</Form.Label>
                                        <Form.Control
                                            as="select"
                                            value={this.state.dropDownIndex}
                                            onChange={this.handleSelect}
                                            style={{backgroundColor: "black", color: "white"}}
                                        >
                                        {
                                            this.state.dates.map(function(day, i) {
                                                let formDay = day.date.split('-');
                                                let fDay = formDay[2] + '.' + formDay[1] + '.' + formDay[0];        
                                                return <option key={day.ID} value={i}>{fDay}</option>;
                                            })
                                        }
                                        </Form.Control>
                                    </Form.Group>
                                </div>
                            </div>
                            
                            <InputGroup style={{ float: "right", marginRight: "10%", marginBottom: "20px", width: "80%" }}>
                                <FormControl
                                    placeholder="Namen eintragen..."
                                    aria-label="Namen eintragen..."
                                    aria-describedby="basic-addon1"
                                    value={this.state.name}
                                    onChange={event => { this.setState({ name: event.target.value.trim() }); }}
                                    className="darkControl"
                                />
                            </InputGroup>
                            <p className="labelFor">Bratwürste: </p>
                            <Slider
                                className="inputStylingFood"
                                aria-label="Bratwuerste"
                                valueLabelDisplay="auto"
                                min={0}
                                max={3.5}
                                step={null}
                                marks={sausageMarks}
                                value={this.state.cntSausages}
                                onChange={(event, value) => this.handleChange(0, value)}
                            />
                            <p className="labelFor">Fleisch: </p>
                            <Slider
                                className="inputStylingFood"
                                aria-label="Restricted values"
                                valueLabelDisplay="auto"
                                min={0}
                                max={3.5}
                                step={null}
                                marks={meatMarks}
                                value={this.state.cntMeat}
                                onChange={(event, value) => this.handleChange(1, value)}
                            />
                            <p className="labelFor">Baguettes: </p>
                            <Slider
                                className="inputStylingFood"
                                aria-label="Restricted values"
                                valueLabelDisplay="auto"
                                min={0}
                                max={2}
                                step={null}
                                marks={baguetteMarks}
                                value={this.state.cntBaguettes}
                                onChange={(event, value) => this.handleChange(2, value)}
                            />
                            <button id="order" type="button" className="btn btn-primary" style={{ width: "80%", marginTop: "20px" }} onClick={this.orderFood}>Abschicken</button>
        
                            <Modal 
                                isOpen={this.state.showModal}
                                style={{
                                    content: {
                                      top: '50%',
                                      left: '50%',
                                      right: 'auto',
                                      bottom: 'auto',
                                      marginLeft: "50px",
                                      marginRight: "auto",
                                      transform: 'translate(-50%, -50%)',
                                    },
                                  }}
                                className={"Modal"}
                                overlayClassName={"Overlay"}
                                onRequestClose={this.closeModal}
                                ariaHideApp={false}
                            >
                                <div style={{ textAlign: 'center', marginBottom: "15px" }}>
                                    <h4 style={{color: "green"}}>Bestellung erfolgreich aufgegeben !</h4>
                                    Du kannst dieses Fenster jetzt schließen.
                                </div>
                                <button type="button" className="btn btn-primary closeBtn" stlye={{float: "right"}} onClick={this.closeModal}>Schließen</button>
                            </Modal>
                        </div>
                        :
                        <div style={{color: "red"}}>
                            <h3>Es stehen keine Tage zur Auswahl.</h3>
                        </div>
                }
            </div>
        );
    }
}

export default Food;