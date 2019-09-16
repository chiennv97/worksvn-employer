
export function updateSnackbar(visible, dataSnackbar) {
    return (dispatch) => {
        dispatch({
            type: 'UPDATE_SNACKBAR', visible: visible, dataSnackbar: dataSnackbar
        });
    };
}

export function setActivePost(listJobs) {
    return (dispatch) => {
        dispatch({
            type: 'SET_ACTIVE_JOB', activePost: listJobs
        });
    };
}
export function updateActivePost(listJobs) {
    return (dispatch) => {
        dispatch({
            type: 'UPDATE_ACTIVE_JOB', activePost: listJobs
        });
    };
}
export function removeIndexActivePost( activePost) {
    return (dispatch) => {
        dispatch({
            type: 'REMOVE_INDEX_ACTIVE_JOB', activePost: activePost
        });
    };
}