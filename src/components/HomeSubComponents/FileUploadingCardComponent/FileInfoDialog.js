import React from "react";
import Slide from "@material-ui/core/Slide";
import {pure} from "recompose";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import {Close, Share} from "@material-ui/icons";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Checkbox from "@material-ui/core/Checkbox";
import PropTypes from "prop-types";

const Transition = React.forwardRef((props, ref) => <Slide direction="left" ref={ref} {...props} />);
const FileInfoDialog = (props) => {
    if (!props.file || !props.folder) return null;
    return (
        <div>
            <Dialog fullScreen open={props.open} onClose={props.handleClose} TransitionComponent={Transition}>
                <div className={"parallax"}>
                    <div className={"parallax__layer parallax__layer--back h-100"}
                         style={{top: 0}}>
                        <AppBar position={"absolute"} className={"bg-transparent"} elevation={0}>
                            <Toolbar>
                                <IconButton edge="start" color="inherit" onClick={props.handleClose} aria-label="close">
                                    <Close/>
                                </IconButton>
                            </Toolbar>
                        </AppBar>
                        <Paper elevation={0} style={{backgroundColor: "#FAFAFA"}}>
                            <React.Fragment>
                                <img alt={props.file.name} src={props.file.thumbnail}
                                     style={{width: "100%", height: "auto", backgroundColor: "#FAFAFA"}}/>
                            </React.Fragment>
                            <div
                                style={{
                                    width: "100%",
                                    height: "10rem",
                                    top: 0,
                                    backgroundImage: "linear-gradient(to bottom, rgba(0,0,0,0.65) 0%,rgba(0,0,0,0) 100%)",
                                    position: "fixed"
                                }}/>
                        </Paper>
                    </div>
                    <Paper className={"parallax__layer parallax__layer--base mt-5 h-100"} style={{top: "10rem"}}
                           elevation={0}>
                        <List>
                            <ListSubheader>
                                <Paper elevation={0}>
                                    <ListItem disableGutters>
                                        <ListItemIcon>
                                            {props.file.iconJSX}
                                        </ListItemIcon>
                                        <ListItemText>
                                            <Typography noWrap
                                                        className={"text-truncate"}>{props.file.name}</Typography>
                                        </ListItemText>
                                    </ListItem>
                                </Paper>
                            </ListSubheader>
                            <Divider/>
                            <ListItem button>
                                <ListItemIcon>
                                    <Share/>
                                </ListItemIcon>
                                <ListItemText primary={`File Shared`}
                                              secondary={`Shared Files Can be viewed by anyone who has the link`}/>
                                <ListItemSecondaryAction>
                                    <Checkbox checked={props.file.fileShared} disabled readOnly/>
                                </ListItemSecondaryAction>
                            </ListItem>
                            <Divider/>
                            <ListItem button>
                                <ListItemText primary={`Type`}/>
                                <ListItemSecondaryAction>
                                    {props.file.type} {props.file.mime}
                                </ListItemSecondaryAction>
                            </ListItem>
                            <Divider/>
                            <ListItem button>
                                <ListItemText primary={`Location`}/>
                                <ListItemSecondaryAction>
                                    {props.folder.metaData.name}
                                </ListItemSecondaryAction>
                            </ListItem>
                            <Divider/>
                            <ListItem button>
                                <ListItemText primary={`Item Id`}/>
                                <ListItemSecondaryAction>
                                    {props.file.id}
                                </ListItemSecondaryAction>
                            </ListItem>
                        </List>
                    </Paper>
                </div>
            </Dialog>
        </div>
    )
};
FileInfoDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    file: PropTypes.object.isRequired,
    folder: PropTypes.object.isRequired,
};
FileInfoDialog.defaultProps = {};
export default pure(FileInfoDialog);
