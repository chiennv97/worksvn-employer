import request from '../utils/request';
import {
    BASE_URL,
} from '../constants/Url';
import {strings} from '../constants/Strings';
import {alertMsgErrorCallApi, alertMsgErrorCallApiString} from '../utils/alertMsgErrorCallApi';
import {Alert} from 'react-native';
import {EMPLOYERS_API} from '../constants/Constants'
export function sendEmail( _email) {
    return new Promise((resolve, reject) => {
        console.log(`${BASE_URL.url_public}api/users/password/reset`);
        request.post(`${BASE_URL.url_public}oauth2/api/users/password/reset`)
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .send({'email': _email})
            .finish((err, res) => {
                if (err) {
                    console.log(err);
                    alertMsgErrorCallApi(res, 'ForgotPasswordFunc.js - 17');
                    reject(res.statusCode);
                } else {
                    Alert.alert(
                        strings.notification,
                        strings.check_email,
                        [
                            { text: 'OK', onPress: () => console.log('OK Pressed') },
                        ],
                        { cancelable: false },
                    );
                    resolve(res);
                }
            })

    })


}
