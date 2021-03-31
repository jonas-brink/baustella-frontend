import { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
	componentDidMount() {
		axios.get('http://localhost:7000/server.php')
			.then(res => {
				console.log(res.data)
			})
	}

	render() {
		return (
			<div className="App" >
				Learn React
			</div>
		);
	}
}

export default App;
