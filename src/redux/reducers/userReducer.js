
const initialState = {
    accessToken: null,
    refreshToken: null,
    signin: false,
    loading: false,
    error: false,
    logoUrl: null,
    coverUrl: null,
    regionName: null,
    employerName: null,
    lastName: null
};

const UserReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'START_GET_TOKEN':
            return {...state, accessToken: null, refreshToken: null, signin: null, loading: null, error: null}
        case 'SUCCESS_GET_AND_UPDATE_TOKEN':
            return {...state, accessToken: action.token, refreshToken: action.refreshToken, signin: true, loading: false, error: false}
        case 'ERROR_GET_TOKEN':
            return {...state, accessToken: null, refreshToken: null, signin: false, loading: false, error: true}
        case 'UPDATE_HEADER_PROFILE':
            return {...state, logoUrl: action.logoUrl, coverUrl: action.coverUrl, regionName: action.regionName, employerName: action.employerName}
        case 'LOGOUT':
            return {...state, accessToken: null, refreshToken: null, signin: false, loading: false, error: false, avatarUrl: null, coverUrl: null, regionName: null, employerName: null}
    default:
        return state;
    }
};

export default UserReducer;
