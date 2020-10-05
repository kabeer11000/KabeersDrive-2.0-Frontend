import React from 'react';
import PropTypes from 'prop-types';
import './FileCardComponent.css';
import Grid from "@material-ui/core/Grid";
import {changeFileLinkSharing} from "../../functions/FilesFolders";
import {downloadFile} from "../../functions/Misc";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import Card from "@material-ui/core/Card";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {Delete, GetApp, OpenInNew, ScreenShare} from "@material-ui/icons";
import {detectIcon, detectMime} from "../../functions/IconDictionary";
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

const FileCardComponent = pure((props) => {
    const isMobile = useMediaQuery(`@media screen and (device-width: 360px) and (device-height: 640px) and (-webkit-device-pixel-ratio: 3)`);
    props.item.iconJSX = detectIcon(props.item["mime"]);
    return (
        <Card className={`bg-transparent ${isMobile ? "mx-0" : "mx-2 my-2"}`} elevation={0}
              onClick={() => props.setFileInfo(props.item)}>
            <Box width={"100%"}>
                <ButtonBase>
                    <Paper style={{minWidth: 210, width: 210, height: 118}}>
                        <img style={{minWidth: 210, width: 210, height: 118}} className={"rounded"} alt={"File Icon"}
                             loading={"lazy"} src={props.item.thumbnail || "https://picsum.photos/210/118"}
                             onerror={"this.onerror=null;this.classList.add('d-none');"}/>
                    </Paper>
                </ButtonBase>
                <Box pr={2} style={{display: "flex"}} className={"mt-"}>
                    <div className={"mr-2"} style={{marginTop: "0.30rem"}}>
                        {props.item.iconJSX}
                    </div>
                    <Typography noWrap gutterBottom className={`text-truncate mt-2`}>
                        {props.item.name}
                    </Typography>
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
    item: PropTypes.object.isRequired
};
FileCardComponent.defaultProps = {};


const FilesComponent = (props) => {
    const [contents, setContents] = React.useState(props.files);
    const [fileInfo, setFileInfo] = React.useState(null);
    const [drawerOpen, setDrawerOpen] = React.useState(false);

    const setCurrentFileInfo = (file) => {
        setDrawerOpen(true);
        setFileInfo(file);
    };
    const handleDrawerClose = () => {
        setDrawerOpen(false);
    };
    return (
        <React.Fragment>
            <Grid container
                  direction="row"
                  alignItems="flex-start">
                {
                    contents ? contents["Files"].map((file, index) => (
                            <Grid sm={3} md={3} xs={6} item key={index}>
                                <FileCardComponent
                                    setFileInfo={setCurrentFileInfo}
                                    item={file}/>
                            </Grid>
                        )
                    ) : null
                }
            </Grid>
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
                                    <Typography>{fileInfo.name}</Typography>
                                </ListItemText>
                            </ListItem>
                            <Divider/>
                            <List>
                                <ListItem button data-fancybox="recent" data-small-btn="true"
                                          data-caption={fileInfo.name} {...detectMime(fileInfo)}>
                                    <ListItemIcon><OpenInNew/></ListItemIcon>
                                    <ListItemText primary={"View"} secondary={`View ${fileInfo.name}`}/>
                                </ListItem>
                                <ListItem button onClick={() => downloadFile(fileInfo)}>
                                    <ListItemIcon><GetApp/></ListItemIcon>
                                    <ListItemText primary={"Download"} secondary={`Download ${fileInfo.name}`}/>
                                </ListItem>
                                <ListItem button>
                                    <ListItemIcon><Delete/></ListItemIcon>
                                    <ListItemText primary={"Delete"} secondary={`Delete ${fileInfo.name}`}/>
                                </ListItem>
                                <Divider/>
                                <ListItem>
                                    <ListItemIcon><ScreenShare/></ListItemIcon>
                                    <ListItemText primary={"Link Sharing"}/>
                                    <ListItemIcon>
                                        <FormControlLabel
                                            control={<Switch defaultChecked={!!+fileInfo.shared}
                                                             onChange={(e) => changeFileLinkSharing(fileInfo.id, !fileInfo.shared)}/>}
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
FilesComponent.propTypes = {};
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
