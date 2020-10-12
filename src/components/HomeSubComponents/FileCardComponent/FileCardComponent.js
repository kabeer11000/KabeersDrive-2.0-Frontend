import React from 'react';
import PropTypes from 'prop-types';
import './FileCardComponent.css';
import Grid from "@material-ui/core/Grid";
import {changeFileLinkSharing} from "../../../functions/FilesFolders";
import {downloadFile} from "../../../functions/Misc";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import Card from "@material-ui/core/Card";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {Close, Create, Delete, GetApp, Info, MoreVert, OpenInNew, ScreenShare, Share} from "@material-ui/icons";
import {detectIcon, detectMime} from "../../../functions/IconDictionary";
import {pure} from "recompose";
//                    <Skeleton variant="rect" width={210} height={118} />
// <div style={{zIndex: 2, backgroundImage: "linear-gradient(to bottom, transparent, rgba(0,0,0,0.25))", minWidth: 210, width: 210, height: 118}} className={"rounded"}/>
//
//import {BottomSheet} from 'mui-bottom-sheet';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import {Hidden} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import {Link} from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Checkbox from "@material-ui/core/Checkbox";
import ListSubheader from "@material-ui/core/ListSubheader";
//import {sortable} from "react-sortable";
// style={{height: "8.325rem", width: "8.325rem"}}
const Transition = React.forwardRef((props, ref) => <Slide direction="left" ref={ref} {...props} />);
const FileInfoDialog = pure((props) => {
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
});
FileInfoDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    file: PropTypes.object.isRequired,
    folder: PropTypes.object.isRequired,
};
const FileCardComponent = pure((props) => {
    const isMobile = useMediaQuery(`@media screen and (device-width: 360px) and (device-height: 640px) and (-webkit-device-pixel-ratio: 3)`);
    props.item.iconJSX = detectIcon(props.item["type"]);
    return props.recent ? (
        <Card className={`bg-transparent mx-3 my-3`} elevation={0}
              onClick={() => (console.log(props.item), props.setFileInfo(props.item))}>
            <Box width={"100%"}>
                <ButtonBase>
                    <Paper style={{
                        minWidth: "100vw",
                        minHeight: "10rem",
                        backgroundImage: `url(${props.item.thumbnail || "https://picsum.photos/210/118"})`,
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat"
                    }}/>
                </ButtonBase>
                <Box pr={2} style={{display: "flex"}} className={"mt-"}>
                    <div className={"mr-2"} style={{marginTop: "0.30rem"}}>
                        {props.item.iconJSX}
                    </div>
                    <Typography noWrap gutterBottom className={`text-truncate mt-2`}>
                        {props.item.name}
                    </Typography>
                </Box>
            </Box>
        </Card>
    ) : (
        <Card className={`bg-transparent ${isMobile ? "mx-0" : "mx-2 my-2"}`} elevation={0}
              onClick={() => (console.log(props.item), props.setFileInfo(props.item))}>
            <Box width={"100%"}>
                <Card style={{minHeight: "8.325rem", minWidth: "8.325rem"}}>
                    <div style={{position: "absolute", maxHeight: "8.325rem", maxWidth: "8.325rem"}}>
                        <img alt={""} loading={"lazy"}
                             src={props.item.thumbnail || "https://picsum.photos/210/118"}
                             style={{minHeight: "8.325rem", minWidth: "8.325rem"}} className="h-100 w-100 p-0 m-0"/>
                    </div>
                    <div
                        style={{
                            minHeight: "8.325rem",
                            minWidth: "8.5rem",
                            backgroundImage: "linear-gradient(to top, rgba(0,0,0,0.65) 0%,rgba(0,0,0,0) 100%)",
                            position: "absolute"
                        }}/>

                </Card>
                <Box pr={2} style={{display: "flex", justifyContent: "space-between"}} className={"mt-1 px-0"}>
                    <div className={"mr-2"} style={{marginTop: "0.30rem"}}>
                        {props.item.iconJSX}
                    </div>
                    <Typography noWrap gutterBottom className={`text-truncate mt-2`}>
                        {props.item.name}
                    </Typography>
                    <IconButton style={{width: "1rem", height: "1rem"}} className={"mt-2 mx-0"}>
                        <MoreVert className={"mx-0 px-0"}/>
                    </IconButton>
                    <Hidden>
                        <a data-fancybox="recent" data-small-btn="true"
                           data-caption={props.item.name} {...detectMime(props.item)}/>
                    </Hidden>
                </Box>
            </Box>
        </Card>
    );
});
FileCardComponent.propTypes = {
    item: PropTypes.object.isRequired,
    recent: PropTypes.bool
};
FileCardComponent.defaultProps = {};


const FilesComponent = (props) => {
    const [contents, setContents] = React.useState(props.files);
    const [fileInfo, setFileInfo] = React.useState(null);
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const [fileDetailsDialog, setFileDetailsDialog] = React.useState(false);
    const setCurrentFileInfo = (file) => {
        setDrawerOpen(true);
        setFileInfo(file);
    };
    const handleDrawerClose = () => {
        setDrawerOpen(false);
    };
    return (
        <React.Fragment>
            {
                props.recent ? (
                    <React.Fragment>
                        {
                            contents ? contents.map((file, index) => (
                                <React.Fragment>
                                    <FileCardComponent
                                        setFileInfo={setCurrentFileInfo}
                                        item={file} recent={props.recent || false}/>
                                </React.Fragment>
                            )) : null
                        }
                    </React.Fragment>
                ) : (
                    <Grid container
                          direction="row"
                          alignItems="flex-start">
                        {
                            contents ? contents.map((file, index) => (
                                    <Grid sm={3} md={3} xs={6} item key={index}>
                                        <FileCardComponent
                                            setFileInfo={setCurrentFileInfo}
                                            item={file} recent={props.recent || false}/>
                                    </Grid>
                                )
                            ) : null
                        }
                    </Grid>
                )
            }
            <FileInfoDialog open={fileDetailsDialog} handleClose={() => {
                setFileDetailsDialog(false);
            }} file={fileInfo} folder={props.folder}/>
            <Drawer
                variant="temporary"
                anchor={"bottom"}
                onClose={handleDrawerClose}
                onOpen={() => {
                }}
                ModalProps={{keepMounted: false}}
                open={drawerOpen}
            >
                {
                    fileInfo ? (
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
                                <ListItem button onClick={() => props.handleFileDelete(fileInfo.id)}>
                                    <ListItemIcon><Delete/></ListItemIcon>
                                    <ListItemText primary={"Delete"}/>
                                </ListItem>
                                <Divider variant={"inset"}/>
                                <ListItem button onClick={() => setFileDetailsDialog(true)}>
                                    <ListItemIcon><Info/></ListItemIcon>
                                    <ListItemText primary={"Details and Activity"}/>
                                </ListItem>
                                <ListItem button onClick={() => props.handleFileDelete(fileInfo.id)}>
                                    <ListItemIcon><Create/></ListItemIcon>
                                    <ListItemText primary={"Rename"}/>
                                </ListItem>
                                <ListItem button onClick={() => props.handleFileDelete(fileInfo.id)}>
                                    <ListItemIcon><Create/></ListItemIcon>
                                    <ListItemText primary={"Rename"}/>
                                </ListItem>
                                <Divider variant={"inset"}/>
                                <ListItem>
                                    <ListItemIcon><ScreenShare/></ListItemIcon>
                                    <ListItemText primary={"Link Sharing"}/>
                                    <ListItemIcon>
                                        <FormControlLabel
                                            control={<Switch defaultChecked={fileInfo.fileShared}
                                                             onChange={() => (changeFileLinkSharing(fileInfo.id, !fileInfo.fileShared), fileInfo.fileShared = !fileInfo.fileShared, setContents([...contents, fileInfo]))}/>}
                                            label={""}/>
                                    </ListItemIcon>
                                </ListItem>
                            </List>
                        </React.Fragment>
                    ) : null
                }
            </Drawer>
        </React.Fragment>
    );
};
FilesComponent.propTypes = {
    folder: PropTypes.object.isRequired
};
FilesComponent.defaultProps = {};
export default pure(FilesComponent);
/*
        {
            props.item.thumbnail ?
                <img style={{width: 210, height: 118}} alt={props.item.name} src={props.item.thumbnail}/> :
                <Skeleton variant="rect" width={210} height={118}/>
        }

    <Box width={"100%"}>
        <ButtonBase>
            <Skeleton variant="rect" width={210} height={118} />
        </ButtonBase>
        <Box pr={2}>
            <Typography noWrap gutterBottom variant="body2" className={`text-truncate`}>
                {props.item.name}
            </Typography>
            <Typography display="block" variant="caption" color="textSecondary" className={`text-truncate`}>
                {"item.channel"}
            </Typography>
            <Typography variant="caption" color="textSecondary" className={`text-truncate`}>
                {`${props.item.mime} • ${props.item.dateCreated}`}
            </Typography>
        </Box>
    </Box>
 */
