

const initialState = {
    jobName: null,
    lat: null,
    lon: null,
    addressStr: null,
    snackbar: false,
    dataSnackbar: null,
    activePost: null
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
            return {...state, activePost: action.activePost}
        case 'UPDATE_ACTIVE_JOB':
            return {...state, activePost: activePost.concat(action.activePost) }        
        case 'REMOVE_INDEX_ACTIVE_JOB':
            return {...state, activePost: action.activePost}      
        default:
            return state;
    }
};

export default dataReducer;
