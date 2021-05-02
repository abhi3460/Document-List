import { GET_DOCUMENT_LIST, GET_DOCUMENT_LIST_SUCCESS, DOCUMENT_LIST_ERROR } from '../types';

const initialState = {
    docs: [],
    loading: false,
    error: null
}

export function rootReducer (state = initialState, action) {
    switch (action.type) {
        case GET_DOCUMENT_LIST:
            return {
                loading: true
            }
        case GET_DOCUMENT_LIST_SUCCESS:
            return {
                ...state,
                docs: action.payload,
                loading: false

            }
        case DOCUMENT_LIST_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false

            }
        default: return state
    }
}