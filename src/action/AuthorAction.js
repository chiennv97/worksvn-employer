// import { NavigationActions, StackActions } from 'react-navigation';
// import base64 from 'react-native-base64';
import request from '../utils/request';
import {BASE_URL} from '../constants/Url';
import { 
    EMPLOYERS_API, OAUTH2_API, SECRET, CLIEN_ID
} from '../constants/Constants';
import { saveAccessToken, saveRefreshToken } from '../utils/asyncStorage';
import {alertMsgErrorCallApi, alertMsgErrorCallApiString} from '../utils/alertMsgErrorCallApi';
import {strings} from '../constants/Strings';
import {Alert} from 'react-native';

// const avt = require()


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
                        alertMsgErrorCallApi(res, 'AuthorAction.js - 73');
                    }
                } else if (err !== null) {
                    alertMsgErrorCallApiString(err.toString(), 'AuthorAction.js - 76');
                } else {
                    alertMsgErrorCallApiString(strings.final_error_msg, 'AuthorAction.js - 79');
                }
            });
    };
}

export function signUp(email, pass, employerName, phone, lat, lon, self) {
    return new Promise((resolve, reject) => {
        console.log(`${BASE_URL.url}${EMPLOYERS_API}employers/registration/email`);
        request.post(`${BASE_URL.url}${EMPLOYERS_API}employers/registration/email`)
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .send({
                'email': email,
                'password': pass,
                'employerName': employerName,
                'phone': phone,
                'lat': lat ? lat : 0,
                'lon': lon ? lon : 0
            })
            .finish((err, res) => {
                console.log(res);
                if (res !== null && res !== undefined) {
                    if (res.statusCode === 200) {
                        Alert.alert(
                            strings.notification,
                            strings.signUpSuccess,
                            [
                                { text: 'OK', onPress: () => console.log('OK Pressed') },
                            ],
                            {cancelable: false},
                           );
                          self.props.navigation.navigate('SignIn');
                        resolve(res);
                    } else {
                        alertMsgErrorCallApi(res, 'AuthorAction.js - 73');
                        reject(res.statusCode);
                    }
                } else if (err !== null) {
                    alertMsgErrorCallApiString(err.toString(), 'AuthorAction.js - 76');
                    reject(res.statusCode);
                } else {
                    alertMsgErrorCallApiString(strings.final_error_msg, 'AuthorAction.js - 79');
                    reject(res.statusCode);
                }
            })

    })


}
