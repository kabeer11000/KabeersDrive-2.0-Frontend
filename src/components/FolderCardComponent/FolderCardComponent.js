import React from 'react';
import PropTypes from 'prop-types';
import './FolderCardComponent.css';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {Folder, MoreVert} from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import {pure} from "recompose";
//                    <Skeleton variant="rect" width={210} height={118} />
// <div style={{zIndex: 2, backgroundImage: "linear-gradient(to bottom, transparent, rgba(0,0,0,0.25))", minWidth: 210, width: 210, height: 118}} className={"rounded"}/>
//

const FolderCardComponent = pure((props) => {
    const isMobile = useMediaQuery(`@media screen and (device-width: 360px) and (device-height: 640px) and (-webkit-device-pixel-ratio: 3)`);
    return (
        <Card className={`${isMobile ? "mx-0" : "mx-2 my-2"} py-0`}>
            <CardContent className={'py-0'}>
                <div className={"d-flex"}>
                    <Typography noWrap gutterBottom className={`text-truncate mt-2`}>
                        <IconButton><Folder/></IconButton> {props.item.metaData.name}
                    </Typography>
                    <IconButton><MoreVert/></IconButton>
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
    return (
        <React.Fragment>
            <Grid container
                  direction="row"
                  alignItems="flex-start">
                {
                    contents ? contents.map((folder, index) => (
                        <Grid sm={4} md={4} xs={12} item key={index}>
                            <FolderCardComponent
                                item={folder}/>
                        </Grid>)) : null
                }
            </Grid>
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
