import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { formatDate } from '../utils/dateUtils';
import { convertSalary } from '../utils/numberUtils';
import {NEW_SCALE_RATIO, SCALE_FONT} from '../constants/Constants';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const defaultLogo = require('../../assets/images/icon.png');

export default class ItemPost extends Component {
  render() {
    const { logoStyle, dataStyle, wrapperLine1, scrollviewImage, wrapperDate, wrapper, wrapper2 } = styles;
    return (
      <View style={wrapper}>
        <TouchableOpacity onPress={() => this.props.nav.navigate('JOB_DETAIL_SCREEN', { id: this.props.data.id, jobNameID: this.props.data.jobName.id })}>
        <View style={{alignItems: 'flex-end'}}>
          <TouchableOpacity>
            <Entypo style={{ paddingTop: 10, paddingRight: 10, paddingBottom: 0, paddingLeft: 20 }} name="dots-three-horizontal" size={19}/>
          </TouchableOpacity> 
        </View>
       
      
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
              <View style={{flexDirection: 'row'}}>
                <MaterialCommunityIcons style={{color: fontColor}} name="briefcase-outline" size={15}/>
                <Text numberOfLines={1} style={{color: fontColor}} > {this.props.data.jobName.name}</Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <MaterialCommunityIcons style={{color: fontColor}}  name="calendar" size={15}/>
                <Text numberOfLines={1} style={{color: fontColor}} > {formatDate(this.props.data.createdDate)}</Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <MaterialCommunityIcons style={{color: fontColor}}  name="calendar-clock" size={15}/>
                <Text numberOfLines={1} style={{color: fontColor}} > {this.props.data.timeLeft}</Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <MaterialCommunityIcons style={{color: fontColor}}  name="map-marker" size={15}/>
                <Text numberOfLines={1} style={{color: fontColor}}>{this.props.data.employerBranchName}</Text>
              </View>
              
            </View>
          </View>
      </TouchableOpacity>
          <View style={wrapperDate}>
            <TouchableOpacity style={{flex: 1,flexDirection: 'row', alignItems: 'center', paddingTop: 10, paddingLeft: 25, paddingRight: 25, justifyContent: 'center'}}>
              <View style={{alignItems: 'center'}}>
                <MaterialCommunityIcons style={{color: fontColor}}  name="account-plus" size={28}/>
                <Text>Ứng Tuyển</Text>
              </View>
              <Text style={{fontSize: 21, paddingLeft: 10}}>{this.props.data.appliedCount}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{flex: 1,flexDirection: 'row', alignItems: 'center', paddingTop: 10, paddingLeft: 25, paddingRight: 25, justifyContent: 'center'}}>
              <View style={{alignItems: 'center'}}>
                <MaterialCommunityIcons style={{color: fontColor}}  name="account-search" size={28}/>
                <Text>Tương Thích</Text>
              </View>
              <Text style={{fontSize: 21, paddingLeft: 10}}>{this.props.data.suitableCount}</Text>
            </TouchableOpacity>
          </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  wrapperLine1: { 
    flexDirection: 'row',
    paddingRight: 10,
    paddingBottom: 10
  },
  logoStyle: { flex: 3, paddingRight: 5, paddingLeft: 10 },
  dataStyle: { flex: 10, paddingLeft: 5 , paddingRight: 10},
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
    wrapperDate: { flex: 1, flexDirection: 'row', backgroundColor: 'white', justifyContent: 'space-around',
    borderTopWidth: 0.2 * NEW_SCALE_RATIO,
        borderTopColor: '#bcbcbd',
  },
    wrapper: {
      backgroundColor: 'white',
      paddingTop: 10,
      paddingBottom: 10,
      marginBottom: 7,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 3,
     }
});
const fontColor = '#333333';