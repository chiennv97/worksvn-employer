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
                <View style={{ flex: 1, alignItems: 'flex-start', marginLeft: 10 * SCALE_RATIO }}>
                    <Text
                        style={styles.headerText}
                    >{bodyTitle}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: MAIN_COLOR,
       
        alignItems: 'center',
        flexDirection: 'row',
        height: 90  * SCALE_RATIO
    },
    headerText: {
        alignSelf: 'flex-start',
        fontSize: 34 * SCALE_RATIO,
        // fontWeight: 'bold',
        fontStyle: 'normal',
        textAlign: 'center',
        color: '#ffffff',
    },
});
