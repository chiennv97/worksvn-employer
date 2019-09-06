import React, {Component} from 'react';
import {Text, StyleSheet, View, Button} from 'react-native';
export default class Login extends Component {
    render() {
        const { navigation } = this.props;
        return(<View>
            <Text>Login</Text>
            <Button
                title="ĐĂNG NHẬP"
                onPress={() => navigation.navigate("Home")}  
            />
        </View>)
    }
}
const styles = StyleSheet.create({});