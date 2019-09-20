

const initialState = {
    jobName: null,
    lat: null,
    lon: null,
    addressStr: null,
    snackbar: false,
    dataSnackbar: null,
    activePost: null,
    numberActivePost: 0,
    activePost: null,
    numberExpiredPost: 0,
    expiredPost: null,
    savedCandidates: null
};

const dataReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_JOBNAME':
            return {...state, jobName: action.jobName}
        case 'UPDATE_POSITION':
            return {...state, lat: action.lat, lon: action.lon, addressStr: action.addressStr}
        case 'UPDATE_SNACKBAR':
            return {...state, snackbar: action.visible, dataSnackbar: action.dataSnackbar}
        case 'SET_ACTIVE_JOB':
            return {...state, activePost: action.activePost, numberActivePost: action.numberActivePost}
        case 'SET_EXPIRED_JOB':
            return {...state, expiredPost: action.expiredPost, numberExpiredPost: action.numberExpiredPost}
        case 'UPDATE_ACTIVE_JOB':
            return {...state, activePost: activePost.concat(action.activePost) }        
        case 'REMOVE_INDEX_ACTIVE_JOB':
            return {...state, activePost: action.activePost}
        case 'SET_SAVED_CANDIDATES':
            return {...state, savedCandidates: action.savedCandidates}        
        default:
            return state;
    }
};

export default dataReducer;
