import React from 'react';
import PropTypes from 'prop-types';
import './AppBarComponent.css';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AppBar from "@material-ui/core/AppBar";
import Slide from "@material-ui/core/Slide";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import {pure} from "recompose";
//import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Backdrop from "@material-ui/core/Backdrop";
import {searchUserFiles} from "../../functions/FilesFolders";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import {Folder} from "@material-ui/icons";
import {detectIcon} from "../../functions/IconDictionary";
//import {List as VirtualList} from 'react-virtualized';
import {getQueryStringParams} from "../../functions/Misc";
import Zoom from "@material-ui/core/Zoom";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: '90%',
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
    },
}));
const HideOnScroll = (props = {...props, direction: "down", appear: false}) => {
    const {children, window} = props;
    const trigger = useScrollTrigger({target: window ? window() : undefined});
    return (
        <Slide appear={props.appear} direction={props.direction} in={!trigger}>
            {children}
        </Slide>
    );
};

HideOnScroll.propTypes = {
    children: PropTypes.element.isRequired,
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

const AppBarComponent = (props) => {
    const classes = useStyles();
    const [searchRes, setSearchRes] = React.useState(null);
    const searchHelper = async (e) => searchUserFiles(e.target.value, getQueryStringParams("id").id || null).then(setSearchRes).catch(e => null).then(() => console.log("called"));
    return (
        <React.Fragment>
            <HideOnScroll style={{zIndex: "5"}}>
                <AppBar elevation={0} className={"bg-transparent"}>
                    <div className={"d-flex justify-content-center"}>
                        <Paper component="form" className={`${classes.root}  mt-3`} style={{
                            top: "50%",
                            left: "50%",
                            zIndex: "5"
                        }}>
                            <IconButton className={classes.iconButton} aria-label="menu" onClick={props.handleDrawer}>
                                <MenuIcon/>
                            </IconButton>
                            <InputBase
                                onClick={props.handleSearch}
                                onKeyUp={searchHelper}
                                className={classes.input}
                                placeholder={`Search ${props.title}` || "Search Kabeers Drive"}
                                inputProps={{'aria-label': 'search kabeers drive'}}
                            />
                            <Zoom in={false} direction={"right"}>
                                <React.Fragment>
                                    <Divider className={classes.divider} orientation="vertical"/>
                                    <IconButton className={classes.iconButton} aria-label="directions">
                                        <SearchIcon/>
                                    </IconButton>
                                </React.Fragment>
                            </Zoom>
                        </Paper>
                    </div>
                    {
                        props.currentlySearching ? (
                            <React.Fragment>
                                <br/>
                                <div className={"d-flex justify-content-center"}>
                                    <Paper className={"mt-0"}
                                           style={{
                                               width: "90vw",
                                               maxWidth: "90vw",
                                               maxHeight: "30vh",
                                               overflow: "hidden",
                                               zIndex: "5"
                                           }}>
                                        {
                                            searchRes ? (
                                                <React.Fragment>
                                                    {
                                                        searchRes.files.map((value, index) => (
                                                            <ListItem button key={index}>
                                                                <ListItemIcon>
                                                                    {detectIcon(value.item.mimeType)}
                                                                </ListItemIcon>
                                                                <ListItemText primary={`${value.item.name}`}/>
                                                            </ListItem>
                                                        ))
                                                    }
                                                    {
                                                        searchRes.folders.map((value, index) => (
                                                            <ListItem button key={index}>
                                                                <ListItemIcon>
                                                                    <Folder/>
                                                                </ListItemIcon>
                                                                <ListItemText primary={`${value.item.name}`}/>
                                                            </ListItem>
                                                        ))
                                                    }
                                                </React.Fragment>
                                            ) : null
                                        }
                                    </Paper>
                                </div>
                            </React.Fragment>
                        ) : null
                    }
                </AppBar>
            </HideOnScroll>
            <Backdrop open={props.currentlySearching} style={{zIndex: "3"}} onClick={props.handleSearch}/>
        </React.Fragment>
    );
};

AppBarComponent.propTypes = {
    title: PropTypes.string.isRequired,
};

AppBarComponent.defaultProps = {};

//export default onlyUpdateForKeys(['currentlySearching'])(pure(AppBarComponent));
export default pure(AppBarComponent);
/*
                        <IconButton type="submit" className={classes.iconButton} aria-label="search">
                            <SearchIcon/>
                        </IconButton>

            <Backdrop open={props.currentlySearching} onClick={props.handleSearch}/>
 */
