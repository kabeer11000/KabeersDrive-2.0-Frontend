import React, {useEffect} from 'react';
import './HomeComponent.css';
import Container from "@material-ui/core/Container";
import FilesComponent from "../../components/HomeSubComponents/FileCardComponent/FileCardComponent.lazy";
import {getQueryStringParams} from "../../functions/Misc";
import {createNewFolder, getFolderById, getRecentFiles} from "../../functions/FilesFolders";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import {initAuth} from "../../functions/Auth";
import Tabs from "@material-ui/core/Tabs";
import makeStyles from "@material-ui/core/styles/makeStyles";
import * as PropTypes from "prop-types";
import green from "@material-ui/core/colors/green";
import {pure} from "recompose";
import clsx from 'clsx';
import SwipeableViews from 'react-swipeable-views';
import Tab from '@material-ui/core/Tab';
import Zoom from '@material-ui/core/Zoom';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import UpIcon from '@material-ui/icons/KeyboardArrowUp';
import Box from '@material-ui/core/Box';
import useTheme from "@material-ui/core/styles/useTheme";
import {useDialog} from 'muibox';
import {useHistory} from "react-router-dom";
import Grow from "@material-ui/core/Grow";
import FolderView from "../../components/FolderView/FolderView.lazy";

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <Typography
            className={"m-0 p-0"}
            role="tabpanel"
            hidden={value !== index}
            id={`action-tabpanel-${index}`}
            aria-labelledby={`action-tab-${index}`}
            {...other}
        >
            {value === index && <Box>{children}</Box>}
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

const dict = {
    "/recents": 0,
    "/shared": 1,
    "/my-drive": 2,
};
const a11yProps = (index) => ({
    //value: dict[index],
    id: `action-tab-${index}`,
    'aria-controls': `action-tabpanel-${index}`,
});

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        width: 500,
        position: 'relative',
        minHeight: 200,
    },
    fab: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
    fabGreen: {
        color: theme.palette.common.white,
        backgroundColor: green[500],
        '&:hover': {
            backgroundColor: green[600],
        },
    },
}));


const HomeComponent = (props) => {
    const abortController = new AbortController();
    const [contents, setContents] = React.useState(null);
    const [recent, setRecents] = React.useState(null);
    useEffect(() => {
        initAuth().then(token => {
            getRecentFiles(token, abortController, 10).then(recent => setRecents(recent)).catch(e => null);
            getFolderById(getQueryStringParams("id").id || "", token, abortController).then(files => setContents(files)).catch(e => null)
        });

        return () => {
            abortController.abort();
        }
    }, []);
    const handleFileDelete = (id) => setContents({...contents, files: contents.files.filter(file => file.id === id)});


    const classes = useStyles();
    const theme = useTheme();
    console.log(window.location.pathname);
    const [value, setValue] = React.useState(dict[window.location.pathname]);

    const folderDialog = useDialog();
    const history = useHistory();
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
            .then((name) => createNewFolder(token, name))
            .catch(() => console.log('clicked cancel')))
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };


    const transitionDuration = {
        enter: theme.transitions.duration.enteringScreen,
        exit: theme.transitions.duration.leavingScreen,
    };

    const fabs = [
        {
            color: 'primary',
            className: classes.fab,
            icon: <AddIcon/>,
            label: 'Add',
        },
        {
            color: 'secondary',
            className: classes.fab,
            icon: <EditIcon/>,
            label: 'Edit',
        },
        {
            props: {
                onClick: newFolderDialog
            },
            color: 'inherit',
            className: clsx(classes.fab, classes.fabGreen),
            icon: <UpIcon/>,
            label: 'Expand',
        },
    ];
    return (
        <Grow in={true}>
            <React.Fragment>
                <AppBar position="sticky" style={{marginTop: '0rem', zIndex: 2, backgroundColor: "#303030"}}
                        color="paper">
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        aria-label="action tabs example"
                        variant={"fullWidth"}
                        centered={true}
                        scrollButtons="auto"
                    >
                        <Tab label="Recent" {...a11yProps(0)} />
                        <Tab label="Shared" {...a11yProps(1)} />
                        <Tab label="Files" {...a11yProps(2)} />
                    </Tabs>
                </AppBar>
                <div className="HomeComponent">
                    <SwipeableViews
                        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                        index={value}
                        class={"p-0 m-0 "}
                        onChangeIndex={handleChangeIndex}
                    >
                        <TabPanel index={0} value={value} dir={theme.direction}>
                            {
                                recent && recent.files ? (
                                    <React.Fragment>
                                        <FilesComponent handleFileDelete={handleFileDelete}
                                                        folder={{
                                                            owner: window.user.user_id,
                                                            metaData: {
                                                                name: "My Drive"
                                                            }, files: recent.files, folders: []
                                                        }} recent={true}/>
                                    </React.Fragment>
                                ) : null
                            }
                        </TabPanel>
                        <TabPanel value={value} index={1} dir={theme.direction}>
                            Item Two
                        </TabPanel>
                        <TabPanel value={value} index={2} dir={theme.direction} style={{minHeight: "100vh"}}>
                            <Container className={"px-0"} style={{minHeight: "100vh"}}>
                                <FolderView embedded={true} id={window.user.user_id}/>
                            </Container>
                        </TabPanel>
                    </SwipeableViews>
                    {fabs.map((fab, index) => (
                        <Zoom
                            key={fab.color}
                            in={value === index}
                            timeout={transitionDuration}
                            style={{
                                transitionDelay: `${value === index ? transitionDuration.exit : 0}ms`,
                            }}
                            unmountOnExit
                        >
                            <Fab aria-label={fab.label} className={fab.className} color={fab.color}
                                 style={{position: "fixed"}} {...fab.props}>
                                {fab.icon}
                            </Fab>
                        </Zoom>
                    ))}
                </div>
            </React.Fragment>
        </Grow>
    );
};

HomeComponent.propTypes = {};

HomeComponent.defaultProps = {};

export default React.memo(pure(HomeComponent));
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
