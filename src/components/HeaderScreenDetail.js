import Icon from 'react-native-vector-icons/MaterialIcons';
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import { MAIN_COLOR } from '../constants/Constants';

const { height } = Dimensions.get('window');

export default class HeaderScreenDetail extends Component {
  render() {
    const { wrapper, titleStyle } = styles;
    return (
      <View style={wrapper}>
        <TouchableOpacity onPress={() => this.props.nav.goBack()} >
            <Icon name='keyboard-backspace' color='white' size={27} />
        </TouchableOpacity>
        <Text style={titleStyle}>{this.props.title}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    height: height / 14,
    backgroundColor: MAIN_COLOR,
    flexDirection: 'row',
    padding: 10 },
  titleStyle: { color: '#FFF', paddingLeft: 10, fontSize: 18, fontWeight: 'bold' }
});
