import React from 'react';
import PropTypes from 'prop-types';
import './FileCardComponent.css';
import Grid from "@material-ui/core/Grid";
import {changeFileLinkSharing} from "../../../functions/FilesFolders";
import {downloadFile} from "../../../functions/Misc";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {Delete, GetApp, OpenInNew, ScreenShare} from "@material-ui/icons";
import {detectIcon} from "../../../functions/IconDictionary";
import {pure} from "recompose";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import {Link} from "react-router-dom";
import CardMedia from "@material-ui/core/CardMedia";
import CircularProgress from "@material-ui/core/CircularProgress";

const FileCardComponent = pure((props) => {
    const isMobile = useMediaQuery(`@media screen and (device-width: 360px) and (device-height: 640px) and (-webkit-device-pixel-ratio: 3)`);
    props.item.iconJSX = detectIcon(props.item["type"]);
    return (
        <Card className={`bg-transparent ${isMobile ? "mx-0" : "mx-2 my-2"}`} elevation={0}>
            <Box width={"100%"}>
                <Card style={{minHeight: "8.325rem", minWidth: "8.325rem"}}>
                    <CardMedia>
                        <div style={{
                            marginLeft: "35%", marginTop: "35%"
                        }}>
                            <CircularProgress/>
                        </div>
                    </CardMedia>
                </Card>
                <Box pr={2} style={{display: "flex", justifyContent: "space-between"}} className={"mt-1 px-0"}>
                    <div className={"mr-2"} style={{marginTop: "0.30rem"}}>
                        {props.item.iconJSX}
                    </div>
                    <Typography noWrap gutterBottom className={`text-truncate mt-2`}>
                        {props.item.name}
                    </Typography>
                </Box>
            </Box>
        </Card>
    );
});
FileCardComponent.propTypes = {
    item: PropTypes.object.isRequired
};
FileCardComponent.defaultProps = {};


const UploadFilesComponent = (props) => {
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
                    contents ? contents.map((file, index) => (
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
                                <ListItem button component={Link} to={`/view/${fileInfo.id}`}>
                                    <ListItemIcon><OpenInNew/></ListItemIcon>
                                    <ListItemText primary={"View"} secondary={`View ${fileInfo.name}`}/>
                                </ListItem>
                                <ListItem button onClick={() => downloadFile(fileInfo)}>
                                    <ListItemIcon><GetApp/></ListItemIcon>
                                    <ListItemText primary={"Download"} secondary={`Download ${fileInfo.name}`}/>
                                </ListItem>
                                <ListItem button onClick={() => props.handleFileDelete(fileInfo.id)}>
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
UploadFilesComponent.propTypes = {};
UploadFilesComponent.defaultProps = {};
export default pure(UploadFilesComponent);
