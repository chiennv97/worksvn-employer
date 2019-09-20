
export function updateSnackbar(visible, dataSnackbar) {
    return (dispatch) => {
        dispatch({
            type: 'UPDATE_SNACKBAR', visible: visible, dataSnackbar: dataSnackbar
        });
    };
}

export function setActivePost(listJobs, numberActivePost) {
    return (dispatch) => {
        dispatch({
            type: 'SET_ACTIVE_JOB', activePost: listJobs, numberActivePost: numberActivePost
        });
    };
}
export function setExpiredPost(listJobs, numberExpiredPost) {
    return (dispatch) => {
        dispatch({
            type: 'SET_EXPIRED_JOB', expiredPost: listJobs, numberExpiredPost: numberExpiredPost
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
export function setSaveCandidates(listCandidates) {
    return (dispatch) => {
        dispatch({
            type: 'SET_SAVED_CANDIDATES', savedCandidates: listCandidates
        });
    };
}