import React, { Component } from 'react';
import FormControl from 'react-bootstrap/FormControl';
import Button from '@material-ui/core/Button';
import axios from 'axios';


class Music extends Component {
    constructor(props) {
        super(props);
        this.state = {
            interpret: "",
            titel: "",
            sender: ""
        };

        this.sendMusic = this.sendMusic.bind(this);
    }

    sendMusic() {
        if (this.state.interpret !== "" && this.state.titel !== "") {
            axios.get('https://api.ipify.org?format=json')
                .then(response => {
                    alert(response.data.ip);
                    this.setState({
                        sender: response.data.ip
                    }, () => {
                        var record = {
                            "interpret": this.state.interpret,
                            "titel": this.state.titel,
                            "sender": this.state.sender
                        };
                        alert('Kurz nach record');
                        axios.post('http://jonbrink.bplaced.net/test.php', record)
                            .then(() => {
                                alert('Ready');
                            });
                    });
                });
        } else {
            alert("WRONG");
        }
    }

    render() {
        return (
            <div>
                <FormControl
                    placeholder="Interpret"
                    aria-label="Interpret"
                    aria-describedby="basic-addon1"
                    onChange={event => { this.setState({ interpret: event.target.value }); }}
                    className="darkControl"
                />
                <FormControl
                    placeholder="Titel"
                    aria-label="Titel"
                    aria-describedby="basic-addon1"
                    onChange={event => { this.setState({ titel: event.target.value }); }}
                    className="darkControl"
                />
                <Button className="darkButton" variant="contained" color="primary" onClick={this.sendMusic}>Absenden</Button>
            </div>
        );
    }
}

export default Music;
