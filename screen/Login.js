import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/Entypo';
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
            <Icon name="mail" size={20} />
        </View>)
    }
}
const styles = StyleSheet.create({});