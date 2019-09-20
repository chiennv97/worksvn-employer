import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { formatDateTime } from '../utils/dateUtils';
import { convertSalary } from '../utils/numberUtils';
import {NEW_SCALE_RATIO, SCALE_FONT} from '../constants/Constants';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const defaultLogo = require('../../assets/images/icon.png');
import {showOrHiddenPost, extendPost, removePost, removeSaveCandidates} from '../function/PostFunc';
import { connect } from 'react-redux';
import * as PostAction from '../action/PostAction';

class ItemSaveCandidate extends Component {
  render() {
    const { logoStyle, dataStyle, wrapperLine1, scrollviewImage, wrapperDate, wrapper, wrapper2 } = styles;
    return (
      <View style={wrapper}>
        <TouchableOpacity onPress={() => this.props.nav.navigate('CandidateProfileSaved', { id: this.props.data.id })}>
          <View style={wrapperLine1}>
            <View style={logoStyle}>
              <Image
                style={scrollviewImage}
                resizeMode='cover'
                source={this.props.data.candidatePreview.avatarUrl !== null ?
                  { uri: this.props.data.candidatePreview.avatarUrl } : { uri: 'https://facebook.github.io/react/logo-og.png' }}
              />
            </View>
            <View style={dataStyle}>
              <Text numberOfLines={2} style={{ fontSize: 16 * SCALE_FONT, color: 'black' }}>
              {this.props.data.candidatePreview.lastName} {this.props.data.candidatePreview.firstName}</Text>
              <View style={{flexDirection: 'row', paddingTop: 5}}>
                <MaterialCommunityIcons style={{color: fontColor}}  name="calendar" size={15}/>
                <Text numberOfLines={1} style={{color: fontColor}} > {formatDateTime(this.props.data.createdDate)}</Text>
              </View>
              <View style={{flexDirection: 'row', paddingTop: 5}}>
                <MaterialCommunityIcons style={{color: fontColor}}  name="map-marker" size={15}/>
                <Text numberOfLines={1} style={{color: fontColor}} > {this.props.data.candidatePreview.address}</Text>
              </View>
            </View>
            <TouchableOpacity 
            style={{justifyContent: 'center'}}
            onPress={() => {
              removeSaveCandidates(this.props.accessToken, this.props.data.candidatePreview.id)
              .then(() => {
                let newSavedCandidates = this.props.savedCandidates.splice(this.props.index, 1)
                this.props.setSaveCandidates(newSavedCandidates);
                this.props.updateSnackbar(true, 'Xoá hồ sơ đã lưu thành công')
              })
              .catch((e) => console.log(e))
            }}>
              <View style={{justifyContent: 'center', paddingRight: 10}}>
                  <FontAwesome style={{color: fontColor}}  name="trash" size={23}/>
              </View>
            </TouchableOpacity>
          </View>
      </TouchableOpacity>
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
  logoStyle: { flex: 3, paddingRight: 0, paddingLeft: 10, justifyContent: 'center'},
  dataStyle: { flex: 10, paddingLeft: 5 , paddingRight: 30},
  scrollviewImage: {
        height: 35 * NEW_SCALE_RATIO,
        width: 35 * NEW_SCALE_RATIO,
        borderRadius: 35 * NEW_SCALE_RATIO * 0.8,
        //borderStyle: 'solid',
        borderWidth: 0.2 * NEW_SCALE_RATIO,
        borderColor: '#bcbcbd',
        paddingLeft: 1.35 * NEW_SCALE_RATIO,
        paddingRight: 1 * NEW_SCALE_RATIO
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
     },
     slideInOption: {
      padding: 5,
    },
    text: {
      fontSize: 18,
    },
});
const fontColor = '#333333';
function mapStateToProps(state) {
  return {
      accessToken: state.token.accessToken,
      visible: state.data.snackbar,
      savedCandidates: state.data.savedCandidates
  };
}
export default connect(mapStateToProps, PostAction)(ItemSaveCandidate);