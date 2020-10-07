import React, {useEffect} from 'react'
import {FilePond, registerPlugin} from 'react-filepond'
import 'filepond/dist/filepond.min.css';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import PropTypes from 'prop-types';
import './UploadComponent.css';
import {endPoints} from "../../api/EndPoints";
import {getQueryStringParams} from "../../functions/Misc";
import {storageIndex} from "../../functions/StorageIndex";
import {initAuth} from "../../functions/Auth";
import {pure} from "recompose";
import Container from "@material-ui/core/Container";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import store from "../../redux/store/store";
import {setUploadingFiles} from "../../redux/actions/actions";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const UploadComponent = (props) => {
    const [files, setFiles] = React.useState([]);
    const [token, setToken] = React.useState(null);
    const {onClose, selectedValue, open, emails} = props;

    useEffect(() => {
        store.dispatch(setUploadingFiles(files));
        console.log(files)
    }, [files]);
    const handleClose = () => {
        onClose();
    };

    const handleListItemClick = (value) => {
        onClose(value);
    };
    const dragEventHandler = (ev) => {
        ev.preventDefault();
        console.log(ev.dataTransfer.items);
        //console.log(Array.from(ev.dataTransfer.items).map(i => [i.kind,i.type].join('|')).join(', '));
    };
    //document.addEventListener('dragover', dragEventHandler);
    const folderInfo = {
        folderId: getQueryStringParams("id").id.length ? getQueryStringParams("id").id : JSON.parse(atob(localStorage.getItem(storageIndex.userData))).user_id,
    };
    initAuth().then(token => setToken(token));
    return (
        <div className="UploadComponent mt-5 pt-5">
            <Dialog
                onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title">Subscribe</DialogTitle>
                <Container maxWidth={false}>
                    <FilePond
                        server={{
                            url: endPoints.fileUpload(folderInfo.folderId),
                            process: {
                                headers: {
                                    'Authorization': `Bearer ${token || ""}`
                                },
                            }
                        }}
                        files={files}
                        onupdatefiles={setFiles}
                        allowMultiple={true}
                        maxFiles={20}
                        chunkUploads={true}
                        checkValidity={true}
                        name="driveUploads"
                        labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
                    />
                </Container>
            </Dialog>
        </div>
    );
};

UploadComponent.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
};

UploadComponent.defaultProps = {};

export default pure(UploadComponent);
