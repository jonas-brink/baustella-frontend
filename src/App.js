import React, { Component } from 'react';
import './App.css';
//import axios from 'axios';
import PageHeader from './PageHeader.js';
import Food from './Food';
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
						<Route path="/food">
							<Food />
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
