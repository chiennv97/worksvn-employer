import { Alert } from 'react-native';
import {strings} from '../constants/Strings';

export function alertMsgErrorCallApi(res, line) {
    let message;
    console.log(line);
    if(res && res.body && res.body.code && res.body.data && res.body.data[0] && res.body.data[0]){
        message =  res.body.data[0].target + ': ' + res.body.data[0].required;
    } else if(res && res.body && res.body.code && res.body.msg) {
        message = res.body.msg;
    } else {
        if(res.status){
            message = codeToMessage(res.status);
        } else if(res.statusCode) {
            message = codeToMessage(res.statusCode);
        }
    }

    
    Alert.alert(
        strings.notification,
        message,
        [
            { text: 'OK', onPress: () => console.log('OK Pressed') },
        ],
        {cancelable: false},
    );
}
export function alertMsgErrorCallApiString(message, line) {
    console.log(line);
    Alert.alert(
        strings.notification,
        message,
        [
            { text: 'OK', onPress: () => console.log('OK Pressed') },
        ],
        {cancelable: false},
    );
}
function codeToMessage(code) {
    if (code === 401) {
        return strings.access_token_expired;
    } else if (code === 403) {
        return strings.your_role_is_not_allowed;
    } else if (code === 500) {
        return strings.internal_server_error;
    } else if (code === 400){
        return strings.invalid_fields;
    } 
    return code.toString();
}