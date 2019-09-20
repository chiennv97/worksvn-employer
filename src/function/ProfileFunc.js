import request from '../utils/request';
import { EMPLOYERS_API } from '../constants/Constants';
import {BASE_URL} from '../constants/Url';
import {alertMsgErrorCallApi, alertMsgErrorCallApiString} from '../utils/alertMsgErrorCallApi';
import {strings} from '../constants/Strings';

export function getProfile(token) {
    return new Promise((resolve, reject) => {
        request
            .get(`${BASE_URL.url}${EMPLOYERS_API}employers/profile`)
            .set('Authorization', `Bearer ${token}`)
            .set('Content-Type', 'application/json')
            .finish((err, res) => {
                console.log(res);
                if (res !== null && res !== undefined) {
                    if (res.statusCode === 200) {
                        resolve(res.body.data);
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
export function getCandidateProfile(token, jid, cid) {
    return new Promise((resolve, reject) => {
        request
            .get(`${BASE_URL.url}${EMPLOYERS_API}employers/jobs/${jid}/appliedCandidates/${cid}/profile`)
            .set('Authorization', `Bearer ${token}`)
            .set('Content-Type', 'application/json')
            .finish((err, res) => {
                console.log(res);
                if (res !== null && res !== undefined) {
                    if (res.statusCode === 200) {
                        resolve(res.body.data);
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
export function getCandidateProfileSaved(token, id) {
    return new Promise((resolve, reject) => {
        request
            .get(`${BASE_URL.url}${EMPLOYERS_API}employers/savedCandidates/${id}/profile`)
            .set('Authorization', `Bearer ${token}`)
            .set('Content-Type', 'application/json')
            .finish((err, res) => {
                console.log(res);
                if (res !== null && res !== undefined) {
                    if (res.statusCode === 200) {
                        resolve(res.body.data);
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
export function changeStateCandidate(token, jid, cid, state) {
    return new Promise((resolve, reject) => {
        request
            .put(`${BASE_URL.url}${EMPLOYERS_API}employers/jobs/${jid}/appliedCandidates/${cid}/${state}`)
            .set('Authorization', `Bearer ${token}`)
            .set('Content-Type', 'application/json')
            .finish((err, res) => {
                console.log(res);
                if (res !== null && res !== undefined) {
                    if (res.statusCode === 200) {
                        resolve(res.body.data);
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
export function saveCandidate(token, id) {
    return new Promise((resolve, reject) => {
        request
            .post(`${BASE_URL.url}${EMPLOYERS_API}employers/savedCandidates/${id}`)
            .set('Authorization', `Bearer ${token}`)
            .set('Content-Type', 'application/json')
            .finish((err, res) => {
                console.log(res);
                if (res !== null && res !== undefined) {
                    if (res.statusCode === 200) {
                        resolve(res.body.data);
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
export function removeSaveCandidate(token, id) {
    return new Promise((resolve, reject) => {
        request
            .delete(`${BASE_URL.url}${EMPLOYERS_API}employers/savedCandidates/${id}`)
            .set('Authorization', `Bearer ${token}`)
            .set('Content-Type', 'application/json')
            .finish((err, res) => {
                console.log(res);
                if (res !== null && res !== undefined) {
                    if (res.statusCode === 200) {
                        resolve(res.body.data);
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