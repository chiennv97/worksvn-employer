import React, { Component } from 'react';
import { StatusBar, Platform, StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
    SCALE_RATIO,
    STATUS_COLOR, MAIN_COLOR
} from '../constants/Constants';


export default class HeaderManager extends Component {
    render() {
        const { bodyTitle, onPress, onPressRight, iconRight, iconLeft} = this.props;
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor={STATUS_COLOR}
                    barStyle='light-content'
                />
                <TouchableOpacity
                    transparent
                    onPress={onPress}
                    style={{ paddingLeft: 22 * SCALE_RATIO, paddingRight: 22 * SCALE_RATIO }}
                >
                    <MaterialIcons
                        name={iconLeft}
                        // style={{ width: 19 * SCALE_RATIO, height: 32 * SCALE_RATIO }}
                        size={55 * SCALE_RATIO}
                        color='#ffffff'
                    />
                </TouchableOpacity>
                <View style={{ flex: 1, alignItems: 'center', }}>
                    <Text
                        style={styles.headerText}
                    >{bodyTitle}</Text>
                </View>
                <TouchableOpacity
                    transparent
                    onPress={onPressRight}
                    style={{ paddingLeft: 22 * SCALE_RATIO, paddingRight: 22 * SCALE_RATIO }}
                >
                    <MaterialIcons
                        name={iconRight}
                        // style={{ width: 19 * SCALE_RATIO, height: 32 * SCALE_RATIO }}
                        size={53 * SCALE_RATIO}
                        color='#ffffff'
                    />
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: MAIN_COLOR,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        height: 90  * SCALE_RATIO
    },
    headerText: {
        alignSelf: 'center',
        fontSize: 34 * SCALE_RATIO,
        // fontWeight: 'bold',
        fontStyle: 'normal',
        textAlign: 'center',
        color: '#ffffff',
    },
});
