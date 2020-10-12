import {BrokenImage, Code, Image, InsertDriveFile, Movie, PictureAsPdf, Subject} from "@material-ui/icons";
import React from "react";
import {endPoints} from "../api/EndPoints";

export const IconDictionary = {
    image: [
        "image/png",
        "image/jpg",
        "image/jpeg",
        "image/gif",
        "image/svg",
        "image/svg+xml",
    ],
    video: [
        "video/ogg",
        "video/m4a",
        "video/ogg",
        "video/mov",
        "video/mp4"
    ],
    code: [
        "text/css",
        "text/x-php",
        "text/html",
        "text/xhtml",
        "text/javscript"
    ],
    doc: [
        "application/vnd.ms-powerpoint",
        "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        "application/rtf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ],
    txt: [
        "text/plain",

    ],
    pdf: [
        "application/pdf",
        "application/x-pdf",
    ],
    none: []
};
export const detectIcon = (type) => {
    switch (type) {
        case "image":
            return <Image/>;
        case "video":
            return <Movie/>;
        case "code":
            return <Code/>;
        case "document":
            return <InsertDriveFile/>;
        case "text":
            return <Subject/>;
        case "pdf":
            return <PictureAsPdf/>;
        default:
            return <BrokenImage/>;
    }
};
export const detectMime = (file) => {
    const driveRawPath = `http://drive.hosted-kabeersnetwork.unaux.com/user-files`;
    switch (true) {
        case IconDictionary.image.includes(file.mime):
            return {
                "data-type": "image",
                "data-src": `${driveRawPath}/${file.path}`
            };
        case IconDictionary.video.includes(file.mime):
            return {
                "data-type": "video",
                "data-src": `${driveRawPath}/${file.path}`
            };
        case IconDictionary.code.includes(file.mime):
            return {
                "data-type": "iframe",
                "data-src": endPoints.textFileViewer(file.id)
            };
        case IconDictionary.doc.includes(file.mime):
            return {
                "data-type": "iframe",
                "data-src": endPoints.documentViewer(file.path)
            };
        case IconDictionary.txt.includes(file.mime):
            return {
                "data-type": "iframe",
                "data-src": endPoints.textFileViewer(file.id)
            };
        case IconDictionary.pdf.includes(file.mime):
            return {
                "data-type": "iframe",
                "data-src": endPoints.documentViewer(file.path)
            };
        default:
            return {
                "data-type": "iframe",
                "data-src": endPoints.noPreviewAvailable(file.id)
            };
    }
};
