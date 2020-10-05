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

const App = (props) => {
    const [state, setState] = React.useState({
        drawerOpen: false,
        currentlySearching: false,
        appBarTitle: "My Drive",
    });
    const stateFunctions = {
        drawerOpen: state.drawerOpen,
        handleDrawer: () => setState({...state, drawerOpen: !state.drawerOpen}),
        currentlySearching: state.currentlySearching,
        handleSearch: () => setState({...state, currentlySearching: !state.currentlySearching}),
        title: state.appBarTitle,
        setTitle: (t) => setState({...state, appBarTitle: t}),
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
                    </React.Fragment>
                </DrawerComponent>
            </Router>
        </MuiThemeProvider>
    );
};

export default App;
