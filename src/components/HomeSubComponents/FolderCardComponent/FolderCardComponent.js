import React from 'react';
import PropTypes from 'prop-types';
import './FolderCardComponent.css';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {Delete, Folder, GetApp, MoreVert, OpenInNew, ScreenShare} from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import {pure} from "recompose";
import {Link} from "react-router-dom";
import Drawer from "@material-ui/core/Drawer";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import {downloadFile} from "../../../functions/Misc";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import {changeFileLinkSharing} from "../../../functions/FilesFolders";
//                    <Skeleton variant="rect" width={210} height={118} />
// <div style={{zIndex: 2, backgroundImage: "linear-gradient(to bottom, transparent, rgba(0,0,0,0.25))", minWidth: 210, width: 210, height: 118}} className={"rounded"}/>
//

const FolderCardComponent = pure((props) => {
    const isMobile = useMediaQuery(`@media screen and (device-width: 360px) and (device-height: 640px) and (-webkit-device-pixel-ratio: 3)`);
    return (
        <Card className={`${isMobile ? "mx-0" : "mx-2 my-2"} py-0`}>
            <CardContent className={'py-0'}>
                <div className={"d-flex"}>
                    <Typography noWrap gutterBottom className={`text-truncate mt-2`} style={{textDecoration: 'none'}}
                                onClick={() => props.onClick(props.item.id)}>
                        <IconButton><Folder/></IconButton> {props.item.metaData.name}
                    </Typography>
                    <div style={{flex: "1 1 auto"}}/>
                    <IconButton onClick={() => props.onOptions(props.item)}><MoreVert/></IconButton>
                </div>
            </CardContent>
        </Card>
    );
});
FolderCardComponent.propTypes = {
    item: PropTypes.object.isRequired
};
FolderCardComponent.defaultProps = {};


const FoldersComponent = (props) => {
    const [contents, setContents] = React.useState(props.folders);
    const [folderInfo, setFolderInfo] = React.useState(null);
    const [drawerOpen, setDrawerOpen] = React.useState(false);

    const setCurrentFileInfo = (folder) => {
        setDrawerOpen(true);
        setFolderInfo(folder);
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
                    contents ? contents.map((folder, index) => (
                        <Grid sm={4} md={4} xs={12} item key={index}>
                            <FolderCardComponent
                                item={folder} onOptions={setCurrentFileInfo} onClick={props.onClick}/>
                        </Grid>)) : null
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
                    folderInfo ? (
                        <React.Fragment>
                            <ListItem>
                                <ListItemIcon><Folder/></ListItemIcon>
                                <ListItemText>
                                    <Typography>{folderInfo.metaData.name}</Typography>
                                </ListItemText>
                            </ListItem>
                            <Divider/>
                            <List>
                                <ListItem button component={Link} to={`/view/${folderInfo.id}`}>
                                    <ListItemIcon><OpenInNew/></ListItemIcon>
                                    <ListItemText primary={"View"} secondary={`View ${folderInfo.metaData.name}`}/>
                                </ListItem>
                                <ListItem button onClick={() => downloadFile(folderInfo)}>
                                    <ListItemIcon><GetApp/></ListItemIcon>
                                    <ListItemText primary={"Download"} secondary={`Download ${folderInfo.name}`}/>
                                </ListItem>
                                <ListItem button onClick={() => props.handleFileDelete(folderInfo.id)}>
                                    <ListItemIcon><Delete/></ListItemIcon>
                                    <ListItemText primary={"Delete"} secondary={`Delete ${folderInfo.name}`}/>
                                </ListItem>
                                <Divider/>
                                <ListItem>
                                    <ListItemIcon><ScreenShare/></ListItemIcon>
                                    <ListItemText primary={"Link Sharing"}/>
                                    <ListItemIcon>
                                        <FormControlLabel
                                            control={<Switch defaultChecked={!!+folderInfo.shared}
                                                             onChange={(e) => changeFileLinkSharing(folderInfo.id, !folderInfo.shared)}/>}
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
FoldersComponent.propTypes = {};
FoldersComponent.defaultProps = {};
export default pure(FoldersComponent);
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
