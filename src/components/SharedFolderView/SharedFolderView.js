import React from 'react';
import './SharedFolderView.css';
import Container from "@material-ui/core/Container";
import FolderView from "../FolderView/FolderView.lazy";
import {initAuth} from "../../functions/Auth";
import {getFolderById} from "../../functions/FilesFolders";
import {getQueryStringParams} from "../../functions/Misc";

const SharedFolderView = () => {
    const [contents, setContents] = React.useState(null);
    const abortController = new AbortController();

    React.useEffect(() => {
        initAuth().then(token => {
            getFolderById(getQueryStringParams("id").id || "", token, abortController).then(files => setContents(files)).catch(e => null)
        });
        return () => {
            abortController.abort();
        }
    }, []);

    return (
        <div className="SharedFolderView">
            <Container className={"px-1"}>
                {contents ? (
                    <FolderView embedded={true} id={contents.metaData.id}/>
                ) : null}
            </Container>
        </div>
    );
};

SharedFolderView.propTypes = {};

SharedFolderView.defaultProps = {};

export default SharedFolderView;
