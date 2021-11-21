import {
    FETCH_URLS,
    FETCH_CLICKS
} from "../actions/types";

const initialState = {
    urllist: [],
    urlcli: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_URLS: return {
            ...state,
            urllist: action.payload
        };
        case FETCH_CLICKS: return {
            ...state,
            urlcli: action.payload
        };
        default: return state;
    }
}

