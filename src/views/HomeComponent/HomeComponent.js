import React, {useEffect} from 'react';
import './HomeComponent.css';
import Container from "@material-ui/core/Container";
import FilesComponent from "../../components/FileCardComponent/FileCardComponent.lazy";
import FoldersComponent from "../../components/FolderCardComponent/FolderCardComponent.lazy";
import {getQueryStringParams} from "../../functions/Misc";
import {getFolderById} from "../../functions/FilesFolders";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import {Close} from "@material-ui/icons";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import {initAuth} from "../../functions/Auth";


const HomeComponent = (props) => {
    const abortController = new AbortController();
    const [contents, setContents] = React.useState(null);

    useEffect(() => {
        initAuth().then(token => getFolderById(getQueryStringParams("id").id || "", token, abortController).then(files => setContents(files)).catch(e => null));

        return () => {
            abortController.abort();
        }
    }, []);
    const handleFileDelete = (id) => {
        setContents({...contents, files: contents.files.filter(file => file.id === id)});
    };
    return (
        <React.Fragment>
            <AppBar variant={"elevation"} className={"d-none"}>
                <Toolbar>
                    <IconButton>
                        <Close/>
                    </IconButton>
                    <Typography variant="h6">
                        Selected
                    </Typography>
                </Toolbar>
            </AppBar>
            <div className="HomeComponent" style={{marginTop: '5rem'}}>
                <Container>
                    {contents ? (
                        <React.Fragment>
                            <br/>
                            {contents["TotalFolders"] ? <Typography variant={"caption"}>Folders</Typography> : null}
                            <FoldersComponent folders={contents.folders}/>
                            {contents["TotalFiles"] ? <Typography variant={"caption"}>Files</Typography> : null}
                            <FilesComponent files={contents.files} handleFileDelete={handleFileDelete}/>
                        </React.Fragment>
                    ) : null}
                </Container>
            </div>
        </React.Fragment>
    );
};

HomeComponent.propTypes = {};

HomeComponent.defaultProps = {};

export default HomeComponent;
/*
                    <Typography variant={"overline"}>
                        {
                            contents && contents["TotalFolders"] && contents["TotalFiles"] ?
                                (
                                    <React.Fragment>
                                        <IconButton><Folder/></IconButton> {contents["TotalFolders"]}
                                        <IconButton><Description/></IconButton> {contents["TotalFiles"]}
                                    </React.Fragment>
                                ) : null
                        }
                    </Typography>

 */
