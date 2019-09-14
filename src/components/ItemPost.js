import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { formatDate } from '../../utils/dateUtils';
import { convertSalary } from '../../utils/numberUtils';
import {NEW_SCALE_RATIO, ROUTE_KEY, SCALE_FONT} from '../../constants/Constants';

const defaultLogo = require('../../assets/imgs/banner.jpg');

export default class ItemPost extends Component {
  render() {
    const { logoStyle, dataStyle, wrapperLine1, scrollviewImage, wrapperDate, wrapper, wrapper2 } = styles;
    return (
      <View style={wrapper}>
      <TouchableOpacity onPress={() => this.props.nav.navigate(ROUTE_KEY.JOB_DETAIL_SCREEN, { id: this.props.data.id, jobNameID: this.props.data.jobName.id })}>
          <View style={wrapperLine1}>
            <View style={logoStyle}>
              <Image
                style={scrollviewImage}
                resizeMode='cover'
                source={this.props.data.employerLogoUrl !== null ?
                  { uri: this.props.data.employerLogoUrl } : { uri: 'https://facebook.github.io/react/logo-og.png' }}
                defaultSource={defaultLogo}
              />
            </View>
            <View style={dataStyle}>
              <Text numberOfLines={2} style={{ fontSize: 16 * SCALE_FONT, color: 'black' }}>
              {this.props.data.jobTitle}</Text>
              <Text numberOfLines={1}>{this.props.data.employerName}</Text>
              <Text numberOfLines={2}>{this.props.data.address}</Text>
              {/*<Text style={{ fontSize: 15 * SCALE_FONT, color: '#e62e00', fontWeight: 'bold' }}>*/}
              {/*{convertSalary(this.props.data.maxSalary, this.props.data.minSalary*/}
                {/*, this.props.data.unit*/}
              {/*)}</Text>*/}
            </View>
          </View>
          <View style={wrapperDate}>
            <Text>{formatDate(this.props.data.createdDate)}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  wrapperLine1: { flexDirection: 'row', backgroundColor: 'white' },
  logoStyle: { flex: 3, paddingRight: 5, paddingLeft: 10 },
  dataStyle: { flex: 10 },
  scrollviewImage: {
        height: 50 * NEW_SCALE_RATIO,
        width: 50 * NEW_SCALE_RATIO,
        borderRadius: 50 * NEW_SCALE_RATIO * 0.8,
        //borderStyle: 'solid',
        borderWidth: 0.2 * NEW_SCALE_RATIO,
        borderColor: '#bcbcbd',
        paddingLeft: 1.35 * NEW_SCALE_RATIO,
        paddingRight: 1.35 * NEW_SCALE_RATIO
    },
    wrapperDate: { flex: 1, flexDirection: 'row', justifyContent: 'flex-end', backgroundColor: 'white'  },
    wrapper: {
      backgroundColor: 'white',
      paddingTop: 10,
      paddingBottom: 10,
      paddingRight: 10,
      borderBottomColor: '#e2e2e3',
      borderBottomWidth: 1,
     }
});
