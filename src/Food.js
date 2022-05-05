import React, { Component } from 'react';
import Slider from '@mui/material/Slider';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

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

class Food extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            dateExists: false,
            cntSausages: defSausages,
            cntMeat: defMeat,
            cntBaguettes: defBaguettes,
            date: this.getTodayJSON().date
        };

        this.createDate = this.createDate.bind(this);
        this.orderFood = this.orderFood.bind(this);
    }

    getTodayJSON() {
        var date = new Date();
        var dateString;

        dateString = date.getFullYear() + '-'
            + ('0' + (date.getMonth() + 1)).slice(-2) + '-'
            + ('0' + date.getDate()).slice(-2);

        var dateJSON = {
            "date": dateString
        }

        return dateJSON;
    }

    componentDidMount() {
        var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
        xmlhttp.open('POST', 'https://barbecueapp.000webhostapp.com/countDate.php');
        xmlhttp.onreadystatechange = () => {
            if (xmlhttp.readyState === 4) {
                if (JSON.parse(xmlhttp.response).cnt > 0) {
                    this.setState({
                        dateExists: true
                    });
                } else {
                    this.setState({
                        dateExists: false
                    });
                }

            }
        }
        xmlhttp.send(JSON.stringify(this.getTodayJSON()));
    }

    createDate() {
        if (!this.state.dateExists) {
            var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
            xmlhttp.open('POST', 'https://barbecueapp.000webhostapp.com/createDate.php');
            xmlhttp.onreadystatechange = () => {
                if (xmlhttp.readyState === 4) {
                    this.setState({
                        dateExists: true
                    });
                }
            }
            xmlhttp.send(JSON.stringify(this.getTodayJSON()));
        }
    }

    //TODO: INSERT INTO NEW DATABASE TABLE IN PHP (CREATE BEFORE) !!!
    orderFood() {
        console.log(this.state);
        var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
        xmlhttp.open('POST', 'https://barbecueapp.000webhostapp.com/orderFood.php');
        xmlhttp.onreadystatechange = () => {
            if (xmlhttp.readyState === 4) {
                console.log('Order Food: ');
                console.log(xmlhttp.response);
            }
        }
        xmlhttp.send(JSON.stringify(this.state));
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

    render() {
        return (
            <div style={{ width: "100%" }}>
                <div style={{ width: "100%", overflow: "hidden" }}>
                    <button id="addBarbecue" type="button" style={{ marginTop: "20px", marginBottom: "33px" }} className={this.state.dateExists ? "btn btn-success" : "btn btn-primary"} onClick={this.createDate}>{this.state.dateExists ? "Heute wird gegrillt!" : "Heute grillen?"}</button>
                </div>
                <p className="labelFor">Name: </p>
                <InputGroup style={{ float: "right", marginRight: "10%", marginBottom: "31px", width: "60%" }}>
                    <FormControl
                        placeholder="Namen eintragen..."
                        aria-label="Namen eintragen..."
                        aria-describedby="basic-addon1"
                        onChange={event => { this.setState({ name: event.target.value }); }}
                        className="darkControl"
                    />
                </InputGroup>
                <p className="labelFor">Bratwürste: </p>
                <Slider
                    className="inputStylingFood"
                    aria-label="Bratwuerste"
                    defaultValue={defSausages}
                    valueLabelDisplay="auto"
                    min={0}
                    max={3.5}
                    step={null}
                    marks={sausageMarks}
                    onChange={(event, value) => this.handleChange(0, value)}
                />
                <p className="labelFor">Fleisch: </p>
                <Slider
                    className="inputStylingFood"
                    aria-label="Restricted values"
                    defaultValue={defMeat}
                    valueLabelDisplay="auto"
                    min={0}
                    max={3.5}
                    step={null}
                    marks={meatMarks}
                    onChange={(event, value) => this.handleChange(1, value)}
                />
                <p className="labelFor">Baguettes: </p>
                <Slider
                    className="inputStylingFood"
                    aria-label="Restricted values"
                    defaultValue={defBaguettes}
                    valueLabelDisplay="auto"
                    min={0}
                    max={2}
                    step={null}
                    marks={baguetteMarks}
                    onChange={(event, value) => this.handleChange(2, value)}
                />
                {/*<p style={{ color: "white" }}>Baguette<input type="checkbox" id="topping" name="topping" value="Baguette" style={{ marginLeft: "50px", marginTop: "20px" }} /></p>*/}
                <button id="order" type="button" className="btn btn-primary" style={{ width: "80%" }} onClick={this.orderFood}>Bestätigen</button>
            </div>
        );
    }
}

export default Food;
