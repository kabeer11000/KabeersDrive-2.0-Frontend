import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import './FolderView.css';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import {Add, ArrowBack, CloudUpload, Folder, FolderShared, MoreVert, PhotoCamera, Save} from "@material-ui/icons";
import {initAuth} from "../../functions/Auth";
import {createNewFolder, getFolderInfo, uploadFormDataAsFile} from "../../functions/FilesFolders";
import {pure} from "recompose";
import FoldersComponent from "../HomeSubComponents/FolderCardComponent/FolderCardComponent.lazy";
import FilesComponent from "../HomeSubComponents/FileCardComponent/FileCardComponent.lazy";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Fab from "@material-ui/core/Fab";
import Divider from "@material-ui/core/Divider";
import {useDialog} from "muibox";
import {useHistory} from "react-router-dom";
import Zoom from "@material-ui/core/Zoom";
import Grow from "@material-ui/core/Grow";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import {useSnackbar} from "notistack";

const UploadingDialog = (props) => (
    <Dialog open={props.open} disableBackdropClick disableEscapeKeyDown>
        <DialogContent>
            <div className={"d-inline-flex"}>
                <div>
                    <CircularProgress/>
                </div>
                <Typography className={"pb-2 ml-3"}>Uploading {props.fileCount} Files to {props.folderName}</Typography>
            </div>
        </DialogContent>
    </Dialog>
);
UploadingDialog.propTypes = {
    fileCount: PropTypes.number.isRequired,
    folderName: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired,
};
const AppBarComponent = (props) => (
    <React.Fragment>
        {
            props.embedded ? null : <AppBar color="paper" position={"sticky"}>
                <Toolbar>
                    <IconButton
                        onClick={() => props.folder.parents.length === 1 ? history.push('/home') : props.handleFolderChange(props.folder.immediateParent)}
                        edge="start" color="inherit"
                        aria-label="menu">
                        <ArrowBack/>
                    </IconButton>
                    <React.Fragment>
                        <Typography variant="h6" className={"text-truncate"}
                                    style={{maxWidth: "5rem"}}>
                            {
                                props.folder.metaData.name || ""
                            }
                        </Typography>
                        <div style={{flex: "1 1 auto"}}/>
                        {
                            props.folder.metaData.shared ? <IconButton><FolderShared/></IconButton> : null
                        }
                        <IconButton>
                            <MoreVert/>
                        </IconButton>
                    </React.Fragment>
                </Toolbar>
            </AppBar>
        }
    </React.Fragment>
);
AppBarComponent.propTypes = {
    handleFolderChange: PropTypes.func,
    folder: PropTypes.object,
    history: PropTypes.object,
    embedded: PropTypes.bool.isRequired
};
const FolderView = (props) => {
    const [folder, setFolder] = React.useState(null);
    const [bottomSheet, setBottomSheet] = React.useState(false);
    const [uploadingFiles, setUploadingFiles] = React.useState({files: [], dialog: false});
    const [loading, setLoading] = React.useState(false);
    const folderDialog = useDialog();
    const history = useHistory();
    const previousFolders = [];
    const {enqueueSnackbar, closeSnackbar} = useSnackbar();
    const abortController = new AbortController();
    const handleFolderChange = async (id) => initAuth()
        .then(token => (setLoading(true), getFolderInfo(token, id, abortController))
            .then((contents) => (setLoading(false), setFolder(null), setFolder(contents), props.embedded ? null : history.push(`/folder/${id}`), previousFolders.push(id)))
            .catch(e => null))
        .catch(e => null);

    useEffect(() => {
        if (!folder || !uploadingFiles.length) return;
        const formData = new FormData();
        formData.enctype = 'multipart/form-data';
        uploadingFiles.map(file => formData.append("driveUploads", file));
        initAuth().then(token => (setUploadingFiles({
            ...uploadingFiles,
            dialog: true
        }), uploadFormDataAsFile(token, formData, folder.id, abortController)).then(res => {
            console.log(res);
            handleFolderChange(props.embedded ? props.folderId : window.location.pathname.split("/").slice(-1)[0]).then(setUploadingFiles({
                ...uploadingFiles,
                dialog: false
            }));
        }).catch(e => (enqueueSnackbar("Failed to Upload", {}), setUploadingFiles({
            ...uploadingFiles,
            dialog: false
        }))));

    }, [uploadingFiles]);

    useEffect(() => {
        handleFolderChange(props.embedded ? props.folderId : window.location.pathname.split("/").slice(-1)[0]);
        return () => {
            abortController.abort()
        }
    }, []);
    const newFolderDialog = () => {
        initAuth().then(token => folderDialog.prompt({
            title: (
                <React.Fragment>
                    <div>Create New Folder</div>
                    <Typography className={"text-muted"} variant={"caption"}>Type Folder Name</Typography>
                </React.Fragment>
            ),
            required: true,
        })
            .then((name) => createNewFolder(token, name, folder.id).catch(e => console.log("Folder Creation Failed")))
            .catch(() => console.log('clicked cancel')))
            .catch(e => console.log(e))
    };
    React.useEffect(() => {
        console.log(folder);
    }, [folder]);
    return (
        <React.Fragment>
            {
                folder ? (
                    <Grow in={true}>
                        <div className="FolderView">
                            <AppBarComponent embedded={props.embedded} folder={folder} history={history}
                                             handleFolderChange={handleFolderChange}/>
                            {
                                props.embedded ? null : <AppBar color="paper" position={"sticky"}>
                                    <Toolbar>
                                        <IconButton
                                            onClick={() => folder.parents.length === 1 ? history.push('/home') : handleFolderChange(folder.immediateParent)}
                                            edge="start" color="inherit"
                                            aria-label="menu">
                                            <ArrowBack/>
                                        </IconButton>
                                        <React.Fragment>
                                            <Typography variant="h6" className={"text-truncate"}
                                                        style={{maxWidth: "5rem"}}>
                                                {
                                                    folder.metaData.name || ""
                                                }
                                            </Typography>
                                            <div style={{flex: "1 1 auto"}}/>
                                            {
                                                folder.metaData.shared ? <IconButton><FolderShared/></IconButton> : null
                                            }
                                            <IconButton>
                                                <MoreVert/>
                                            </IconButton>
                                        </React.Fragment>
                                    </Toolbar>
                                </AppBar>
                            }
                            <React.Fragment>
                                <React.Fragment>
                                    <div className={"px-2"}>
                                        <br/>
                                        {folder.folders.length ?
                                            <Typography variant={"caption"}
                                                        className={"pl-2"}>Folders</Typography> : null}
                                        <FoldersComponent folders={folder.folders}
                                                          onClick={(id) => props.embedded ? history.push(`/folder/${id}`) : handleFolderChange(id)}/>
                                        {folder.files.length ?
                                            <Typography variant={"caption"}
                                                        className={"pl-2"}>Files</Typography> : null}
                                        <FilesComponent files={folder.files} handleFileDelete={(id) => {
                                            setFolder({
                                                ...folder,
                                                files: [...folder.files.filter(file => file.id !== id)]
                                            });
                                            enqueueSnackbar("Deleted File");
                                        }} folder={{...folder, files: [], folders: []}}/>
                                    </div>
                                    {
                                        !folder.folders.length && !folder.files.length ? (
                                            <Zoom in={true}>
                                                <div className={"errorPage text-center"}
                                                     style={{
                                                         position: "absolute",
                                                         top: "50%",
                                                         left: "50%",
                                                         opacity: "60%",
                                                         transform: "translate(-50%, -50%)"
                                                     }}>

                                                    <IconButton>
                                                        <Save style={{width: "6rem", height: "auto"}}/>
                                                    </IconButton>
                                                    <br/>
                                                    <Typography variant={"body1"} className={"text-truncate"}>Nothing
                                                        Here</Typography>
                                                </div>
                                            </Zoom>
                                        ) : null
                                    }
                                </React.Fragment>
                            </React.Fragment>
                        </div>
                    </Grow>
                ) : null
            }
            <Fab onClick={() => setBottomSheet(!bottomSheet)} variant={"extended"}
                 size="medium"
                 color="primary"
                 style={{
                     position: "fixed",
                     bottom: "2rem",
                     right: "0.5rem"
                 }}>
                <Add/> New
            </Fab>
            <SwipeableDrawer
                PaperProps={{
                    style: {
                        //borderRadius: "0.5rem 0.5rem 0 0"
                    }
                }}
                ModalProps={{
                    keepMounted: true
                }}
                className={"rounded-circle"}
                anchor={"bottom"}
                open={bottomSheet}
                onClick={() => setBottomSheet(!bottomSheet)}
                onClose={() => setBottomSheet(!bottomSheet)}
                onOpen={() => setBottomSheet(!bottomSheet)}
            >
                <ListItem>
                    <ListItemIcon><Add/></ListItemIcon>
                    <ListItemText>
                        <Typography>Create New</Typography>
                    </ListItemText>
                </ListItem>
                <Divider/>
                <List>
                    <ListItem button onClick={() => newFolderDialog()}>
                        <ListItemIcon><Folder/></ListItemIcon>
                        <ListItemText primary={"Folder"} secondary={`Create New Folder`}/>
                    </ListItem>
                    <ListItem button onClick={() => {
                        const input = document.createElement('input');
                        input.type = 'file';
                        input.multiple = true;
                        input.onchange = e => setUploadingFiles([...e.target.files]);
                        input.click();
                    }}>
                        <ListItemIcon><CloudUpload/></ListItemIcon>
                        <ListItemText primary={"Upload File"} secondary={`Upload New File`}/>
                    </ListItem>
                    <ListItem button onClick={() => {
                        const input = document.createElement('input');
                        input.type = 'file';
                        input.accept = "image/*";
                        input.capture = "environment";
                        input.multiple = true;
                        input.onchange = e => setUploadingFiles([...e.target.files]);
                        input.click();
                    }}>
                        <ListItemIcon><PhotoCamera/></ListItemIcon>
                        <ListItemText primary={"Scan"} secondary={`Scan New Document`}/>
                    </ListItem>
                </List>
            </SwipeableDrawer>
            <Backdrop open={loading} style={{zIndex: 8}}>
                <CircularProgress/>
            </Backdrop>
            <UploadingDialog fileCount={25} open={uploadingFiles.dialog} folderName={"My Drive"}/>
        </React.Fragment>
    );
};

FolderView.propTypes = {};

FolderView.defaultProps = {};

export default pure(FolderView);
