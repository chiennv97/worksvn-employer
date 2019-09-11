import { Platform } from 'react-native';
import { MOBILE_API, PUBLIC_API } from '../constants/Constants';
import {BASE_URL} from '../constants/Url';
import {alertMsgErrorCallApi, alertMsgErrorCallApiString} from '../utils/alertMsgErrorCallApi';
import request from '../utils/request';
import {strings} from '../constants/Strings';

export function checkCurrentVersionOnStore() {
    return new Promise((resolve, reject) => {
        console.log(`${BASE_URL.url}${PUBLIC_API}${MOBILE_API}/${Platform.OS}/employer/versionCode`)
        request
            .get(`${BASE_URL.url}${PUBLIC_API}${MOBILE_API}/${Platform.OS}/employer/versionCode`)
            .set('Content-Type', 'application/json')
            .finish((err, res) => {
                if (res !== null && res !== undefined) {
                    if (res.statusCode === 200) {
                        resolve(res.body.data);
                    } else {
                        alertMsgErrorCallApi(res, 'SplashFunc.js - 18');
                        reject();
                    }
                } else {
                    if(err !== null) {
                        alertMsgErrorCallApiString(strings.network_require_fail, 'SplashFunc.js - 23');
                        reject();
                    } else {
                        alertMsgErrorCallApiString(strings.final_error_msg, 'SplashFunc.js - 26');
                        reject();
                    }
                }
            });
    });
}
