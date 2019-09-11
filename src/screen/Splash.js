import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, ActivityIndicator, Alert, Platform, Linking } from 'react-native';
import VersionNumber from 'react-native-version-number';
import { checkCurrentVersionOnStore } from '../function/SplashFunc';
import {strings} from '../constants/Strings';
import { checkWhenOpenApp } from '../action/SplashAction';

class SplashComponent extends Component {
    componentDidMount() {
        checkCurrentVersionOnStore()
            .then(versionCode => {
                if (VersionNumber.buildVersion < versionCode) {
                    Alert.alert(
                        strings.alert,
                        strings.please_upgrade_to_a_new_version,
                        [
                            {
                                text: strings.update,
                                onPress: () => {
                                    if (Platform.OS === 'android') {
                                        Linking.openURL(`market://details?id=${VersionNumber.bundleIdentifier}`);
                                    } else {
                                        Linking.openURL(`itms://itunes.apple.com/us/app/apple-store/${VersionNumber.bundleIdentifier}?mt=8`);
                                    }
                                },
                            },
                        ],
                        { cancelable: false }
                    );
                } else {
                    this.props.checkWhenOpenApp(this);
                }
            })
            .catch(() => {
                console.log('Get current version on store failed');
            });
    }
    render() {
        return (
            <View 
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center'}}>
                <ActivityIndicator />
            </View>
        );
    }
}
function mapStateToProps(state) {
    return {
        accessToken: state.token.accessToken,
    };
}
const mapActionCreators = {
    checkWhenOpenApp
};

export default connect(mapStateToProps, mapActionCreators)(SplashComponent);
