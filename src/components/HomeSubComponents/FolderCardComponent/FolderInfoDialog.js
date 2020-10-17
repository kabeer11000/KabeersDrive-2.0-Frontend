import React from "react";
import Slide from "@material-ui/core/Slide";
import {pure} from "recompose";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import {Close, Folder} from "@material-ui/icons";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Checkbox from "@material-ui/core/Checkbox";
import PropTypes from "prop-types";
import TimeAgo from 'timeago-react';

const Transition = React.forwardRef((props, ref) => <Slide direction="left" ref={ref} {...props} />);
const FolderInfoDialog = (props) => {
    if (!props.folder) return null;
    return (
        <div>
            <Dialog fullScreen open={props.open} onClose={props.handleClose} TransitionComponent={Transition}>
                <div>
                    <div style={{top: 0}}>
                        <AppBar position={"absolute"} elevation={0}>
                            <Toolbar>
                                <IconButton edge="start" color="inherit" onClick={props.handleClose} aria-label="close">
                                    <Close/>
                                </IconButton>
                                <Typography variant={"h6"}>
                                    {props.folder.metaData.name}
                                </Typography>
                                <div style={{flex: "1 1 auto"}}/>
                                <IconButton>
                                    <Folder/>
                                </IconButton>
                            </Toolbar>
                        </AppBar>
                    </div>
                    <Paper style={{marginTop: "3.5rem"}} elevation={0}>
                        <List>
                            <ListItem button>
                                <ListItemText primary={`Sharing`}
                                              secondary={`Shared Folders Can be viewed by anyone who has the link`}/>
                                <ListItemSecondaryAction>
                                    <Checkbox checked={props.folder.metaData.shared} disabled readOnly/>
                                </ListItemSecondaryAction>
                            </ListItem>
                            <Divider/>
                            <ListItem button>
                                <ListItemText primary={`Type`}/>
                                <ListItemSecondaryAction>
                                    Folder
                                </ListItemSecondaryAction>
                            </ListItem>
                            <Divider/>
                            <ListItem button>
                                <ListItemText primary={`Location`}/>
                                <ListItemSecondaryAction>
                                    {props.folder.immediateParent}
                                </ListItemSecondaryAction>
                            </ListItem>
                            <Divider/>
                            <ListItem button>
                                <ListItemText primary={`Folder Id`}/>
                                <ListItemSecondaryAction>
                                    {props.folder.id}
                                </ListItemSecondaryAction>
                            </ListItem>
                            <Divider/>
                            <ListItem button>
                                <ListItemText primary={`Created`}/>
                                <ListItemSecondaryAction>
                                    <TimeAgo datetime={new Date(props.folder.created)}/>
                                </ListItemSecondaryAction>
                            </ListItem>
                            <Divider/>
                            <ListItem button>
                                <ListItemText primary={`Last Modified`}/>
                                <ListItemSecondaryAction>
                                    <TimeAgo datetime={new Date(props.folder.lastUpdated)}/>
                                </ListItemSecondaryAction>
                            </ListItem>
                        </List>
                    </Paper>
                </div>
            </Dialog>
        </div>
    )
};
FolderInfoDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    folder: PropTypes.object.isRequired,
};
FolderInfoDialog.defaultProps = {};
export default React.memo(pure(FolderInfoDialog));
