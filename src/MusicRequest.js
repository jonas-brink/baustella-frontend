import React, { Component } from 'react';
//import Slider from '@mui/material/Slider';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
//import Form from 'react-bootstrap/Form';
import Modal from 'react-modal';
//import './Food.css';

class MusicRequest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchString: '',
            token: null,
            tracks: []
        };

        this.searchTrack = this.searchTrack.bind(this);
    }

    componentDidMount() {
        //Get authorization token from Spotify
        var client_id = '06c00ce4e0fb4633a4388ab964378cdb';
        var client_secret = '720a151d42f541c4978e4659fe4f8701';

        var request = new XMLHttpRequest();
        var url = 'https://accounts.spotify.com/api/token';
        request.open('POST', url, true);

        //Send the proper header information along with the request
        request.setRequestHeader('Authorization', 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')));
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        request.onreadystatechange = function () {//Call a function when the state changes.
            if (request.readyState === 4 && request.status === 200) {
                var response_json = JSON.parse(request.response);
                var temp_token = response_json.token_type + ' ' + response_json.access_token;
                this.setState({
                    token: temp_token
                });
            }
        }.bind(this);
        request.send('grant_type=client_credentials');
    }

    searchTrack() {
        //alert(this.state.searchString);
        if (this.state.searchString.trim() !== '') {
            if (this.state.token !== null) {
                var url = 'https://api.spotify.com/v1/search?type=track%2Cartist&limit=5&q=' + encodeURIComponent(this.state.searchString);
                var request = new XMLHttpRequest();   // new HttpRequest instance
                request.open('GET', url);

                request.setRequestHeader('Authorization', this.state.token);

                request.onreadystatechange = function () {
                    if (request.readyState === 4 && request.status === 200) {
                        console.log('Request Spotify:');
                        var response_json = JSON.parse(request.response);
                        var temp_tracks = response_json.tracks.items;
                        temp_tracks.sort(function (a, b) {
                            return a.popularity < b.popularity;
                        });
                        /*var temp_artists = response_json.artists.items;
                        temp_artists.sort(function (a, b) {
                            return a.popularity < b.popularity;
                        });*/
                        console.log(temp_tracks);
                        this.setState({
                            tracks: temp_tracks
                        });
                    }
                }.bind(this);

                request.send();
            } else {
                alert('Bitte die Seite neu laden!');
            }
        } else {
            alert('Bitte einen Song oder Künstler eingeben.');
        }
    }

    render() {
        return (
            <div style={{ width: "100%" }}>
                <InputGroup style={{ float: "right", marginRight: "10%", marginBottom: "20px", width: "80%" }}>
                    <FormControl
                        placeholder="Song oder Künstler suchen..."
                        aria-label="Song oder Künstler suchen..."
                        aria-describedby="basic-addon1"
                        value={this.state.searchString}
                        onChange={event => { this.setState({ searchString: event.target.value }); }}
                        className="darkControl"
                    />
                </InputGroup>
                <button id="order" type="button" className="btn btn-primary" style={{ width: "80%", marginTop: "15px", height: "45px" }} onClick={this.searchTrack}>Suchen</button>
                {
                    this.state.tracks.map((track) => (
                        <div key={track.id} style={{ color: 'white' }}>
                            {track.name} -
                            {track.artists.map((artist) => (
                                <span>{artist.name}</span>
                            ))}
                        </div>
                    ))
                }
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
                    <div style={{ textAlign: 'center', marginBottom: "30px" }}>
                        <h4 style={{ color: "green" }}>Bestellung erfolgreich aufgegeben !</h4>
                    </div>
                    <button type="button" className="btn btn-primary closeBtn" stlye={{ float: "right" }} onClick={this.closeModal}>Schließen</button>
                </Modal>
            </div>
        );
    }
}

export default MusicRequest;