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
import ShoppingList from './ShoppingList';
import Admin from './Admin';
import MusicRequest from './MusicRequest';



class App extends Component {
	render() {
		return (
			<Router>
				<div className="App">
					<PageHeader />
					<Switch>
						<Route path="/musicrequest">
							<MusicRequest />
						</Route>
						<Route path="/admin">
							<Admin />
						</Route>
						<Route path="/shoppinglist">
							<ShoppingList />
						</Route>
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
