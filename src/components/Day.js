import React, { Component } from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {MAIN_COLOR, NEW_SCALE_RATIO} from '../constants/Constants';

export default class Day extends Component {
    constructor(props) {
      super(props);
      this.state = {
          show: this.props.show,
          fontSize: this.props.fontSize
      };
    }
  render() {
      return (
        <TouchableOpacity
            style={[this.props.show ? styles.touch : styles.touch2, {
            width: this.props.size,
            height: this.props.size,
            }]}
            disabled={this.props.disabled}
        >
            <Text style={[this.props.show ? styles.fontColor : styles.fontColor2, {fontSize: this.props.fontSize}]}>{this.props.title}</Text>
        </TouchableOpacity>
      );
  }
}
const styles = StyleSheet.create({
    touch: {
        borderWidth: 2,
        borderColor: MAIN_COLOR,
        backgroundColor: MAIN_COLOR,
        borderRadius: 50 * NEW_SCALE_RATIO * 0.8,
        alignItems: 'center',
        justifyContent: 'center'
    },
    touch2: {
        borderWidth: 2,
        borderColor: MAIN_COLOR,
        backgroundColor: 'white',
        borderRadius: 50 * NEW_SCALE_RATIO * 0.8,
        alignItems: 'center',
        justifyContent: 'center'
    },
    fontColor: {
        color: 'white'
    },
    fontColor2: {
        color: MAIN_COLOR
    }
});
