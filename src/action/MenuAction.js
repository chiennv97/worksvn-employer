import { DrawerActions, NavigationActions, StackActions } from 'react-navigation';
import { saveAccessToken, saveRefreshToken } from '../utils/asyncStorage';

export function logout(self) {
    return (dispatch) => {
        self.props.navigation.dispatch(DrawerActions.closeDrawer());
        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'SignIn' })],
        });
        self.props.navigation.dispatch(resetAction);
        saveAccessToken();
        saveRefreshToken('');
        dispatch({
            type: 'LOGOUT'
        });
    };
}
