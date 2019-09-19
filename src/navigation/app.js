// import { createAppContainer, createSwitchNavigator } from "react-navigation";

// import screens
import Welcome from "../screen/Welcome";
import Login from "../screen/Login";
import Menu from '../screen/DrawerMenu';
import AuthLoadingScreen from '../screen/AuthLoadingScreen';
import SplashComponent from '../screen/Splash';
import {height, width} from '../constants/dimenstion';
import ForgotPassword from '../screen/ForgotPassword';
import SignUp from '../screen/SignUp';
import GetPosition from '../screen/GetPosition';
import Icon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {MAIN_COLOR} from '../constants/Constants';
import HeaderManager from '../components/HeaderManager'
import React from 'react';
import {strings} from '../constants/Strings';
import ActivePost from '../screen/ActivePost';
import JobDetail from '../screen/JobDetail';
import Profile from '../screen/Profile';
import Apply from '../screen/Apply';
import CandidateProfile from '../screen/CandidateProfile'
import {
  SafeAreaView,
  AsyncStorage,
  Button,
  StatusBar,
  StyleSheet,
  View,
  Animated,
  Easing
} from 'react-native';
import { createStackNavigator, createSwitchNavigator, createAppContainer, createDrawerNavigator, createMaterialTopTabNavigator, MaterialTopTabBar } from 'react-navigation';
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";


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
function SafeAreaMaterialTopTabBar (props) {
  return (
    <React.Fragment>
      <SafeAreaView style={{ flex:0, backgroundColor: MAIN_COLOR }} />
      <StatusBar barStyle="light-content" />
      <SafeAreaView>
        <HeaderManager
                bodyTitle={strings.manager_post}
                onPress={() => {
                  props.navigation.toggleDrawer(); 
                }}
                onPressRight={() => {
                    
                }}
                iconRight={'search'}
                iconLeft={'menu'}
          />
        <MaterialTopTabBar {...props}/>
        
      </SafeAreaView>
    </React.Fragment>
    
  )
}
const ManagerTab = createMaterialTopTabNavigator ({
  ActivePost: {
    screen: ActivePost,
  },
  InActivePost: {
    screen: SignInScreen,
    navigationOptions: {
      tabBarLabel: 'Đã hết hạn',
    }
  },
  
}, {
  tabBarAccessibilityLabel: true,
  tabBarComponent: SafeAreaMaterialTopTabBar
})

const BottomTab = createMaterialBottomTabNavigator({
  Manager: {
    screen: ManagerTab,
    navigationOptions: {
        tabBarLabel: 'Quản lý',
        tabBarIcon: ({ tintColor }) => (
                <AntDesign style={{color: tintColor }} name="bars" size={26} />
        ),
    }},
  Alert: {
    screen: SignInScreen,
    navigationOptions: {
        tabBarLabel: 'Thông báo',
        tabBarIcon: ({ tintColor }) => (
                <Icon style={{color: tintColor }} name="md-notifications-outline" size={26} />
            
        ),
    },
    
  },
  Message: {
    screen: SignInScreen,
    navigationOptions: {
        tabBarLabel: 'Nhắn tin',
        tabBarIcon: ({ tintColor }) => (
            
                <Entypo style={{color: tintColor }} name="message" size={26} />
            
        ),
    },
    
  },
  ProfileSaved: {
    screen: SignInScreen,
    navigationOptions: {
        tabBarLabel: 'Hồ sơ đã lưu',
        tabBarIcon: ({ tintColor }) => (
                <MaterialCommunityIcons style={{color: tintColor }} name="file-document-outline" size={26} />
        ),
    },
    
  },
}, {
  initialRouteName: 'Manager',
  activeColor: MAIN_COLOR,
  inactiveColor: '#A9A9A9',
  barStyle: { backgroundColor: '#fff'},
  shifting: true,
  labeled: true,
});
const AppStack = createStackNavigator({ BottomTab: BottomTab, Home: HomeScreen, JobDetail: JobDetail, Profile: Profile, Apply:  Apply, CandidateProfile: CandidateProfile}, { headerMode: 'none', transitionConfig : () => ({
	transitionSpec: {
		duration: 0,
		timing: Animated.timing,
		easing: Easing.step0,
	},
}), });
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
    AuthLoading: SplashComponent,
    App: MenuNavigator,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));
