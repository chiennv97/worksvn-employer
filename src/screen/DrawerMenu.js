// import { DrawerActions } from 'react-navigation';
import { connect } from 'react-redux';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import React, { Component } from 'react';
import {strings} from '../constants/Strings';
import { NEW_SCALE_RATIO } from '../constants/Constants';
import * as MenuAction from '../action/MenuAction';
import {logo} from '../constants/image'
// const logo = require('./../../assets/imgs/logo_blue.png');

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = { opening: false };
    console.disableYellowBox = true;
  }
  gotoSignIn() {
    // this.props.navigation.toggleDrawer();
    // setTimeout(() => {
    // this.props.navigation.navigate('DrawerClose');
    this.props.navigation.navigate(ROUTE_KEY.SIGN_IN_SCREEN);
    // }, 500);
  }
  gotoSignUp() {
    this.props.navigation.navigate(ROUTE_KEY.SIGN_UP_SCREEN, { address: null });
  }

  render() {
    // if (this.props.navigation.state.routeName === 'SignInScreen') {
    //   this.props.navigation.dispatch(DrawerActions.toggleDrawer());
    // }
    return (
        <SafeAreaView>
            <ScrollView>
                <View style={styles.banner}>
                <Image
                    resizeMode='contain'
                    source={this.props.coverUrl !== null ? { uri: this.props.coverUrl } : logo}
                    style={styles.cover}
                />
                </View>
                <View style={{ flexDirection: 'row', marginLeft : 10 * NEW_SCALE_RATIO, marginTop: 10 * NEW_SCALE_RATIO }}>
                    <Image source={{ uri: this.props.logoUrl }} style={styles.logo} />
                    <View style={{ justifyContent: 'center' }}>
                        <Text style={[styles.titleName]}>{this.props.employerName}</Text>
                        <Text style={[styles.subTitleName, {marginTop: 3 * NEW_SCALE_RATIO}]}>{this.props.regionName}</Text>
                    </View>
                </View>
                <View>
                <View style={styles.title}>
                    <Text style={[styles.titleFuncName]}>{strings.main_func}</Text>
                </View>
                {!this.props.signin ?
                    <View>
                    {/*signin*/}
                    <TouchableOpacity style={styles.funcTab} onPress={() => { this.gotoSignIn(); }}>
                        <View>
                        <MaterialCommunityIcons
                            name='login-variant'
                            size={18 * NEW_SCALE_RATIO}
                            style={styles.icon}
                        />
                        </View>
                        <View style={styles.funcContent}>
                        <Text style={styles.funcName} >{strings.login}</Text>
                        </View>
                    </TouchableOpacity>
                    {/*signup*/}
                    <TouchableOpacity
                        style={styles.funcTabEnd} onPress={() => { this.gotoSignUp(); }}
                    >
                        <Entypo
                        name='key'
                        size={18 * NEW_SCALE_RATIO}
                        style={styles.icon}
                        />
                        <View style={styles.funcContent}>
                        <Text style={styles.funcName} >{strings.signup}</Text>
                        </View>
                    </TouchableOpacity>
                    </View>
                    : null
                }
                {this.props.signin ?
                    <View>
                    {/* user */}
                    <TouchableOpacity style={styles.funcTab} onPress={() => { }}>
                        <MaterialCommunityIcons
                        name='account-outline'
                        size={20 * NEW_SCALE_RATIO}
                        style={styles.icon}
                        />
                        <View style={styles.funcContent}>
                        <Text style={styles.funcName}>{strings.acc}</Text>
                        </View>
                    </TouchableOpacity>
                    {/* view check */}
                    <TouchableOpacity style={styles.funcTab} onPress={() => { }}>
                        <MaterialIcons
                        name='rate-review'
                        size={20 * NEW_SCALE_RATIO}
                        style={styles.icon}
                        />
                        <View style={styles.funcContent}>
                        <Text style={styles.funcName}>{strings.review}</Text>
                        </View>
                    </TouchableOpacity>
                    {/* Lich sử ứng tuyển */}
                    <TouchableOpacity style={styles.funcTab} onPress={() => { }}>
                        <MaterialCommunityIcons
                        name='history'
                        size={20 * NEW_SCALE_RATIO}
                        style={styles.icon}
                        />
                        <View style={styles.funcContent}>
                        <Text style={styles.funcName}>{strings.history}</Text>
                        </View>
                    </TouchableOpacity>
                    {/* change pass */}
                    <TouchableOpacity style={styles.funcTab} onPress={() => {this.props.navigation.navigate(ROUTE_KEY.CHANGE_PASSWORD)}}>
                        <MaterialCommunityIcons
                        name='lock-reset'
                        size={20 * NEW_SCALE_RATIO}
                        style={styles.icon}
                        />
                        <View style={styles.funcContent}>
                        <Text style={styles.funcName}>{strings.change_pass}</Text>
                        </View>
                    </TouchableOpacity>
                    {/* Test MBTI */}
                    <TouchableOpacity style={styles.funcTabEnd} onPress={() => { }}>
                        <MaterialCommunityIcons
                        name='checkbox-multiple-marked-outline'
                        size={20 * NEW_SCALE_RATIO}
                        style={styles.icon}
                        />
                        <View style={styles.funcContent}>
                        <Text style={styles.funcName}>{strings.test}</Text>
                        </View>
                    </TouchableOpacity>
                    </View>
                    : null
                }

                <View style={styles.title}>
                    <Text style={[styles.titleFuncName]}>{strings.other}</Text>
                </View>
                <TouchableOpacity style={styles.funcTab}>
                    <Entypo
                    name='share'
                    size={18 * NEW_SCALE_RATIO}
                    style={styles.icon}
                    />
                    <View style={styles.funcContent}>
                    <Text style={styles.funcName} >{strings.share}</Text>
                    </View>
                </TouchableOpacity>

                {this.props.signin ?
                    <View>
                    <TouchableOpacity
                        style={styles.funcTab}
                        onPress={() => { this.props.logout(this) }}
                    >
                        <View>
                        <MaterialCommunityIcons
                            name='logout-variant'
                            size={18 * NEW_SCALE_RATIO}
                            style={styles.icon}
                        />
                        </View>
                        <View style={styles.funcContent}>
                        <Text style={styles.funcName}>{strings.logout}</Text>
                        </View>
                    </TouchableOpacity>
                    </View>
                    : null
                }
                </View>
            </ScrollView>
        </SafeAreaView>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  imgFunc: {
    width: 20 * NEW_SCALE_RATIO,
    height: 20 * NEW_SCALE_RATIO,
    backgroundColor: 'green',
    marginLeft: 10 * NEW_SCALE_RATIO,
  },
  icon: {
    marginLeft: 10 * NEW_SCALE_RATIO,
  },
  funcContent: {
    flex: 1,
    // marginTop: 10 * NEW_SCALE_RATIO,
    flexDirection: 'row',
    // backgroundColor: 'pink',

  },
  funcName: {
    marginLeft: 12 * NEW_SCALE_RATIO,
    fontWeight: '400',
    fontSize: 10 * NEW_SCALE_RATIO,
    color: '#525252',
    fontWeight: 'bold'

  },
  funcTab: {
    flexDirection: 'row',
    // backgroundColor: 'blue', 
    alignItems: 'center',
    height: 30 * NEW_SCALE_RATIO
  },
  funcTabEnd: {
    flexDirection: 'row',
    // backgroundColor: 'blue', 
    alignItems: 'center',
    borderBottomColor: '#ced3db',
    borderBottomWidth: 1,
    height: 38 * NEW_SCALE_RATIO

  },
  color: {
    backgroundColor: 'gray',
    height: 80 * NEW_SCALE_RATIO
  },
  title: {
    justifyContent: 'center',
    height: 30 * NEW_SCALE_RATIO,
    marginTop: 5 * NEW_SCALE_RATIO
  },
  titleFuncName: {
    marginLeft: 10 * NEW_SCALE_RATIO,
    fontWeight: '400',
    fontSize: 10 * NEW_SCALE_RATIO,
    color: 'gray',
    fontWeight: 'bold',
  },
  titleName: {
    marginLeft: 10 * NEW_SCALE_RATIO,
    fontWeight: '400',
    fontSize: 11 * NEW_SCALE_RATIO,
    color: 'gray',
    fontWeight: 'bold',
  },
  subTitleName: {
    marginLeft: 10 * NEW_SCALE_RATIO,
    fontWeight: '400',
    fontSize: 8 * NEW_SCALE_RATIO,
    color: 'gray',
    fontWeight: 'bold',
  },
  cover: {
    height: 80 * NEW_SCALE_RATIO,
    width: 175 * NEW_SCALE_RATIO,
  },
  banner: {
    // backgroundColor : 'gray', 
    // marginLeft: 10 * NEW_SCALE_RATIO,
    alignItems: 'center'
  },
  logo: {
    width: 40 * NEW_SCALE_RATIO,
    height: 40 * NEW_SCALE_RATIO,
    borderRadius: 20 * NEW_SCALE_RATIO
  }

});
function mapStateToProps(state) {
  return {
    accessToken: state.token.accessToken,
    signin: state.token.signin,
    logoUrl: state.token.logoUrl,
    coverUrl: state.token.coverUrl,
    regionName: state.token.regionName,
    employerName: state.token.employerName,
  };
}
export default connect(mapStateToProps, MenuAction)(Menu);
