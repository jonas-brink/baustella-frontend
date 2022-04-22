import React, { Component } from 'react';
//import axios from 'axios';
import myOrders from './orders.json';
import Select from 'react-select';

class Food extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selOrder: 0
        };
        this.record = {};
        this.activeOrders = {};

        //this.sendMusic = this.sendMusic.bind(this);
        this.loadActiveOrders = this.loadActiveOrders.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.loadActiveOrders();
    }

    /*sendMusic() {
        if (this.state.interpret !== "" && this.state.titel !== "") {
            axios.get('https://api.ipify.org?format=json')
                .then(response => {
                    alert(response.data.ip);
                    this.setState({
                        sender: response.data.ip
                    }, () => {
                        this.record = {
                            "interpret": this.state.interpret,
                            "titel": this.state.titel,
                            "sender": this.state.sender
                        };
                        alert('Kurz nach record');
                        axios.post('http://jonbrink.bplaced.net/test.php', this.record)
                            .then(() => {
                                alert('Ready');
                            });
                    });
                });
        } else {
            alert("WRONG");
        }
    }*/

    loadActiveOrders() {
        this.setState({
            activeOrders: myOrders.orders
        }, () => {
            console.log(this.state.activeOrders);
        });
    }

    handleChange(e) {
        this.setState({
            selOrder: e.value
        });
    }

    render() {
        return (
            <div>
                {
                    this.state.activeOrders ?
                        <div>
                            <Select 
                                options={this.state.activeOrders}
                                isSearchable={false}
                                placeholder={"Datum wählen ..."}
                            />
                            <p style={{color: "white"}}>Baguette<input type="checkbox" id="topping" name="topping" value="Baguette" style={{marginLeft: "50px", marginTop: "20px"}}/></p>
                        </div>
                        :
                        null
                }
            </div>
        );
    }
}

export default Food;
