import {pure} from "recompose";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {detectIcon} from "../../../functions/IconDictionary";
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import ButtonBase from "@material-ui/core/ButtonBase";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import {MoreVert} from "@material-ui/icons";
import PropTypes from "prop-types";
import React from "react";

const FileCardComponent = (props) => {
    const isMobile = useMediaQuery(`@media screen and (device-width: 360px) and (device-height: 640px) and (-webkit-device-pixel-ratio: 3)`);
    props.item.iconJSX = detectIcon(props.item["type"]);
    return props.recent ? (
        <Card className={`bg-transparent mx-3 my-3`} elevation={0}
              onClick={() => props.setFileInfo(props.item)}>
            <Box width={"100%"}>
                <ButtonBase>
                    <Paper style={{
                        minWidth: "100vw",
                        minHeight: "10rem",
                        backgroundImage: `url(${props.item.thumbnail || "https://picsum.photos/210/118"})`,
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat"
                    }}/>
                </ButtonBase>
                <Box pr={2} style={{display: "flex"}} className={"mt-"}>
                    <div className={"mr-2"} style={{marginTop: "0.30rem"}}>
                        {props.item.iconJSX}
                    </div>
                    <Typography noWrap gutterBottom className={`text-truncate mt-2`}>
                        {props.item.name}
                    </Typography>
                </Box>
            </Box>
        </Card>
    ) : (
        <Card className={`bg-transparent ${isMobile ? "mx-0" : "mx-2 my-2"}`} elevation={0}
              onClick={() => props.setFileInfo(props.item)}>
            <Box width={"100%"}>
                <Card style={{minHeight: "8.325rem", minWidth: "8.325rem"}}>
                    <div style={{position: "absolute", maxHeight: "8.325rem", maxWidth: "8.325rem"}}>
                        <img alt={""} loading={"lazy"}
                             src={props.item.thumbnail}
                             style={{minHeight: "8.325rem", minWidth: "8.325rem"}} className="h-100 w-100 p-0 m-0"/>
                    </div>
                    <div
                        style={{
                            minHeight: "8.325rem",
                            minWidth: "8.5rem",
                            backgroundImage: "linear-gradient(to top, rgba(0,0,0,0.65) 0%,rgba(0,0,0,0) 100%)",
                            position: "absolute"
                        }}/>

                </Card>
                <Box pr={2} style={{display: "flex", justifyContent: "space-between"}} className={"mt-1 px-0"}>
                    <div className={"mr-2"} style={{marginTop: "0.30rem"}}>
                        {props.item.iconJSX}
                    </div>
                    <Typography noWrap gutterBottom className={`text-truncate mt-2`}>
                        {props.item.name}
                    </Typography>
                    <IconButton style={{width: "1rem", height: "1rem"}} className={"mt-2 mx-0"}>
                        <MoreVert className={"mx-0 px-0"}/>
                    </IconButton>
                </Box>
            </Box>
        </Card>
    );
};
FileCardComponent.propTypes = {
    item: PropTypes.object.isRequired,
    recent: PropTypes.bool
};
FileCardComponent.defaultProps = {};
export default pure(FileCardComponent);
