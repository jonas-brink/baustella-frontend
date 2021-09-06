import { Component } from 'react';
import './PageHeader.css';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
//sidebar menu
import Burger from './Burger';



class PageHeader extends Component {


    render() {
        return (
            <AppBar className="darkAppBar" position="static">
                <Burger />
                <Toolbar>
                    <Typography variant="h6" className="headerText">
                        Baustella
                    </Typography>
                </Toolbar>
            </AppBar>
        );
    }
}

export default PageHeader;
