import { Component } from 'react';
import './PageHeader.css';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";


class PageHeader extends Component {


    render() {
        return (
            <AppBar className="darkAppBar" position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        className="menuButton"
                        color="inherit"
                        aria-label="menu"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className="headerText">
                        Baustella
                    </Typography>
                </Toolbar>
            </AppBar>
        );
    }
}

export default PageHeader;
