import React, { Component } from 'react'
import { Text, View, StyleSheet, TextInput, SafeAreaView, StatusBar } from 'react-native'
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Entypo';
import {strings} from '../constants/Strings';
import HeaderScreenDetail from '../components/HeaderScreenDetail';
import { NEW_SCALE_RATIO, SCALE_PADDING_OR_MARGIN, MAIN_COLOR } from '../constants/Constants';
import { sendEmail } from '../function/ForgotPasswordFunc';


export default class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        state = {
            email: '',
            loading: false
        }
    }
    // sendEmail() {
    //     sendEmail(this.state.email)
    // }
    render() {
        return (
            <React.Fragment>
                <SafeAreaView style={{ flex:0, backgroundColor: MAIN_COLOR }} />
                <StatusBar barStyle="light-content" />
            <SafeAreaView style={styles.container}>
                
                    <HeaderScreenDetail nav={this.props.navigation} title={strings.forgot_pass} />
                    <View style={styles.body}>
                        {/* Text */}
                        <View style={styles.containText}>
                            <Text style={styles.text1}>{strings.forget_pass_2}</Text>
                            <Text style={styles.text2}>{strings.verify_pass}</Text>
                        </View>
                        {/* form */}
                        <View style={styles.containForm}>
                            <View style={styles.inputSection}>
                                <Icon style={styles.emailIcon} name="mail" size={20} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Email"
                                    onChangeText={(emailString) => { this.setState({ email: emailString }); }}
                                    underlineColorAndroid="transparent"
                                />
                            </View>
                            {/* Button */}
                            <View style={{ margin: 10 * SCALE_PADDING_OR_MARGIN }}>
                                <Button
                                    title={strings.send}
                                    buttonStyle={{
                                        backgroundColor: MAIN_COLOR,
                                        borderRadius: 5
                                    }}
                                    titleStyle={{
                                        fontSize: 20
                                    }}
                                    onPress={() => sendEmail(this.state.email).then(() => {}).catch((err) => {console.log(err)})}
                                />
                            </View>
                        </View>
                    </View>
            </SafeAreaView>
            </React.Fragment>
            
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    body: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    inputForm: {
        marginLeft: 15 * NEW_SCALE_RATIO,
        marginRight: 15 * NEW_SCALE_RATIO,
    },
    inputSection: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
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
        backgroundColor: '#E0E0E0',
        color: '#000000',
        borderRadius: 5
    },
    text1: {
        color: 'black',
        fontSize: 20,


    },
    text2: {
        fontSize: 15,
        marginTop: 8 * NEW_SCALE_RATIO
    },
    containText: {
        alignItems: 'center',
        marginTop: 30 * NEW_SCALE_RATIO,
    },
    containForm: {
        // flexDirection :'row',
        marginLeft: 15 * NEW_SCALE_RATIO,
        marginRight: 15 * NEW_SCALE_RATIO,
        marginTop: 20 * NEW_SCALE_RATIO
    }
})

