import request from '../utils/request';
import { EMPLOYERS_API } from '../constants/Constants';
import {BASE_URL} from '../constants/Url';
import {alertMsgErrorCallApi, alertMsgErrorCallApiString} from '../utils/alertMsgErrorCallApi';
import {strings} from '../constants/Strings';

export function getJobs(self, token, pageIndex) {
    return new Promise((resolve, reject) => {
        request
            .post(`${BASE_URL.url}${EMPLOYERS_API}employers/jobs/query?pageIndex=${pageIndex}&pageSize=10&sortBy=j.createdDate&sortType=desc`)
            .set('Authorization', `Bearer ${token}`)
            .set('Content-Type', 'application/json')
            .send({
                "expired": false
            })
            .finish((err, res) => {
                console.log(res);
                if (res !== null && res !== undefined) {
                    if (res.statusCode === 200) {
                        resolve(res.body.data.items);
                    } else {
                        alertMsgErrorCallApi(res, 'SearchFunc.js - 18');
                        reject();
                    }
                } else if (err !== null) {
                        alertMsgErrorCallApiString(strings.network_require_fail, 'SearchFunc.js - 22');
                        reject();
                    } else {
                        alertMsgErrorCallApiString(strings.final_error_msg, 'SearchFunc.js - 29');
                        reject();
                    }
            });
    });
}

export function showOrHiddenPost(self, token, status, id) {
    return new Promise((resolve, reject) => {
        request
            .put(`${BASE_URL.url}${EMPLOYERS_API}employers/jobs/${id}/hidden/${status}`)
            .set('Authorization', `Bearer ${token}`)
            .set('Content-Type', 'application/json')
            .finish((err, res) => {
                console.log(res);
                if (res !== null && res !== undefined) {
                    if (res.statusCode === 200) {
                        resolve(res.body);
                    } else {
                        alertMsgErrorCallApi(res, 'SearchFunc.js - 18');
                        reject();
                    }
                } else if (err !== null) {
                        alertMsgErrorCallApiString(strings.network_require_fail, 'SearchFunc.js - 22');
                        reject();
                    } else {
                        alertMsgErrorCallApiString(strings.final_error_msg, 'SearchFunc.js - 29');
                        reject();
                    }
            });
    });
}
export function extendPost(self, token, id) {
    return new Promise((resolve, reject) => {
        request
            .put(`${BASE_URL.url}${EMPLOYERS_API}employers/jobs/${id}/expirationDate/extend`)
            .set('Authorization', `Bearer ${token}`)
            .set('Content-Type', 'application/json')
            .send({'extend': 'ONE_WEEK'})
            .finish((err, res) => {
                console.log(res);
                if (res !== null && res !== undefined) {
                    if (res.statusCode === 200) {
                        resolve(res.body);
                    } else {
                        alertMsgErrorCallApi(res, 'SearchFunc.js - 18');
                        reject();
                    }
                } else if (err !== null) {
                        alertMsgErrorCallApiString(strings.network_require_fail, 'SearchFunc.js - 22');
                        reject();
                    } else {
                        alertMsgErrorCallApiString(strings.final_error_msg, 'SearchFunc.js - 29');
                        reject();
                    }
            });
    });
}
export function removePost(self, token, id) {
    return new Promise((resolve, reject) => {
        request
            .delete(`${BASE_URL.url}${EMPLOYERS_API}employers/jobs/${id}`)
            .set('Authorization', `Bearer ${token}`)
            .set('Content-Type', 'application/json')
            .finish((err, res) => {
                console.log(res);
                if (res !== null && res !== undefined) {
                    if (res.statusCode === 200) {
                        resolve(res.body);
                    } else {
                        alertMsgErrorCallApi(res, 'SearchFunc.js - 18');
                        reject();
                    }
                } else if (err !== null) {
                        alertMsgErrorCallApiString(strings.network_require_fail, 'SearchFunc.js - 22');
                        reject();
                    } else {
                        alertMsgErrorCallApiString(strings.final_error_msg, 'SearchFunc.js - 29');
                        reject();
                    }
            });
    });
}