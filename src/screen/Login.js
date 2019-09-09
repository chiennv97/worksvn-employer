import Icon from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';
// import Snackbar from 'react-native-snackbar';
// import base64 from 'react-native-base64';
import {
  View, Image, Dimensions,
  TextInput, StyleSheet, Text, ActivityIndicator, ScrollView, TouchableOpacity, SafeAreaView
} from 'react-native';
// import HeaderScreenDetail from '../components/HeaderScreenDetail';
import {
  SCALE_PADDING_OR_MARGIN, MAIN_COLOR,
  NEW_SCALE_RATIO, ROUTE_KEY
} from '../constants/Constants';
import {strings} from '../constants/Strings';
import * as AuthorAction from '../action/AuthorAction';

import {logo} from '../constants/image'
const { height, width } = Dimensions.get('window');

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailString: null,
      passwordString: null,
      securePassword: true
    };
  }
  login() {

    console.log('email: ' + this.state.emailString);
    console.log('pass: ' + this.state.passwordString);
    this.props.authorAction(this, this.state.emailString, this.state.passwordString)
      ;
  }
  testLogin() {
    console.log(this.state.emailString);
  }
  render() {
    return (
      <SafeAreaView >
        <View style={{ backgroundColor: '#fff', height: '100%' }}>
          <ScrollView>
            <View>
              
              <View style={styles.logo}>
                <Image
                  style={{ width: width - 50, height: height / 8 }}
                  source={logo}
                  resizeMode='contain'
                />
              </View>
              <View style={styles.inputForm}>
                <View style={styles.inputSection}>
                  <Icon style={styles.emailIcon} name="mail" size={20} />
                  <TextInput
                    style={styles.input}
                    placeholder="Email"
                    onChangeText={(emailString) => { this.setState({ emailString: emailString }); }}
                    underlineColorAndroid="transparent"
                  />
                </View>
                <View style={styles.inputSection}>
                  <Icon style={styles.emailIcon} name="key" size={20} />
                  <TextInput
                    style={styles.input}
                    placeholder={strings.pass}
                    secureTextEntry={this.state.securePassword}
                    onChangeText={(passwordString) => { this.setState({ passwordString: passwordString }); }}
                    underlineColorAndroid="transparent"
                  />
                  {this.state.passwordString !== '' && this.state.passwordString !== null ? 
                    <TouchableOpacity onPress={() => {this.setState({securePassword: !this.state.securePassword})}}>
                        <FontAwesome style={styles.emailIcon} name={this.state.securePassword ? 'eye' : 'eye-slash' } size={20} /> 
                    </TouchableOpacity>
                  
                  : null}
                  
                </View>
                <TouchableOpacity>
                  <View style={styles.lineForgot}>
                    <Text onPress={() => { this.props.navigation.navigate('ForgotPassword') }}>{strings.forgot_pass}?</Text>
                  </View>
                </TouchableOpacity>
                <View style={{ margin: 10 * SCALE_PADDING_OR_MARGIN }}>
                  <Button
                    title={strings.login}
                    buttonStyle={{
                      backgroundColor: MAIN_COLOR,
                      borderRadius: 5
                    }}
                    titleStyle={{
                      fontSize: 20
                    }}
                    onPress={() => this.login()}
                  />
                </View>
                <View style={{ alignItems: 'center', margin: 10 * SCALE_PADDING_OR_MARGIN }}>
                  <Text>- - - - - - - - - - - {strings.or} - - - - - - - - - - -</Text>
                </View>
                <View style={{ margin: 10 * SCALE_PADDING_OR_MARGIN }}>
                  <Button
                    title={strings.signin_fb}
                    icon={
                      <Icon
                        name='facebook'
                        size={24}
                        color='white'
                      />
                    }
                    buttonStyle={{
                      backgroundColor: '#4267b2',
                      borderRadius: 5
                    }}
                    titleStyle={{
                      fontSize: 20
                    }}
                  />
                </View>
                <View style={styles.noAccount}>
                  <Text>{strings.no_account}</Text>
                  <Text style={{ paddingLeft: 10, color: '#e62e00' }} onPress={() => { this.props.navigation.navigate('SignUp', { address: null }); }}>{strings.signup}</Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  logo: {
    marginTop: 50 * SCALE_PADDING_OR_MARGIN,
    marginBottom: 40 * SCALE_PADDING_OR_MARGIN,
    marginLeft: 10 * SCALE_PADDING_OR_MARGIN,
    marginRight: 10 * SCALE_PADDING_OR_MARGIN,
    alignItems: 'center'
  },
  inputSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#fff',
    backgroundColor: '#E0E0E0',
    margin: 10 * SCALE_PADDING_OR_MARGIN,
    borderRadius: 5

  },
  emailIcon: {
    padding: 10,
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    // backgroundColor: '#fff',
    backgroundColor: '#E0E0E0',
    color: '#000000',
    borderRadius: 5
  },
  lineForgot: {
    alignItems: 'flex-end',
    margin: 10 * SCALE_PADDING_OR_MARGIN
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  noAccount: {
    justifyContent: 'center',
    flexDirection: 'row',
    margin: 10 * SCALE_PADDING_OR_MARGIN
  },
  inputForm: {
    marginLeft: 15 * NEW_SCALE_RATIO,
    marginRight: 15 * NEW_SCALE_RATIO,
  }
});


function mapStateToProps(state) {
  return {
    accessToken: state.token.accessToken
  };
}

export default connect(mapStateToProps, AuthorAction)(Login);
