import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import {ArrowBack, FolderShared, MoreVert} from "@material-ui/icons";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import {pure} from "recompose";

const AppBarComponent = (props) => (
    <React.Fragment>
        <AppBar color="paper" position={"sticky"}>
            <Toolbar>
                <IconButton
                    onClick={() => props.folder.parents.length === 1 ? props.history.push('/home') : props.handleFolderChange(props.folder.immediateParent)}
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
    </React.Fragment>
);
AppBarComponent.propTypes = {
    handleFolderChange: PropTypes.func,
    folder: PropTypes.object,
    history: PropTypes.object,
};
export default pure(AppBarComponent);
