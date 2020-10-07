import {SET_UPLOADING_FILES} from "../actions/actions";

const initialState = {
    filesUploading: [],
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_UPLOADING_FILES:
            return {
                filesUploading: action.filesUploading,
            };
        default:
            return state;
    }
};

export default rootReducer;
