import { Alert } from 'react-native';
import {strings} from '../constants/Strings';

export default function alertMsgErrorCallApi(msg, line) {
    var message;
    console.log(line);
    if (msg === 401) {
        message = strings.access_token_expired;
    } else if (msg === 403) {
        message = strings.your_role_is_not_allowed;
    } else if (msg === 500) {
        message = strings.internal_server_error;
    } else if (msg === 400){
        message = strings.invalid_fields;
    } else {
        message = msg.toString();
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
