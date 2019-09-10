// import { createAppContainer, createSwitchNavigator } from "react-navigation";

// import screens
import Welcome from "../screen/Welcome";
import Login from "../screen/Login";
import Menu from '../screen/DrawerMenu';
import AuthLoadingScreen from '../screen/AuthLoadingScreen';
import {height, width} from '../constants/dimenstion';
import ForgotPassword from '../screen/ForgotPassword';
import SignUp from '../screen/SignUp';
import GetPosition from '../screen/GetPosition'
// const Screens = createSwitchNavigator({
//   Welcome,
//   Login
// });

// export default createAppContainer(Screens);
import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  Button,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { createStackNavigator, createSwitchNavigator, createAppContainer, createDrawerNavigator } from 'react-navigation';

class SignInScreen extends React.Component {
  static navigationOptions = {
    title: 'Please sign in',
  };

  render() {
    return (
      <View style={styles.container}>
        <Button title="Sign in!" onPress={this._signInAsync} />
      </View>
    );
  }

  _signInAsync = async () => {
    await AsyncStorage.setItem('userToken', 'abc');
    this.props.navigation.navigate('App');
  };
}

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome to the app!',
  };

  render() {
    return (
      <View style={styles.container}>
        <Button title="Show me more of the app" onPress={() => {this.props.navigation.toggleDrawer();}} />
        <Button title="Actually, sign me out :)" onPress={this._signOutAsync} />
      </View>
    );
  }

  _showMoreApp = () => {
    this.props.navigation.navigate('Other');
  };

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };
}

class OtherScreen extends React.Component {
  static navigationOptions = {
    title: 'Lots of features here',
  };

  render() {
    return (
      <View style={styles.container}>
        <Button title="I'm done, sign me out" onPress={this._signOutAsync} />
        <StatusBar barStyle="default" />
      </View>
    );
  }

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const AppStack = createStackNavigator({ Home: HomeScreen, Other: OtherScreen });
const AuthStack = createStackNavigator({ Welcome: Welcome, SignIn: Login, ForgotPassword: ForgotPassword, SignUp: SignUp, GetPosition: GetPosition },
  {
      initialRouteName: 'Welcome',
      headerMode: 'none',
      navigationOptions: {
          headerVisible: false
      }
  });
export const MenuNavigator = createDrawerNavigator({
    MenuNav: AppStack
},
{
    drawerWidth: Math.min(height, width) * 0.7,
    drawerPosition: 'left',
    contentComponent: props => <Menu {...props} />,
    backBehavior: 'none'
});
export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: MenuNavigator,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));
