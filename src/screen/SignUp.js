import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { CheckBox, Button } from 'react-native-elements';
import Icon2 from 'react-native-vector-icons/Entypo';
import { connect } from 'react-redux';
import RNPickerSelect from 'react-native-picker-select';
// import base64 from 'react-native-base64';
import { View, Text, Dimensions,
  Image, StyleSheet, TextInput, Picker, ScrollView, TouchableOpacity, SafeAreaView, StatusBar} from 'react-native';
import HeaderScreenDetail from '../components/HeaderScreenDetail';
import {SCALE_PADDING_OR_MARGIN, MAIN_COLOR } from '../constants/Constants';
import { signUp } from '../action/AuthorAction';

const { height, width } = Dimensions.get('window');
import {logo} from '../constants/image'
class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employerRegisterBody: {
        employerName: null,
        phone: null,
        lat: null,
        lon: null,
      },
      email: null,
      checked: false,
      password: null,
      rePassword: null
    };
  }
  onSubmit() {
    // const Authorization = "Basic " + base64.encode(this.state.email + ':' + this.state.password);
    // console.log('bat dau in');
    // console.log(JSON.stringify(this.state.candidateRegisterBody));
    // console.log(Authorization);
    // fetch(`${SERVER}/api/candidates/register`, {
    //   method: 'POST',
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json',
    //     Authorization
    //   },
    //   body: JSON.stringify(this.state.candidateRegisterBody),
    // })
    // .then((response) => response.json())
    // .then((responseJson) => {
    //   console.log(responseJson);
    // })
    // .catch((error) => {
    //   console.error(error);
    // });
    signUp(this.state.email, this.state.password, this, this.state.employerRegisterBody);

  }
  checkEmail() {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    console.log(re.test(this.state.email));
  }
  render() {
    return (
      <React.Fragment>
                <SafeAreaView style={{ flex:0, backgroundColor: MAIN_COLOR }} />
                <StatusBar barStyle="light-content" />
                <SafeAreaView style={{flex: 1}}>
                  <HeaderScreenDetail nav={this.props.navigation} title={'Đăng Ký'} />
                  <ScrollView>
                    <View style={styles.logo}>
                      <Image
                        style={{ width: width - 50, height: height / 8 }}
                        source={logo}
                        resizeMode='contain'
                      />
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                      <View style={styles.lastNameSection}>
                        <Icon style={{ padding: 10 }} name="user" size={20} />
                        <TextInput
                            style={styles.input}
                            placeholder="Tên nhà tuyển dụng"
                            onChangeText={
                              (employerName) => { this.state.employerRegisterBody.employerName = employerName; }}
                            underlineColorAndroid="transparent"
                        />
                      </View>
                    </View>
                    
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('GET_POSITION_SCREEN', {type: 'SEARCH_FILL' })}>
                      <View style={styles.commonSection}>
                          <Icon2 style={{ padding: 10 }} name="home" size={20} />
                          <TextInput
                              style={styles.input}
                              defaultValue={null}
                              placeholder={'Địa chỉ'}
                              maxLength={40}
                              underlineColorAndroid="transparent"
                              editable={false}
                              value={this.props.addressStr}
                          />
                      </View>
                    </TouchableOpacity>
                    <View style={styles.commonSection}>
                      <Icon2 style={{ padding: 10 }} name="mail" size={20} />
                      <TextInput
                          style={styles.input}
                          placeholder="Email"
                          onChangeText={(email) => { this.state.email = email; }}
                          underlineColorAndroid="transparent"
                      />
                    </View>
                    <View style={styles.commonSection}>
                      <Icon style={{ padding: 10 }} name="phone" size={20} />
                      <TextInput
                          style={styles.input}
                          placeholder="Di động"
                          onChangeText={(phone) => { this.state.employerRegisterBody.phone = phone; }}
                          underlineColorAndroid="transparent"
                      />
                    </View>
                    <View style={styles.commonSection}>
                      <Icon style={{ padding: 10 }} name="key" size={20} />
                      <TextInput
                          style={styles.input}
                          placeholder="Mật khẩu"
                          secureTextEntry
                          onChangeText={(password) => { this.state.password = password; }}
                          underlineColorAndroid="transparent"
                      />
                    </View>
                    <View style={styles.commonSection}>
                      <Icon style={{ padding: 10 }} name="key" size={20} />
                      <TextInput
                          style={styles.input}
                          placeholder="Nhập lại mật khẩu"
                          secureTextEntry
                          onChangeText={(rePassword) => { this.state.rePassword = rePassword; }}
                          underlineColorAndroid="transparent"
                      />
                    </View>
                    <CheckBox
                      title='Đồng ý với điều khoản của Works.vn'
                      checked={this.state.checked}
                      onPress={() => this.setState({ checked: !this.state.checked })}
                      containerStyle={{backgroundColor: '#fff', borderColor: '#fff'}}
                    />
                    <View style={{ margin: 10 * SCALE_PADDING_OR_MARGIN }}>
                      <Button
                        title="Đăng Ký"
                        buttonStyle={{
                          backgroundColor: MAIN_COLOR,
                          borderRadius: 5
                        }}
                        titleStyle={{
                          fontSize: 20
                        }}
                        onPress={() => this.onSubmit()}
                      />
                    </View>
                    <View style={{ alignItems: 'center', margin: 10 * SCALE_PADDING_OR_MARGIN }}>
                      <Text>- - - - - - - - - - - Hoặc - - - - - - - - - - -</Text>
                    </View>
                    <View style={{ margin: 10 * SCALE_PADDING_OR_MARGIN }}>
                      <Button
                        title="Đăng Nhập với Facebook"
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
                    <View style={styles.haveAccount}>
                      <Text>Đã có tài khoản?</Text>
                      <Text style={{ paddingLeft: 10, color: '#e62e00' }}>Đăng nhập</Text>
                    </View>
                  </ScrollView>
                </SafeAreaView>
      </React.Fragment>
    );
  }
}
const styles = StyleSheet.create({
  logo: {
    marginTop: 30 * SCALE_PADDING_OR_MARGIN,
    marginBottom: 20 * SCALE_PADDING_OR_MARGIN,
    marginLeft: 10 * SCALE_PADDING_OR_MARGIN,
    marginRight: 10 * SCALE_PADDING_OR_MARGIN,
  },
  lastNameSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E0E0E0',
    margin: 10 * SCALE_PADDING_OR_MARGIN,
    flex: 7,
    borderRadius: 5
  },
  firstNameSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E0E0E0',
    marginTop: 10 * SCALE_PADDING_OR_MARGIN,
    marginBottom: 10 * SCALE_PADDING_OR_MARGIN,
    marginRight: 10 * SCALE_PADDING_OR_MARGIN,
    flex: 4,
    borderRadius: 5
  },
  input: {
      flex: 1,
      paddingTop: 10,
      paddingRight: 10,
      paddingBottom: 10,
      paddingLeft: 0,
      color: '#424242',
  },
  inputFirstName: {
      flex: 1,
      paddingTop: 10,
      paddingRight: 10,
      paddingBottom: 10,
      paddingLeft: 10,
      backgroundColor: '#E0E0E0',
      color: '#424242',
  },
  gender: {
    // flex: 1,
    // height: 50,
    flexDirection: 'row',
    margin: 10,
    backgroundColor: '#E0E0E0',
    color: '#424242',
    alignItems: 'center',
    borderRadius: 5
  },
  commonSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E0E0E0',
    margin: 10 * SCALE_PADDING_OR_MARGIN,
    borderRadius: 5
  },
  haveAccount: {
    justifyContent: 'center',
    flexDirection: 'row',
    margin: 10 * SCALE_PADDING_OR_MARGIN,
    paddingBottom: 50
  }
});
function mapStateToPops(state) {
  return { addressStr: state.data.addressStr };
}
export default connect(mapStateToPops)(SignUp);
