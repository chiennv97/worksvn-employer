

const initialState = {
    jobName: null,
    lat: null,
    lon: null,
    addressStr: null
};

const dataReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_JOBNAME':
            return {...state, jobName: action.jobName}
        case 'UPDATE_POSITION':
            return {...state, lat: action.lat, lon: action.lon, addressStr: action.addressStr}
        default:
            return state;
    }
};

export default dataReducer;
