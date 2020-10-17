import React, {useEffect} from 'react';
import './FileViewer.css';
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import {ArrowBack, MoreVert} from "@material-ui/icons";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {checkTokenExists, initAuth} from "../../functions/Auth";
import {getFileInfoById} from "../../functions/FilesFolders";
import DialogContent from "@material-ui/core/DialogContent";
import {Document, Page} from 'react-pdf';
import {useHistory} from "react-router-dom";
import Container from "@material-ui/core/Container";
import LinearProgress from "@material-ui/core/LinearProgress";
import {HideOnScroll} from "../AppBarComponent/AppBarComponent";
import PDFViewer from '@phuocng/react-pdf-viewer';
import {endPoints} from "../../api/EndPoints";
import {useAsync} from "react-async";

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});
const fetchCode = async ({url}, {signal}) => await fetch(url, {signal}).then(res => res.text());

const CodeBlock = ({url}) => {
    const {data, error} = useAsync({
        promiseFn: fetchCode,
        url,
    });
    return <code>
        <pre style={{wordWrap: "break-word", whiteSpace: "pre-wrap"}}>{error ? error.message : data}</pre>
    </code>;
};
const EmbeddedFileViewer = (props) => {
    switch (props.file.type) {
        case "image":
            return (
                <React.Fragment>
                    <div style={{
                        transform: "translate(0%, 0%)",
                        left: "50%",
                        top: "50%"
                    }}>
                        <img
                            onLoad={props.onLoad}
                            loading={"lazy"}
                            className={"w-100 h-100"}
                            //src={"https://images.unsplash.com/photo-1602039439011-5ca16c81bd85?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"}
                            src={`${endPoints.filePathReadFile(props.file.path)}`}
                            alt={props.file.name}
                        />
                    </div>
                </React.Fragment>
            );
        case "video":
            return (
                <React.Fragment>
                    <Container maxWidth={"xs"}>
                        <div style={{
                            transform: "translate(0%, 0%)",
                            left: "50%",
                            top: "50%"
                        }}>
                            <video className={"w-100 h-100"}
                                   onLoad={props.onLoad}
                                   src={endPoints.filePathReadFile(props.file.path)}/>
                        </div>
                    </Container>
                </React.Fragment>
            );
        case "document":
            return (
                <React.Fragment>
                    <Container maxWidth={"xs"}>
                        <PDFViewer
                            fileUrl={endPoints.filePathReadFile(props.file.path)}/>
                    </Container>
                </React.Fragment>
            );
        case "pdf":
            return (
                <React.Fragment>
                    <Container maxWidth={"xs"} style={{height: "100vh", width: "100vw"}}>
                        <Document
                            file={endPoints.filePathReadFile(props.file.path)}
                        >
                            <Page pageNumber={0}/>
                        </Document>
                    </Container>
                </React.Fragment>
            );
        case "text":
            return (
                <React.Fragment>
                    <Container maxWidth={"md"}>
                        <CodeBlock url={endPoints.filePathReadFile(props.file.path)}/>
                    </Container>
                </React.Fragment>
            );
        case "code":
            return (
                <React.Fragment>
                    <Container maxWidth={"md"}>
                        <CodeBlock url={endPoints.filePathReadFile(props.file.path)}/>
                    </Container>
                </React.Fragment>
            );
        default:
            return (
                <React.Fragment>
                    <Container maxWidth={"md"}>
                        <CodeBlock url={endPoints.filePathReadFile(props.file.path)}/>
                    </Container>
                </React.Fragment>
            );

    }
};
const FileViewer = (props) => {
    const fileId = window.location.pathname.split("/").slice(-1)[0];
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const [file, setFile] = React.useState(false);
    const abortController = new AbortController();
    const history = useHistory();

    const handleClose = () => {
        setOpen(false);
        history.goBack();
    };
    useEffect(() => {
        checkTokenExists() ? initAuth()
            .then(token => getFileInfoById(token, abortController, fileId)
                .then(file => setFile(file))
                .catch(e => history.goBack()))
            .catch(e => null) : alert("Not Loggedin");


    }, []);
    useEffect(() => {
        console.log(file);
    }, [file]);
    return (
        <div>
            {file ? (
                <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}
                        PaperProps={{
                            className: "bg-transparent",
                            backgroundColor: "transparent"
                        }}>
                    <HideOnScroll>
                        <AppBar position="static" elevation={2} className={"bg-transparent"}>
                            <Toolbar>
                                <IconButton onClick={() => {
                                    history.goBack();
                                }} edge="start" color="inherit" aria-label="menu">
                                    <ArrowBack/>
                                </IconButton>
                                <Typography variant={"h6"} className={"text-truncate"} noWrap>
                                    {file.name}
                                </Typography>
                                <div style={{flex: "1 1 auto"}}/>
                                <IconButton>
                                    <MoreVert/>
                                </IconButton>
                            </Toolbar>
                            <LinearProgress variant={"indeterminate"}/>
                        </AppBar>
                    </HideOnScroll>
                    <DialogContent className={"bg-transparent"}>
                        <EmbeddedFileViewer file={file} onLoad={() => {
                        }}/>
                    </DialogContent>
                </Dialog>
            ) : null}
        </div>
    );
};

FileViewer.propTypes = {
//    file: PropTypes.object.isRequired
};

FileViewer.defaultProps = {};

export default FileViewer;
