import { DrawerActions, NavigationActions, StackActions } from 'react-navigation';
import { saveAccessToken, saveRefreshToken } from '../utils/asyncStorage';

export function logout(self) {
    return (dispatch) => {
        self.props.navigation.dispatch(DrawerActions.closeDrawer());
        // const resetAction = DrawerActions.reset({
        //     index: 0,
        //     actions: [NavigationActions.navigate({ routeName: 'SignIn' })],
        // });
        self.props.navigation.navigate('SignIn');
        saveAccessToken();
        saveRefreshToken('');
        dispatch({
            type: 'LOGOUT'
        });
    };
}
