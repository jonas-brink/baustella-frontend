import React, { Component } from 'react';
import TextField from "@material-ui/core/TextField";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'


class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dates: [],
            dropDownIndex: 0,
            priceSausage: 0,
            priceMeat: 0,
            priceBaguettes: 0,
            dateExists: false
        };

        this.deleteDay = this.deleteDay.bind(this);
        this.createDate = this.createDate.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.savePrices = this.savePrices.bind(this);
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
                }, () => {
                    for (let i = 0; i < this.state.dates.length; i++) {
                        if (this.state.dates[i].date.localeCompare(this.getTodayJSON().date) === 0) {
                            this.setState({
                                dateExists: true
                            });
                        }
                    }

                    this.loadPrices();
                });
            }
        }
        xmlhttp.send();
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

    loadPrices() {
        let pS = this.state.dates.length > 0 ? parseFloat(this.state.dates[this.state.dropDownIndex].priceSausage) : 0.0;
        let pM = this.state.dates.length > 0 ? parseFloat(this.state.dates[this.state.dropDownIndex].priceMeat) : 0.0;
        let pB = this.state.dates.length > 0 ? parseFloat(this.state.dates[this.state.dropDownIndex].priceBaguettes) : 0.0;
        this.setState({
            priceSausage: pS,
            priceMeat: pM,
            priceBaguettes: pB
        });
    }


    savePrices() {
        let id = this.state.dates[this.state.dropDownIndex].ID;
        var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
        xmlhttp.open('POST', 'https://barbecueapp.000webhostapp.com/savePrices.php');
        xmlhttp.onreadystatechange = () => {
            if (xmlhttp.readyState === 4) {
                console.log('Erfolgreich gespeichert!');
                console.log(xmlhttp.response)
                alert('Erfolgreich gespeichert!');
            }
        }
        const reqData = {
            identifier: id,
            priceSausage: this.state.priceSausage,
            priceMeat: this.state.priceMeat,
            priceBaguettes: this.state.priceBaguettes
        }
        console.log('save:');
        console.log(reqData);
        xmlhttp.send(JSON.stringify(reqData));
    }

    handleSelect(event) {
        console.log('event.target.value');
        console.log(event.target.value);
        this.setState({
            dropDownIndex: parseInt(event.target.value)
        }, () => {
            this.loadPrices();
        });
    }

    deleteDay() {
        var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
        xmlhttp.open('POST', 'https://barbecueapp.000webhostapp.com/deleteDay.php');
        xmlhttp.onreadystatechange = () => {
            if (xmlhttp.readyState === 4) {
                window.location.reload(false);
            }
        }
        let delDay = {
            dateID: this.state.dates[this.state.dropDownIndex].ID
        }
        xmlhttp.send(JSON.stringify(delDay));
    }

    createDate() {
        if (!this.state.dateExists) {
            var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
            xmlhttp.open('POST', 'https://barbecueapp.000webhostapp.com/createDate.php');
            xmlhttp.onreadystatechange = () => {
                if (xmlhttp.readyState === 4) {
                    this.setState({
                        dateExists: true
                    }, () => {
                        window.location.reload(false);
                    });
                }
            }
            xmlhttp.send(JSON.stringify(this.getTodayJSON()));
        }
    }


    render() {
        return (
            <div>
                {
                    this.state.dates.length > 0
                        ?
                        <div>
                            <Form.Group controlId="formBasicSelect" style={{width: "50%", marginLeft: "auto", marginRight: "auto"}}>
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
                            <label htmlFor="priceSausage" style={{color: "white", width: "33%"}}>Preis für alle Bratwürste:</label>
                            <label htmlFor="priceMeat" style={{color: "white", width: "33%"}}>Preis für alle Fleisch:</label>
                            <label htmlFor="priceBaguettes" style={{color: "white", width: "33%"}}>Preis für alle Baguettes:</label>
                            <div style={{width: "33%", float: "left"}}>
                                <TextField
                                    id="priceSausage"
                                    type="number"
                                    value={this.state.priceSausage}
                                    variant="outlined"
                                    inputProps={{
                                        maxLength: 13,
                                        step: "0.01"
                                    }}
                                    onChange={(e) => this.setState({
                                        priceSausage: e.target.value
                                    })}
                                    style={{backgroundColor: 'white', marginLeft: "25px", marginRight: "25px"}}
                                />
                            </div>
                            <div style={{width: "33%", float: "left"}}>
                                <TextField
                                    type="number"
                                    value={this.state.priceMeat}
                                    variant="outlined"
                                    inputProps={{
                                        maxLength: 13,
                                        step: "0.01"
                                    }}
                                    onChange={(e) => this.setState({
                                        priceMeat: e.target.value
                                    })}
                                    style={{backgroundColor: 'white', marginLeft: "25px", marginRight: "25px"}}
                                />
                            </div>
                            <div style={{width: "33%", float: "left"}}>
                                <TextField
                                    type="number"
                                    value={this.state.priceBaguettes}
                                    variant="outlined"
                                    inputProps={{
                                        maxLength: 13,
                                        step: "0.01"
                                    }}
                                    onChange={(e) => this.setState({
                                        priceBaguettes: e.target.value
                                    })}
                                    style={{backgroundColor: 'white', marginLeft: "25px", marginRight: "25px"}}
                                />
                            </div>
                            <button type="button" className="btn btn-primary" style={{ width: "80%", marginTop: "50px" }} onClick={this.savePrices}>Speichern</button>
                            <hr style={{color: "white", backgroundColor: "white"}}></hr>
                            <label style={{color: "white", marginRight: "30px"}}>Tag löschen:</label>
                            <Button id="delDay" variant="danger" onClick={this.deleteDay}>Löschen</Button>
                        </div>
                        :
                        <div style={{color: "red"}}>
                            <h3>Es stehen keine Tage zur Auswahl.</h3>
                        </div>
                }
                <hr style={{color: "white", backgroundColor: "white"}}></hr>
                <div style={{ width: "100%", overflow: "hidden", float: "left" }}>
                    <button id="addBarbecue" type="button" style={{ marginTop: "20px", marginBottom: "33px", width: "40%", height: "65px" }} className={this.state.dateExists ? "btn btn-success" : "btn btn-primary"} onClick={this.createDate}>{this.state.dateExists ? "Heute wird gegrillt" : "'Heute' hinzufügen"}</button>
                </div>
            </div>
        );
    }
}

export default Admin;