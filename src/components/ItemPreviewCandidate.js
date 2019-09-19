import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, PixelRatio } from 'react-native';
import { formatDateTime } from '../utils/dateUtils';
import { Rating } from 'react-native-elements';
import { convertSalary } from '../utils/numberUtils';
import {NEW_SCALE_RATIO, SCALE_FONT, SUB_COLOR, SCALE_BORDER, SCALE_PADDING_OR_MARGIN} from '../constants/Constants';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';
import { Chip } from 'react-native-paper';
import * as PostAction from '../action/PostAction';

class ItemPreviewCandidate extends Component {
  render() {
    const { logoStyle, dataStyle, wrapperLine1, scrollviewImage, wrapperDate, wrapper, wrapper2 } = styles;
    return (
      <View style={wrapper}>
        <TouchableOpacity onPress={() => this.props.nav.navigate('CandidateProfile', { jid: this.props.jid, cid: this.props.data.candidatePreview.id })}>
          <View style={wrapperLine1}>
            <View style={logoStyle}>
              <Image
                style={scrollviewImage}
                resizeMode='cover'
                source={this.props.data.candidatePreview && this.props.data.candidatePreview.avatarUrl ?
                  { uri: this.props.data.candidatePreview.avatarUrl } : { uri: 'https://facebook.github.io/react/logo-og.png' }}
              />
            </View>
            <View style={dataStyle}>
              <Text numberOfLines={2} style={{ fontSize: 16 * SCALE_FONT, color: 'black' }}>
              {this.props.data.candidatePreview && this.props.data.candidatePreview.lastName ? this.props.data.candidatePreview.lastName : null} {this.props.data.candidatePreview && this.props.data.candidatePreview.firstName ? this.props.data.candidatePreview.firstName : null}</Text>
              <View style={{flexDirection: 'row'}}>
                <Entypo style={{color: fontColor}} name="reply" size={15}/>
                <Text numberOfLines={1} style={{color: fontColor}} > {formatDateTime(this.props.data.appliedDate)}</Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <MaterialCommunityIcons style={{color: fontColor}}  name="map-marker" size={15}/>
                <Text numberOfLines={1} style={{color: fontColor}} > {this.props.data.candidatePreview.address}</Text>
              </View>
              <Text style={{marginTop: 5, color: '#4d4d4d'}}>Tin nhắn</Text>
              <Text>{this.props.data.message}</Text>
              {this.props.data.appliedShifts &&  this.props.data.appliedShifts.length !== 0 ? 
                <View style={{marginTop: 5}}>
                  <Text style={{color: '#4d4d4d'}}>Các ca ứng tuyển</Text>
                  {this.props.data.appliedShifts.map((e, i) => 
                    (<View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', marginTop: 5}}>
                      <Chip>Ca số {i+1}</Chip>
                    </View>)
                  )}
                </View> 
                : null}
            </View>
          </View>
      
          <View style={styles.wrapperLine2}>
                    <View
                    style={{
                    flex: 1,
                    alignItems: 'center',
                    borderRightColor: SUB_COLOR,
                    borderRightWidth: 2 * SCALE_BORDER / PixelRatio.get() }}>
                    <Text>KỸ NĂNG</Text>
                    <Rating
                        type='star'
                        fractions={1}
                        readonly
                        startingValue={this.props.data.candidatePreview.rating.skillRating}
                        imageSize={18}
                        ratingColor='#3498db'
                        ratingBackgroundColor='#c8c7c8'
                        style={{ paddingVertical: 10, padding: 10 }}
                    />
                    </View>
                    <View
                    style={{
                    flex: 1,
                    alignItems: 'center',
                    borderRightColor: SUB_COLOR,
                    borderRightWidth: 2 * SCALE_BORDER / PixelRatio.get() }}>
                    <Text>THÁI ĐỘ</Text>
                    <Rating
                        type='star'
                        fractions={1}
                        readonly
                        startingValue={this.props.data.candidatePreview.rating.attitudeRating}
                        imageSize={18}
                        ratingColor='#3498db'
                        ratingBackgroundColor='#c8c7c8'
                        style={{ paddingVertical: 10, padding: 10 }}
                    />
                    </View>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                    <Text>ĐỘ HÀI LÒNG</Text>
                    <Rating
                        type='star'
                        fractions={1}
                        readonly
                        startingValue={this.props.data.candidatePreview.rating.jobAccomplishmentRating}
                        imageSize={18}
                        ratingBackgroundColor='#fef9e7'
                        style={{ paddingVertical: 10, padding: 10 }}
                    />
                    </View>
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
  logoStyle: { flex: 3, paddingRight: 5, paddingLeft: 10},
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
  wrapperLine2: {
    flexDirection: 'row',
    borderTopColor: SUB_COLOR,
    borderTopWidth: 2 * SCALE_BORDER / PixelRatio.get(),
    paddingTop: 15 * SCALE_PADDING_OR_MARGIN,
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
      activePost: state.data.activePost
  };
}
export default connect(mapStateToProps, PostAction)(ItemPreviewCandidate);