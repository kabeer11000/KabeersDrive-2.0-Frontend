import React from 'react';
import './App.css';
import {MuiThemeProvider} from "@material-ui/core";
import {BrowserRouter as Router, Route} from "react-router-dom";
import HomeComponent from "./views/HomeComponent/HomeComponent.lazy";
import AppBarComponent from "./components/AppBarComponent/AppBarComponent.lazy";
import "bootstrap/dist/css/bootstrap-utilities.min.css";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import CssBaseline from "@material-ui/core/CssBaseline";
import DrawerComponent from "./components/DrawerComponent/DrawerComponent.lazy";
import UploadComponent from "./views/UploadComponent/UploadComponent.lazy";
import Fab from "@material-ui/core/Fab";
import {CloudUpload} from "@material-ui/icons";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        width: 500,
        position: 'relative',
        minHeight: 200,
    },
    fab: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    }
}));
const App = (props) => {
    const classes = useStyles();
    const [state, setState] = React.useState({
        drawerOpen: false,
        currentlySearching: false,
        appBarTitle: "My Drive",
        filesUploading: [],
    });
    const [castDialogOpen, setCastDialogOpen] = React.useState(false);
    const stateFunctions = {
        drawerOpen: state.drawerOpen,
        handleDrawer: () => setState({...state, drawerOpen: !state.drawerOpen}),
        currentlySearching: state.currentlySearching,
        handleSearch: () => setState({...state, currentlySearching: !state.currentlySearching}),
        title: state.appBarTitle,
        setTitle: (t) => setState({...state, appBarTitle: t}),
        filesUploading: state.filesUploading,
        setFilesUploading: (files) => setState({...state, filesUploading: [...state.filesUploading, ...files]})
    };

    const handleCastDialogClickOpen = () => {
        setCastDialogOpen(true);
    };

    const handleCastDialogClose = (v) => {
        if (!v) return setCastDialogOpen(false);
    };
    const theme = createMuiTheme({
        palette: {
            type: "dark"
        },
    });

    return (
        <MuiThemeProvider theme={theme}>
            <CssBaseline/>
            <Router>
                <DrawerComponent {...stateFunctions}>
                    <React.Fragment>
                        <Route path={"/"} render={() => <AppBarComponent {...stateFunctions}/>}/>
                        <Route exact path={["/", "/home"]} component={HomeComponent}/>
                        <Route exact path={["/upload"]} component={UploadComponent}/>
                    </React.Fragment>
                    <UploadComponent onClose={handleCastDialogClose} open={castDialogOpen}/>
                    <Fab onClick={handleCastDialogClickOpen} className={classes.fab}>
                        <CloudUpload/>
                    </Fab>
                </DrawerComponent>
            </Router>
        </MuiThemeProvider>
    );
};

export default App;
