import React, {memo} from 'react';
import PropTypes from 'prop-types';
import './FileCardComponent.css';
import Grid from "@material-ui/core/Grid";
import {pure} from "recompose";
import FileCardComponent from "./FileCardElement";
import FileInfoDialog from "./FileInfoDialog";
import Drawer from "@material-ui/core/Drawer";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import {Link} from "react-router-dom";
import {Close, Create, Delete, GetApp, Info, OpenInNew, ScreenShare} from "@material-ui/icons";
import {downloadFile} from "../../../functions/Misc";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import {useDialog} from "muibox";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grow from "@material-ui/core/Grow";
import {deleteManyFiles, fileDeleteOne} from "../../../functions/FilesFolders";

const useStyles = makeStyles((theme) => ({
    text: {
        padding: theme.spacing(2, 2, 0),
    },
    paper: {
        paddingBottom: 50,
    },
    list: {
        marginBottom: theme.spacing(2),
    },
    subheader: {
        backgroundColor: theme.palette.background.paper,
    },
    appBar: {
        //top: 'auto',
        //bottom: 0,
    },
    grow: {
        flexGrow: 1,
    },
    fabButton: {
        position: 'absolute',
        zIndex: 1,
        top: -30,
        left: 0,
        right: 0,
        margin: '0 auto',
    },
}));
const FilesComponent = (props) => {
    const [fileInfo, setFileInfo] = React.useState(null);
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const [fileDetailsDialog, setFileDetailsDialog] = React.useState(false);
    const [currentlySelecting, setCurrentlySelecting] = React.useState({
        files: [], highlight: false
    });
    const classes = useStyles();
    const setCurrentFileInfo = (file) => {
        setDrawerOpen(true);
        setFileInfo(file);
    };
    const mainDialog = useDialog();
    const handleDrawerClose = () => {
        setDrawerOpen(false);
    };
    return (
        <div>
            {
                props.recent ? (
                    <React.Fragment>
                        {
                            props.folder.files ? props.folder.files.map((file, index) => (
                                <FileCardComponent
                                    key={index}
                                    setCurrentlySelecting={(highlight, files) => {
                                        setCurrentlySelecting({highlight: highlight, files: [...files]});
                                    }}
                                    selecting={currentlySelecting}
                                    setFileInfo={setCurrentFileInfo}
                                    item={file} recent={props.recent || false}/>
                            )) : null
                        }
                    </React.Fragment>
                ) : (
                    <Grid container
                          direction="row"
                          alignItems="flex-start">
                        {
                            props.folder.files ? props.folder.files.map((file, index) => (
                                    <Grid sm={3} md={3} xs={6} item key={index}>
                                        <FileCardComponent
                                            setCurrentlySelecting={(highlight, files) => {
                                                setCurrentlySelecting({highlight: highlight, files: [...files]});
                                            }}
                                            selecting={currentlySelecting}
                                            setFileInfo={setCurrentFileInfo}
                                            item={file} recent={props.recent || false}/>
                                    </Grid>
                                )
                            ) : null
                        }
                    </Grid>
                )
            }
            {fileInfo ? (
                <React.Fragment>
                    <FileInfoDialog open={fileDetailsDialog} handleClose={() => setFileDetailsDialog(false)}
                                    file={fileInfo}
                                    folder={props.folder}/>
                </React.Fragment>
            ) : null}
            <Drawer
                variant="temporary"
                anchor={"bottom"}
                onClose={handleDrawerClose}
                ModalProps={{keepMounted: true}}
                open={drawerOpen}
                onClick={handleDrawerClose}
            >
                {
                    !fileInfo ? null : (
                        <React.Fragment>
                            <ListItem>
                                <ListItemIcon>{fileInfo.iconJSX}</ListItemIcon>
                                <ListItemText>
                                    <Typography className={"text-truncate"} noWrap>{fileInfo.name}</Typography>
                                </ListItemText>
                            </ListItem>
                            <Divider/>
                            <List>
                                <ListItem button component={Link} to={`/view/${fileInfo.id}`}>
                                    <ListItemIcon><OpenInNew/></ListItemIcon>
                                    <ListItemText primary={"View"}/>
                                </ListItem>
                                <ListItem button onClick={() => downloadFile(fileInfo)}>
                                    <ListItemIcon><GetApp/></ListItemIcon>
                                    <ListItemText primary={"Download"}/>
                                </ListItem>
                                <ListItem hidden={props.folder.owner !== window.user.user_id} button
                                          onClick={() => mainDialog.confirm({
                                              title: <Typography noWrap className={"text-truncate"}>Confirm
                                                  Deleting {fileInfo.name}</Typography>,
                                              message: ` This Action cannot be reverted`
                                          })
                                              .then(async () => {
                                                  props.handleFileDelete(fileInfo.id);
                                                  await fileDeleteOne(fileInfo.id);
                                              })}>
                                    <ListItemIcon>
                                        <Delete/>
                                    </ListItemIcon>
                                    <ListItemText primary={"Delete"}/>
                                </ListItem>
                                <Divider variant={"inset"}/>
                                <ListItem button onClick={() => setFileDetailsDialog(true)}>
                                    <ListItemIcon><Info/></ListItemIcon>
                                    <ListItemText primary={"Details and Activity"}/>
                                </ListItem>
                                <ListItem hidden={props.folder.owner !== window.user.user_id} button
                                          onClick={() => props.handleFileDelete(fileInfo.id)}>
                                    <ListItemIcon><Create/></ListItemIcon>
                                    <ListItemText primary={"Rename"}/>
                                </ListItem>
                                <ListItem hidden={props.folder.owner !== window.user.user_id} button
                                          onClick={() => props.handleFileDelete(fileInfo.id)}>
                                    <ListItemIcon><Create/></ListItemIcon>
                                    <ListItemText primary={"Rename"}/>
                                </ListItem>
                                <Divider variant={"inset"}/>
                                <ListItem button disabled={props.folder.owner !== window.user.user_id}>
                                    <ListItemIcon><ScreenShare/></ListItemIcon>
                                    <ListItemText primary={"Link Sharing"}/>
                                    <ListItemIcon>
                                        <FormControlLabel
                                            control={<Switch defaultChecked={fileInfo.fileShared}/>}
                                            label={""}/>
                                    </ListItemIcon>
                                </ListItem>
                            </List>
                        </React.Fragment>
                    )
                }
            </Drawer>
            <Grow in={currentlySelecting.highlight}>
                <AppBar position="fixed" color="primary" style={{
                    top: 0
                }}>
                    <Toolbar>
                        <IconButton onClick={() => setCurrentlySelecting({
                            highlight: false,
                            files: [],
                        })} edge="start" color="inherit" aria-label="open drawer">
                            <Close/>
                        </IconButton>
                        <Typography variant={"h6"}>
                            {currentlySelecting.files.length} selected
                        </Typography>
                        <div className={classes.grow}/>
                        <IconButton onClick={() => currentlySelecting.files.length ? mainDialog.confirm({
                            title: <Typography noWrap className={"text-truncate"}>
                                Confirm Deleting {currentlySelecting.files.length} files
                                from {props.folder.metaData.name}</Typography>,
                            message: ` This Action cannot be reverted`
                        })
                            .then(() => deleteManyFiles(currentlySelecting.files.map(file => file.id))
                                .then(() => (props.handleBulkFileDelete(props.folder.files.filter(file => currentlySelecting.files.findIndex(f => f.id === file.id))), setCurrentlySelecting({
                                    dialog: false,
                                    files: []
                                })))) : null}>
                            <Delete/>
                        </IconButton>
                    </Toolbar>
                </AppBar>
            </Grow>
        </div>
    );
};
FilesComponent.propTypes = {
    folder: PropTypes.object.isRequired,
    recent: PropTypes.bool
};
FilesComponent.defaultProps = {};
export default memo(pure(FilesComponent));
