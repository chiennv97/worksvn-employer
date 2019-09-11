import { getRefreshToken, saveAccessToken, saveRefreshToken, getAccessToken } from '../utils/asyncStorage';
import {
    BASE_URL, ROUTE_KEY,
    UPDATE_HEADER_PROFILE, UPDATE_JOBNAME,
    OAUTH2_API, EMPLOYERS_API, CLIEN_ID, SECRET, PUBLIC_API
} from '../../constants/Constants';
// import {loginError, loginSuccess, startLogin} from "../login/LoginAction";
import request from '../utils/request';
import {alertMsgErrorCallApi, alertMsgErrorCallApiString} from '../utils/alertMsgErrorCallApi';
import strings from '../constants/Strings';

export function exchangeTokenSuccess(token, refreshToken, signin, loading, error) {
    return {
        type: 'SUCCESS_GET_AND_UPDATE_TOKEN',
        token,
        refreshToken,
        signin,
        loading,
        error
    };
}

export function checkWhenOpenApp(self) {
    return dispatch => {
        getRefreshToken()
            .then(refreshToken => {
                if (refreshToken === '') {
                    self.props.navigation.navigate("SignIn");
                } else {
                    console.log(`${BASE_URL.url}${OAUTH2_API}authentication/refresh-token`);
                    request
                        .post(`${BASE_URL.url}${OAUTH2_API}authentication/refresh-token`)
                        .set('Content-Type', 'application/json')
                        .set('client_id', CLIEN_ID )
                        .set('secret', SECRET )
                        .send({
                            refreshToken
                        })
                        .finish((err, res) => {
                            if (res !== null && res !== undefined) {
                                if (res.statusCode === 200) {
                                    saveAccessToken(res.body.data.accessToken);
                                    saveRefreshToken(res.body.data.refreshToken);
                                    dispatch(exchangeTokenSuccess(res.body.data.accessToken,
                                        res.body.data.refreshToken, true, false, false));
                                    console.log(`${BASE_URL.url}${EMPLOYERS_API}candidates/headerProfile`)
                                    request
                                        .get(`${BASE_URL.url}${EMPLOYERS_API}candidates/headerProfile`)
                                        .set('Content-Type', 'application/json')
                                        .set('Authorization', `Bearer ${res.body.data.accessToken}`)
                                        .finish((err2, res2) => {
                                            dispatch({
                                                type: 'UPDATE_HEADER_PROFILE',
                                                avatarUrl: res2.body.data.avatarUrl,
                                                coverUrl: res2.body.data.coverUrl,
                                                regionName: res2.body.data.regionName,
                                                firstName: res2.body.data.firstName,
                                                lastName: res2.body.data.lastName
                                            });
                                        });
                                    // request
                                    //     .get(`${BASE_URL.url}${PUBLIC_API}jobNames/active`)
                                    //     .set('Content-Type', 'application/json')
                                    //     .finish((err3, res3) => {
                                    //         console.log(err3);
                                    //         console.log(res3);
                                    //         dispatch({
                                    //             type: UPDATE_JOBNAME,
                                    //             jobName: res3.body.data.results
                                    //         });
                                    //     });
                                    self.props.navigation.navigate('BottomTab');
                                } else {
                                    alertMsgErrorCallApi(res, 'SplashAction.js - 75');
                                    self.props.navigation.navigate('SignIn');
                                }
                            } else {
                                if (err !== null) {
                                    alertMsgErrorCallApiString(strings.network_require_fail, 'SplashAction.js - 80');
                                } else {
                                    alertMsgErrorCallApiString(strings.final_error_msg, 'SplashAction.js - 99');
                                }
                            }
                        });
                }
            })
            .catch(() => {
                alertMsgErrorCallApiString(strings.final_error_msg, 'SplashAction.js - 108');
            });
    };
}
