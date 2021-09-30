import React, { Component } from 'react';
import './App.css';
//import axios from 'axios';
import PageHeader from './PageHeader.js';
import Music from './Music';
import QRGenerator from './QRGenerator';
import {
	BrowserRouter as Router,
	Switch,
	Route
} from 'react-router-dom';



class App extends Component {
	render() {
		return (
			<Router>
				<div className="App">
					<PageHeader />
					<Switch>
						<Route path="/music">
							<Music />
						</Route>
						<Route path="/">
							<QRGenerator />
						</Route>
					</Switch>
				</div >
			</Router>
		);
	}
}

export default App;
