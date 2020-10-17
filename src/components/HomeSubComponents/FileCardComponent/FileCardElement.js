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
import React, {memo} from "react";
import Checkbox from "@material-ui/core/Checkbox";
import Fade from "@material-ui/core/Fade";
import {useHistory} from "react-router-dom";

const imageErrorSrc = 'https://cdn.jsdelivr.net/gh/kabeer11000/docs-hosted@main/drive/app/fallback/image-error/texture-black-48dp.svg';

const FileCardComponent = (props) => {
    const isMobile = useMediaQuery(`@media screen and (device-width: 360px) and (device-height: 640px) and (-webkit-device-pixel-ratio: 3)`);
    props.item.iconJSX = detectIcon(props.item["type"]);
    const history = useHistory();
    return props.recent ? (
        <Card className={`bg-transparent mx-3 my-3`} elevation={0}>
            <Box width={"100%"}
                 onDoubleClick={() => props.selecting.highlight ? null : props.setCurrentlySelecting(!props.selecting.highlight, [...props.selecting.files])}>
                <div
                    onClick={() => !props.selecting.highlight ? history.push(`/view/${props.item.id}`) : null}>
                    <Checkbox
                        disableRipple
                        onChange={(e) => props.setCurrentlySelecting(props.selecting.highlight, e.target.checked ? [...props.selecting.files, props.item] : [...props.selecting.files.filter(file => file.id !== props.item.id)])}
                        disabled={!props.selecting.highlight} readOnly={!props.selecting.highlight}
                        checked={!!props.selecting.files.find(file => file.id === props.item.id)}
                        className={"p-0 m-0"}
                        checkedIcon={
                            <Box>
                                <ButtonBase>
                                    <Paper style={{
                                        minWidth: "17.9rem",
                                        maxWidth: "18rem",
                                        minHeight: "10rem",
                                        backgroundImage: `url(${props.item.thumbnail || "https://picsum.photos/210/118"})`,
                                        backgroundSize: "cover",
                                        backgroundRepeat: "no-repeat",
                                        borderColor: "white"
                                    }}/>
                                    <Fade in={true}>
                                        <div
                                            className={"rounded"}
                                            style={{
                                                minWidth: "17.9rem",
                                                maxWidth: "18rem",
                                                minHeight: "10rem",
                                                backgroundColor: "#E8F0FE",
                                                position: "absolute",
                                                opacity: 0.5
                                            }}/>
                                    </Fade>
                                </ButtonBase>
                            </Box>
                        }
                        icon={
                            <Box>
                                <ButtonBase>
                                    <Paper style={{
                                        minWidth: "18rem",
                                        maxWidth: "18rem",
                                        minHeight: "10rem",
                                        backgroundImage: `url(${props.item.thumbnail || "https://picsum.photos/210/118"})`,
                                        backgroundSize: "cover",
                                        backgroundRepeat: "no-repeat"
                                    }}/>
                                </ButtonBase>
                            </Box>
                        }
                    />
                </div>
                <Box pr={2} style={{display: "flex"}} className={"mt-"}>
                    <div className={"mr-2"} style={{marginTop: "0.30rem"}}>
                        {props.item.iconJSX}
                    </div>
                    <Typography noWrap gutterBottom className={`text-truncate mt-2`}>
                        {props.item.name}
                    </Typography>
                    <IconButton style={{width: "1rem", height: "1rem"}} className={"mt-2 mx-0"}
                                onClick={() => props.setFileInfo(props.item)}>
                        <MoreVert className={"mx-0 px-0"}/>
                    </IconButton>
                </Box>
            </Box>
        </Card>
    ) : (
        <Card className={`bg-transparent ${isMobile ? "mx-0" : "mx-2 my-2"}`} elevation={0}>
            <Box width={"100%"}
                 onDoubleClick={() => props.selecting.highlight ? null : props.setCurrentlySelecting(!props.selecting.highlight, [...props.selecting.files])}>
                <div
                    onClick={() => !props.selecting.highlight ? history.push(`/view/${props.item.id}`) : null}>
                    <ButtonBase>
                        <Checkbox
                            disableRipple
                            onChange={(e) => props.setCurrentlySelecting(props.selecting.highlight, e.target.checked ? [...props.selecting.files, props.item] : [...props.selecting.files.filter(file => file.id !== props.item.id)])}
                            disabled={!props.selecting.highlight} readOnly={!props.selecting.highlight}
                            checked={!!props.selecting.files.find(file => file.id === props.item.id)}
                            className={"p-0 m-0 rounded"}
                            checkedIcon={
                                <Box className={"rounded"}>
                                    <Card style={{minHeight: "8.325rem", minWidth: "8.325rem"}}>
                                        <div style={{
                                            position: "absolute",
                                            maxHeight: "8.325rem",
                                            maxWidth: "8.325rem"
                                        }}>
                                            <img alt={""} loading={"lazy"}
                                                 src={props.item.thumbnail}
                                                 onError={(e) => (e.target.onerror = null, e.target.src = imageErrorSrc)}
                                                 style={{minHeight: "8.325rem", minWidth: "8.325rem"}}
                                                 className="h-100 w-100 p-0 m-0"/>
                                        </div>
                                        <div
                                            style={{
                                                minHeight: "8.325rem",
                                                minWidth: "8.5rem",
                                                backgroundImage: "linear-gradient(to top, rgba(0,0,0,0.65) 0%,rgba(0,0,0,0) 100%)",
                                                position: "absolute"
                                            }}/>
                                        <Fade in={true}>
                                            <div
                                                className={"rounded"}
                                                style={{
                                                    minHeight: "8.325rem",
                                                    minWidth: "8.5rem",
                                                    backgroundColor: "#E8F0FE",
                                                    position: "absolute",
                                                    opacity: 0.5
                                                }}/>
                                        </Fade>
                                    </Card>
                                </Box>
                            }
                            icon={
                                <Box className={"rounded"}>
                                    <Card style={{minHeight: "8.325rem", minWidth: "8.325rem"}}>
                                        <div style={{
                                            position: "absolute",
                                            maxHeight: "8.325rem",
                                            maxWidth: "8.325rem"
                                        }}>
                                            <img alt={""} loading={"lazy"}
                                                 src={props.item.thumbnail}
                                                 onError={(e) => (e.target.onerror = null, e.target.src = imageErrorSrc)}
                                                 style={{minHeight: "8.325rem", minWidth: "8.325rem"}}
                                                 className="h-100 w-100 p-0 m-0"/>
                                        </div>
                                        <div
                                            style={{
                                                minHeight: "8.325rem",
                                                minWidth: "8.5rem",
                                                backgroundImage: "linear-gradient(to top, rgba(0,0,0,0.65) 0%,rgba(0,0,0,0) 100%)",
                                                position: "absolute"
                                            }}/>

                                    </Card>
                                </Box>
                            }/>
                    </ButtonBase>
                </div>
                <Box pr={2} style={{display: "flex", justifyContent: "space-between"}} className={"mt-1 px-0"}>
                    <div className={"mr-2"} style={{marginTop: "0.30rem"}}>
                        {props.item.iconJSX}
                    </div>
                    <Typography noWrap gutterBottom className={`text-truncate mt-2`}>
                        {props.item.name}
                    </Typography>
                    <IconButton style={{width: "1rem", height: "1rem"}} className={"mt-2 mx-0"}
                                onClick={() => props.setFileInfo(props.item)}>
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
export default memo(pure(FileCardComponent));
//export default pure(FileCardComponent);
