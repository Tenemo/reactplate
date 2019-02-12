import initialState from 'store/intialState';

function actionTypeIsRequestEnd(type) {
    return (
        type.substring(type.length - 8) === '_SUCCESS' ||
        type.substring(type.length - 8) === '_FAILURE'
    );
}
function actionTypeIsRequest(type) {
    return type.substring(type.length - 8) === '_REQUEST';
}

export default function ajaxStatusReducer(state = initialState.requestsInProgress, action) {
    if (actionTypeIsRequest(action.type)) {
        return state + 1;
    }
    if (actionTypeIsRequestEnd(action.type)) {
        return state - 1;
    }
    return state;
}
