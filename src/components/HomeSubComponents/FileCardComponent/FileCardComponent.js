import React from 'react';
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
import {Create, Delete, GetApp, Info, OpenInNew, ScreenShare} from "@material-ui/icons";
import {downloadFile} from "../../../functions/Misc";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import {useDialog} from "muibox";

const FilesComponent = (props) => {
    const [contents, setContents] = React.useState(props.files);
    const [fileInfo, setFileInfo] = React.useState(null);
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const [fileDetailsDialog, setFileDetailsDialog] = React.useState(false);
    const setCurrentFileInfo = (file) => {
        setDrawerOpen(true);
        setFileInfo(file);
    };
    const mainDialog = useDialog();
    const handleDrawerClose = () => {
        setDrawerOpen(false);
    };
    React.useEffect(() => {

    }, [contents]);
    return (
        <React.Fragment>
            {
                props.recent ? (
                    <React.Fragment>
                        {
                            contents ? contents.map((file, index) => (
                                <FileCardComponent
                                    key={index}
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
                                <ListItem button
                                          onClick={() => mainDialog.confirm({
                                              title: <Typography noWrap className={"text-truncate"}>Confirm
                                                  Deleting {fileInfo.name}</Typography>,
                                              message: ` This Action cannot be reverted`
                                          })
                                              .then(() => {
                                                  setContents([...props.files.filter(file => file.id !== fileInfo.id)]);
                                                  props.handleFileDelete(fileInfo.id);
                                              })}>
                                    <ListItemIcon><Delete/>
                                    </ListItemIcon>
                                    <ListItemText primary={"Delete"}/>
                                </ListItem>
                                < Divider variant={"inset"}/>
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
                                            control={<Switch defaultChecked={fileInfo.fileShared}/>}
                                            label={""}/>
                                    </ListItemIcon>
                                </ListItem>
                            </List>
                        </React.Fragment>
                    )
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
