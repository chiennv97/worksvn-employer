// import { NavigationActions, StackActions } from 'react-navigation';
// import base64 from 'react-native-base64';
import request from '../utils/request';
import {BASE_URL} from '../constants/Url';
import { 
    EMPLOYERS_API, OAUTH2_API, SECRET, CLIEN_ID
} from '../constants/Constants';
import { saveAccessToken, saveRefreshToken } from '../utils/asyncStorage';
import alertMsgErrorCallApi from '../utils/alertMsgErrorCallApi';
import {strings} from '../constants/Strings';
// const avt = require()

export function loginSuccess(token, refreshToken) {
    return {
        type: 'SUCCESS_GET_AND_UPDATE_TOKEN',
        token,
        refreshToken
    };
}


export function authorAction(self, email, pass) {
    //   const Authorization = `Basic ${base64.encode(`${email}:${pass}`)}`;
    return (dispatch) => {
        console.log(`${BASE_URL.url}${OAUTH2_API}authentication/username-password`)
        return request
            .post(`${BASE_URL.url}${OAUTH2_API}authentication/username-password`)
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set('client_id', CLIEN_ID)
            .set('secret', SECRET)
            .send({
                'username': email,
                'password': pass
            })
            .finish((err, res) => {
                // console.log(err);
                // console.log(res);
                if (res !== null && res !== undefined) {
                    if (res.statusCode === 200) {
                        saveAccessToken(res.body.data.accessToken);
                        saveRefreshToken(res.body.data.accessToken);
                        dispatch({
                            type: 'SUCCESS_GET_AND_UPDATE_TOKEN',
                            token: res.body.data.accessToken,
                            refreshToken: res.body.data.refreshToken
                        });    
                        console.log(`${BASE_URL.url}${EMPLOYERS_API}candidates/headerProfile`)
                        console.log(res)
                        // request
                        //     .get(`${BASE_URL.url}${CANDIDATES_API}candidates/headerProfile`)
                        //     .set('Content-Type', 'application/json')
                        //     .set('Authorization', `Bearer ${res.body.data.accessToken}`)
                        //     .finish((err2, res2) => {
                        //         dispatch({
                        //             type: UPDATE_HEADER_PROFILE,
                        //             avatarUrl: res2.body.data.avatarUrl ? res2.body.data.avatarUrl: null  ,
                        //             coverUrl: res2.body.data.coverUrl,
                        //             regionName: res2.body.data.regionName,
                        //             firstName: res2.body.data.firstName,
                        //             lastName: res2.body.data.lastName
                        //         });
                        //     });
                        self.props.navigation.navigate('Home');
                    } else {
                        alertMsgErrorCallApi(res.statusCode, 'AuthorAction.js - 73');
                    }
                } else if (err !== null) {
                    alertMsgErrorCallApi(err.toString(), 'AuthorAction.js - 76');
                } else {
                    alertMsgErrorCallApi(strings.final_error_msg, 'AuthorAction.js - 79');
                }
            });
    };
}

export function signUp(_email, _pass, self, _candidateRegisterBody) {
    //  const Authorization = `Basic ${base64.encode(`${email}:${pass}`)}`;
    console.log('========candidateRegisterBody=======');
    console.log(_candidateRegisterBody);
    return new Promise((resolve, reject) => {
        console.log('=========RETURN=========');
        //dispatch
        // return 
        request
            .post(`${BASE_URL.url}${CANDIDATES_API}candidates/registration/email`)
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            // .set('Authorization', Authorization)
            .send({
                // candidateRegisterBody: JSON.stringify(_candidateRegisterBody)
                email: _email,
                password: _pass,
                firstName: _candidateRegisterBody.firstName,
                lastName: _candidateRegisterBody.lastName,
                gender: _candidateRegisterBody.gender,
                phone: _candidateRegisterBody.phone,
                lat: _candidateRegisterBody.lat ? _candidateRegisterBody.lat : 0,
                lon: _candidateRegisterBody.lon ? _candidateRegisterBody.lon : 0,
            })
            .finish((err, res) => {
                console.log('=======ERR=======');
                console.log(err);
                console.log('=========Res========');
                console.log(res);
                console.log(res.statusCode);
                if (err) {
                    let errorMessage;
                    if (res) {
                        if (res.statusCode === 400) {
                            errorMessage = strings.wrong_username_or_passowrd;
                        } else if (res.statusCode === 404) {
                            errorMessage = strings.notfound;
                        } else {
                            errorMessage = strings.internal_server_error;
                        }
                    } else {
                        errorMessage = strings.network_require_fail;
                    }
                    reject(errorMessage);
                } else {
                    resolve(res);
                }
            });
    });
}
