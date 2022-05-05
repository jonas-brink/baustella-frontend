import React, { Component } from 'react';
import Slider from '@mui/material/Slider';


const sausageMarks = [
    { value: 0, label: '0' },
    { value: 0.5, label: '0,5' },
    { value: 1, label: '1' },
    { value: 1.5, label: '1,5' },
    { value: 2, label: '2' },
    { value: 2.5, label: '2' },
    { value: 3, label: '3' },
    { value: 3.5, label: '3,5' }
];

class Food extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dateExists: false
        };

        this.createDate = this.createDate.bind(this);
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

    render() {
        return (
            <div>
                <Slider
                    aria-label="Restricted values"
                    defaultValue={2}
                    valueLabelDisplay="auto"
                    min={0}
                    max={3.5}
                    step={null}
                    marks={sausageMarks}
                />
                <p style={{ color: "white" }}>Baguette<input type="checkbox" id="topping" name="topping" value="Baguette" style={{ marginLeft: "50px", marginTop: "20px" }} /></p>
                <button id="addBarbecue" type="button" className={this.state.dateExists ? "btn btn-success" : "btn btn-primary"} onClick={this.createDate}>{this.state.dateExists ? "Heute wird gegrillt!" : "Heute grillen?"}</button>
            </div>
        );
    }
}

export default Food;
