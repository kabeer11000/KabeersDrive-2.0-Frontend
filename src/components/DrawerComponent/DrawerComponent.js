import React from 'react';
import PropTypes from 'prop-types';
import './DrawerComponent.css';
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import {pure} from "recompose";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import {AccountCircle, Favorite, GetApp, History, Home, Settings} from "@material-ui/icons";
import {Link} from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import makeStyles from "@material-ui/core/styles/makeStyles";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawer: {
        [theme.breakpoints.up("xs")]: {
            width: drawerWidth + 50,
            flexShrink: 0,
        },
        [theme.breakpoints.up("md")]: {
            width: drawerWidth + 100,
            flexShrink: 0,
        },
        [theme.breakpoints.up("xl")]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
}));
const DrawerComponent = (props) => {
    const classes = useStyles();
    const userData = {};
    return (
        <React.Fragment>
            <SwipeableDrawer
                classes={{
                    paper: classes.drawerPaper,
                }}
                anchor={"left"}
                open={props.drawerOpen}
                onClose={props.handleDrawer}
                onOpen={() => {
                }}
                ModalProps={{
                    keepMounted: true,
                }}>
                <div>
                    <List className={classes.root}>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar src={userData.account_image} alt={userData.username}/>
                            </ListItemAvatar>
                            <ListItemText className={"text-truncate"} primary={userData.username}
                                          secondary={userData.email}/>
                        </ListItem>
                    </List>
                    <div className={"classes.toolbar"}/>
                    <Divider/>
                    <List onClick={props.handleDrawer}>
                        <ListItem button component={Link} to={"/home"}>
                            <ListItemIcon><Home/></ListItemIcon>
                            <ListItemText primary={"Home"}/>
                        </ListItem>
                        <ListItem button component={Link} to={"/downloads"}>
                            <ListItemIcon><GetApp/></ListItemIcon>
                            <ListItemText primary={"Downloads"}/>
                        </ListItem>
                        <ListItem button component={Link} to={"/history"}>
                            <ListItemIcon><History/></ListItemIcon>
                            <ListItemText primary={"History"}/>
                        </ListItem>
                        <ListItem button component={Link} to={"/liked"}>
                            <ListItemIcon><Favorite/></ListItemIcon>
                            <ListItemText primary={"Liked"}/>
                        </ListItem>
                        <Divider/>
                        <ListItem button component={Link} to={"/settings"}>
                            <ListItemIcon><Settings/></ListItemIcon>
                            <ListItemText primary={"Settings"}/>
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon><AccountCircle/></ListItemIcon>
                            <ListItemText primary={"Account"}/>
                        </ListItem>
                    </List>
                    <List>
                        <Divider/>
                        <ListItem button>
                            <Typography muted small>
                                <div className={"text-muted small"}>&copy; {new Date().getFullYear()} Kabeers Network
                                </div>
                            </Typography>
                        </ListItem>
                    </List>
                </div>
            </SwipeableDrawer>
            <main>
                {props.children}
            </main>
        </React.Fragment>
    );
};

DrawerComponent.propTypes = {
    drawerOpen: PropTypes.bool.isRequired,
    handleDrawer: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired,
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

DrawerComponent.defaultProps = {};

export default pure(DrawerComponent);
