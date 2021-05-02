import { GET_DOCUMENT_LIST, GET_DOCUMENT_LIST_SUCCESS, DOCUMENT_LIST_ERROR } from '../types';
import axios from 'axios';

export const fetchDocuments = () => dispatch => {
    return new Promise(async (resolve, reject) => {
        try {
            dispatch({
                type: GET_DOCUMENT_LIST
            });
            const res = await axios.get(`https://spreadsheets.google.com/feeds/cells/15K1aM5bdRaEj24o7_GNSEXXE6qmCCjqgCMCU2rePtzY/1/public/full?alt=json`)
            console.log(res);
            dispatch({
                type: GET_DOCUMENT_LIST_SUCCESS,
                payload: res.data
            });
            resolve(res);
        }
        catch (error) {
            dispatch({
                type: DOCUMENT_LIST_ERROR,
                payload: error,
            });
            reject(error);
        }
    })
}