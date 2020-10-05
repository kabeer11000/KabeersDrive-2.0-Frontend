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
export const detectIcon = (mime) => {
    switch (true) {
        case IconDictionary.image.includes(mime):
            return <Image/>;
        case IconDictionary.video.includes(mime):
            return <Movie/>;
        case IconDictionary.code.includes(mime):
            return <Code/>;
        case IconDictionary.doc.includes(mime):
            return <InsertDriveFile/>;
        case IconDictionary.txt.includes(mime):
            return <Subject/>;
        case IconDictionary.pdf.includes(mime):
            return <PictureAsPdf/>;
        default:
            return <BrokenImage/>;
    }
};
export const detectMime = (file) => {
    switch (true) {
        case IconDictionary.image.includes(file.mime):
            return {
                "data-type": "image",
                "data-src": file.path
            };
        case IconDictionary.video.includes(file.mime):
            return {
                "data-type": "video",
                "data-src": file.path
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
