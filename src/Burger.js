import { slide as Menu } from 'react-burger-menu';
import { Component } from 'react';
import './Burger.css';
import { Link } from 'react-router-dom';

class Burger extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuOpen: false
        }

        this.handleStateChange = this.handleStateChange.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
    }

    handleStateChange(state) {
        this.setState({ menuOpen: state.isOpen });
    }

    closeMenu() {
        this.setState({ menuOpen: false });
    }

    render() {
        return (
            <Menu
                isOpen={this.state.menuOpen}
                onStateChange={(state) => this.handleStateChange(state)}
            >
                <Link className="menu-item" to="/" onClick={this.closeMenu}>QR-Code</Link>
                <Link className="menu-item" to="/food" onClick={this.closeMenu}>Grillen</Link>
            </Menu>
        );
    }
}

export default Burger;

