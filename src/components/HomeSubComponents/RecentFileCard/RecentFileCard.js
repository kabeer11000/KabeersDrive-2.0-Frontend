import React, {useEffect} from 'react';
import './RecentFileCard.css';
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import ButtonBase from "@material-ui/core/ButtonBase";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import {Hidden} from "@material-ui/core";
import {detectIcon, detectMime} from "../../../functions/IconDictionary";
import Drawer from "@material-ui/core/Drawer";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import {Delete, GetApp, OpenInNew, ScreenShare} from "@material-ui/icons";
import {downloadFile} from "../../../functions/Misc";
import Switch from "@material-ui/core/Switch";
import {changeFileLinkSharing} from "../../../functions/FilesFolders";
import {Link} from "react-router-dom";

const RecentFileCard = (props) => {
    const [fileInfo, setFileInfo] = React.useState(null);
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const [files, setFiles] = React.useState(null);

    const setCurrentFileInfo = (file) => {
        setDrawerOpen(true);
        setFileInfo(file);
    };
    const handleDrawerClose = () => {
        setDrawerOpen(false);
    };

    useEffect(() => {
        setFiles(props.files);
    }, []);

    return <React.Fragment>
        {files && files.length ? files.map(file => (
            <Card className={`bg-transparent mx-3 my-3`} elevation={0}
                  onClick={() => setCurrentFileInfo(file)}>
                <Box width={"100%"}>
                    <ButtonBase>
                        <Paper style={{
                            minWidth: "100vw",
                            minHeight: "10rem",
                            backgroundImage: `url(${file.thumbnail || "https://picsum.photos/210/118"})`,
                            backgroundSize: "cover",
                            backgroundRepeat: "no-repeat"
                        }}/>
                    </ButtonBase>
                    <Box pr={2} style={{display: "flex"}} className={"mt-"}>
                        <div className={"mr-2"} style={{marginTop: "0.30rem"}}>
                            {detectIcon(file.type)}
                        </div>
                        <Typography noWrap gutterBottom className={`text-truncate mt-2`}>
                            {file.name}
                        </Typography>
                        <Hidden>
                            <a data-fancybox="recent" data-small-btn="true"
                               data-caption={file.name} {...detectMime(file)}/>
                        </Hidden>
                    </Box>
                </Box>
            </Card>
        )) : null}
        <Drawer
            variant="temporary"
            anchor={"bottom"}
            onClose={handleDrawerClose}
            onOpen={() => {
            }}
            ModalProps={{keepMounted: true}}
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
                                    <Switch checked={fileInfo.fileShared}
                                            onChange={(e) => {
                                                fileInfo.fileShared = !fileInfo.fileShared;
                                                setFiles({...files, fileInfo});
                                                changeFileLinkSharing(fileInfo.id, !fileInfo.shared)
                                            }}/>
                                </ListItemIcon>
                            </ListItem>
                        </List>
                    </React.Fragment>
                ) : null
            }
        </Drawer>
    </React.Fragment>;
};

RecentFileCard.propTypes = {};

RecentFileCard.defaultProps = {};

export default RecentFileCard;
