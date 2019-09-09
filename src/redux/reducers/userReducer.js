
const initialState = {
    accessToken: null,
    refreshToken: null,
    signin: false,
    loading: false,
    error: false,
    avatarUrl: null,
    coverUrl: null,
    regionName: null,
    firstName: null,
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
            return {...state, avatarUrl: action.avatarUrl, coverUrl: action.coverUrl, regionName: action.regionName, firstName: action.firstName, lastName: action.lastName}
        case 'LOGOUT':
            return {...state, accessToken: null, refreshToken: null, signin: false, loading: false, error: false, avatarUrl: null, coverUrl: null, regionName: null, firstName: null, lastName: null}
    default:
        return state;
    }
};

export default UserReducer;
