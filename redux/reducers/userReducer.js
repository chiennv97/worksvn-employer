const initialState = {
    token: '',
    refreshToken: '',
};

const UserReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_CURRENT_TOKEN':
            return {...state, token: action.payload}
        case 'UPDATE_CURRENT_REFRESHTOKEN':
            return {...state, refreshToken: action.payload}
        default:
            return state;
    }
};

export default UserReducer;
