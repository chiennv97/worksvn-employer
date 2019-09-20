import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Foundation from 'react-native-vector-icons/Foundation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Rating } from 'react-native-elements';
import { View, ActivityIndicator, ScrollView, Image,
  StyleSheet, Dimensions, Text, PixelRatio, SafeAreaView, StatusBar } from 'react-native';
import HeaderScreenDetail from '../components/HeaderScreenDetail';
import { SCALE_PADDING_OR_MARGIN,
  SCALE_BORDER, SUB_COLOR, BACKGROUND_COLOR, ICON_COLOR, MAIN_COLOR, NEW_SCALE_RATIO } from '../constants/Constants';
import {BASE_URL} from '../constants/Url'
const { height, width } = Dimensions.get('window');
import {getCandidateProfileSaved, changeStateCandidate} from '../function/ProfileFunc';
import { connect } from 'react-redux';
import {formatDate} from '../utils/dateUtils'
import { Chip } from 'react-native-paper';
import ActionButton from 'react-native-action-button';
import { Snackbar } from 'react-native-paper';

class CandidateProfileSaved extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true, map: [], location: '',open: false, visible: false, titleSnackbar: '' };
    getCandidateProfileSaved(this.props.accessToken,  this.props.navigation.getParam('id', 'null'))
      .then((data) => this.setState({
        isLoading: false,
        data: data,
      }))
      .catch((err) => console.log(err))
  }
  render() {
    if (this.state.isLoading) {
      return (
        <React.Fragment>
            <SafeAreaView style={{ flex:0, backgroundColor: MAIN_COLOR }} />
            <StatusBar barStyle="light-content" />
            <SafeAreaView>
            <HeaderScreenDetail nav={this.props.navigation} title={'Hồ sơ ứng viên'} />
                <ActivityIndicator />
            </SafeAreaView>
        </React.Fragment> 
      );
    }
    const { coverImage, wrapperLine1, logoStyle, wrapperLine4,
      logoImage, data1Style, wrapperLine2, wrapperLine3
     } = styles;
    return (
        <React.Fragment>
            <SafeAreaView style={{ flex:0, backgroundColor: MAIN_COLOR }} />
            <StatusBar barStyle="light-content" />
            <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
                  
                <HeaderScreenDetail nav={this.props.navigation} title={'Hồ sơ ứng viên'} />
                <ScrollView style={{flex:1}}>
                  <View style={{ backgroundColor: BACKGROUND_COLOR }}>
                      <Image
                      style={coverImage}
                      resizeMode='cover'
                      source={this.state.data.candidateProfile.coverUrl !== null ?
                          { uri: this.state.data.candidateProfile.coverUrl } : { uri: 'https://facebook.github.io/react/logo-og.png' }}
                      />
                  </View>
                  <View style={wrapperLine1}>
                      <View style={logoStyle}>
                      <Image
                          style={logoImage}
                          resizeMode='cover'
                          source={this.state.data.candidateProfile.avatarUrl !== null ?
                          { uri: this.state.data.candidateProfile.avatarUrl } : { uri: 'https://facebook.github.io/react/logo-og.png' }}
                      />
                      </View>
                      <View style={data1Style}>
                      <Text style={{ fontSize: 16, color: 'black' }}>{this.state.data.candidateProfile.lastName} {this.state.data.candidateProfile.firstName}</Text>
                      <Text>{this.state.data.candidateProfile.region.name}</Text>
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
                          startingValue={this.state.data.candidateProfile.rating.skillRating}
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
                          startingValue={this.state.data.candidateProfile.rating.attitudeRating}
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
                          startingValue={this.state.data.candidateProfile.rating.jobAccomplishmentRating}
                          imageSize={18}
                          ratingBackgroundColor='#fef9e7'
                          style={{ paddingVertical: 10, padding: 10 }}
                      />
                      </View>
                  </View>
                  {this.state.data.status === 'PENDING' ? 
                      <View style={{alignItems: 'center', marginTop: 10}}>
                          <Text style={{color: '#3399ff', padding: 10, borderColor: '#3399ff', borderWidth: 2 * SCALE_BORDER}}>HỒ SƠ ĐANG CHỜ</Text>
                      </View>
                  : null}
                  {this.state.data.status === 'ACCEPTED' ? 
                      <View style={{alignItems: 'center', marginTop: 10}}>
                          <Text style={{color: '#33cc33', padding: 10, borderColor: '#33cc33', borderWidth: 2 * SCALE_BORDER}}>HỒ SƠ ĐÃ ĐƯỢC CHẤP NHẬN</Text>
                      </View>
                  : null}
                  {this.state.data.status === 'REJECTED' ? 
                      <View style={{alignItems: 'center', marginTop: 10}}>
                          <Text style={{color: '#cc0000', padding: 10, borderColor: '#cc0000', borderWidth: 2 * SCALE_BORDER}}>HỒ SƠ BỊ TỪ CHỐI</Text>
                      </View>
                  : null}
                  <View style={wrapperLine3}>
                      <Text style={{ fontSize: 18, paddingBottom: 10 * SCALE_PADDING_OR_MARGIN }}>
                      Thông tin cá nhân</Text>
                      <View style={{ flexDirection: 'row', paddingBottom: 10 * SCALE_PADDING_OR_MARGIN }}>
                        <View>
                            <Icon name='calendar-o' color={ICON_COLOR} size={18} />
                        </View>
                        <View style={{ paddingLeft: 10 * SCALE_PADDING_OR_MARGIN }}>
                            <Text>{this.state.data.candidateProfile.birthday ? formatDate(this.state.data.candidateProfile.birthday)  : '_'}</Text>
                            <Text style={{ fontSize: 12 }}>Ngày sinh</Text>
                        </View>
                      </View>
                      <View style={{ flexDirection: 'row', paddingBottom: 10 * SCALE_PADDING_OR_MARGIN }}>
                      <View>
                          <Foundation name='male-female' color={ICON_COLOR} size={18} />
                      </View>
                      <View style={{ paddingLeft: 10 * SCALE_PADDING_OR_MARGIN }}>
                          {this.state.data.candidateProfile.gender === null ? <Text>_</Text> : null}
                          {this.state.data.candidateProfile.gender === 'MALE' ? <Text>Nam</Text> : null}
                          {this.state.data.candidateProfile.gender === 'FEMALE' ? <Text>Nữ</Text> : null}
                          <Text style={{ fontSize: 12 }}>Giới tính</Text>
                      </View>
                      </View>
                      <View style={{ flexDirection: 'row', paddingBottom: 10 * SCALE_PADDING_OR_MARGIN }}>
                      <View>
                            <Icon name='home' color={ICON_COLOR} size={18} />
                        </View>
                        <View style={{ paddingLeft: 10 * SCALE_PADDING_OR_MARGIN }}>
                            <Text>{this.state.data.candidateProfile.address ? this.state.data.candidateProfile.address  : '_'}</Text>
                            <Text style={{ fontSize: 12 }}>Địa chỉ</Text>
                        </View>
                      </View>
                      <View style={{ flexDirection: 'row', paddingBottom: 10 * SCALE_PADDING_OR_MARGIN }}>
                        <View>
                            <MaterialCommunityIcons name='email-outline' color={ICON_COLOR} size={18} />
                        </View>
                        <View style={{ paddingLeft: 10 * SCALE_PADDING_OR_MARGIN }}>
                            <Text>{this.state.data.candidateProfile.email ? this.state.data.candidateProfile.email  : '_'}</Text>
                            <Text style={{ fontSize: 12 }}>Email</Text>
                        </View>
                      </View>
                      <View style={{ flexDirection: 'row', paddingBottom: 10 * SCALE_PADDING_OR_MARGIN }}>
                        <View>
                            <Icon name='phone' color={ICON_COLOR} size={18} />
                        </View>
                        <View style={{ paddingLeft: 10 * SCALE_PADDING_OR_MARGIN }}>
                            <Text>{this.state.data.candidateProfile.phone ? this.state.data.candidateProfile.phone  : '_'}</Text>
                            <Text style={{ fontSize: 12 }}>Điện thoại liên hệ</Text>
                        </View>
                      </View>
                      <View style={{ flexDirection: 'row', paddingBottom: 10 * SCALE_PADDING_OR_MARGIN }}>
                        <View>
                            <Icon name='id-card-o' color={ICON_COLOR} size={15} />
                        </View>
                        <View style={{ paddingLeft: 7 * SCALE_PADDING_OR_MARGIN }}>
                            <Text>{this.state.data.candidateProfile.identityCard ? this.state.data.candidateProfile.identityCard  : '_'}</Text>
                            <Text style={{ fontSize: 12 }}>Số CMND</Text>
                        </View>
                      </View>
                  </View>
                  <View style={wrapperLine3}>
                    <Text style={{ fontSize: 18, paddingBottom: 10 * SCALE_PADDING_OR_MARGIN }}>
                        Ảnh thẻ</Text>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                          <Image
                              style={styles.identityCard}
                              resizeMode='cover'
                              source={this.state.data.candidateProfile.identityCardFrontImageUrl !== null ?
                              { uri: this.state.data.candidateProfile.identityCardFrontImageUrl } : { uri: 'https://facebook.github.io/react/logo-og.png' }}
                          />
                          <Image
                              style={styles.identityCard}
                              resizeMode='cover'
                              source={this.state.data.candidateProfile.identityCardBackImageUrl !== null ?
                              { uri: this.state.data.candidateProfile.identityCardBackImageUrl } : { uri: 'https://facebook.github.io/react/logo-og.png' }}
                          />
                        </View>
                  </View>
                  <View style={wrapperLine3}>
                    <Text style={{ fontSize: 18, paddingBottom: 10 * SCALE_PADDING_OR_MARGIN }}>
                        Mô tả bản thân</Text>
                    <Text>{this.state.data.candidateProfile.description}</Text>    
                  </View>
                  <View style={wrapperLine3}>
                    <Text style={{ fontSize: 18, paddingBottom: 10 * SCALE_PADDING_OR_MARGIN }}>
                        Kỹ năng</Text>
                        <View style={{ alignItems: 'flex-start', flexDirection: 'row', flexWrap: 'wrap' }}>
                              { this.state.data.candidateProfile.skills.map((e, i) => (
                                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', marginTop: 5, marginRight: 5}}>
                                  <Chip>{e.name}</Chip>
                                </View>
                              ))}
                        </View>
                  </View>
                  <View style={[styles.wrapperLine5, {marginBottom: 30}]}>
                    <Text style={{ fontSize: 18, paddingBottom: 10 * SCALE_PADDING_OR_MARGIN }}>
                        Trình độ ngoại ngữ</Text>
                        {this.state.data.candidateProfile.languageSkills.map((e, i) => (
                          <View style={{
                              shadowColor: '#000',
                              shadowOffset: { width: 0, height: 2 },
                              shadowOpacity: 0.1,
                              elevation: 3,
                              backgroundColor: 'white',
                              marginBottom: 5 * NEW_SCALE_RATIO,
                              padding: 10,
                          }}>
                              <View style={{marginLeft: 20, flexDirection: 'row', justifyContent: 'space-between', marginRight: 20}}>
                                <Text style={{fontSize: 20}}>{e.language.name}</Text>
                                <Text>{e.level}</Text>
                              </View>
                              <View style={{marginLeft: 20, flexDirection: 'row', justifyContent: 'space-between', marginRight: 20}}>
                                
                                <View style={{flexDirection: 'row'}}>
                                  <MaterialCommunityIcons name='certificate' color={ICON_COLOR} size={15} />
                                  <View style={{marginLeft: 5}}>
                                    <Text>{e.certificate}</Text>
                                    <Text style={{fontSize: 10}}>Chứng chỉ</Text>
                                  </View>
                                </View>
                                <View style={{flexDirection: 'row'}}>
                                  <Icon name='certificate' color={ICON_COLOR} size={15} />
                                  <View style={{marginLeft: 5}}>
                                    <Text>{e.score}</Text>
                                    <Text style={{fontSize: 10}}>Điểm số</Text>
                                  </View>
                                </View>
                                
                              </View>
                          </View>
                        ))}
                        
                  </View>
                </ScrollView>
                <Snackbar
                  visible={this.state.visible}
                  onDismiss={() => this.setState({ visible: false })}
                  style={{marginBottom: 10}}
                >
                  {this.state.titleSnackbar}
                </Snackbar>  
            </SafeAreaView>
        </React.Fragment>
    );
  }
}
const styles = StyleSheet.create({
  coverImage: {
        height: 5 * height / 16,
        alignSelf: 'stretch',
  },
  wrapperLine1: {
    // flex: 1,
    flexDirection: 'row',
    marginRight: 10 * SCALE_PADDING_OR_MARGIN,
    marginTop: 10 * SCALE_PADDING_OR_MARGIN,
    marginBottom: 10 * SCALE_PADDING_OR_MARGIN
  },
  logoStyle: {
    flex: 3,
    paddingRight: 10 * SCALE_PADDING_OR_MARGIN,
    paddingLeft: 10 * SCALE_PADDING_OR_MARGIN
  },
  logoImage: {
        height: 75 * SCALE_PADDING_OR_MARGIN,
        width: 75 * SCALE_PADDING_OR_MARGIN,
        borderRadius: 50 * SCALE_PADDING_OR_MARGIN,
        //borderStyle: 'solid',
        borderWidth: 0.2 * SCALE_PADDING_OR_MARGIN,
        borderColor: SUB_COLOR,
        marginLeft: 1.35 * SCALE_PADDING_OR_MARGIN,
        marginRight: 1.35 * SCALE_PADDING_OR_MARGIN
  },
  data1Style: {
    flex: 10,
    justifyContent: 'center'
  },
  wrapperLine2: {
    flexDirection: 'row',
    borderBottomColor: SUB_COLOR,
    borderBottomWidth: 2 * SCALE_BORDER / PixelRatio.get(),
    paddingTop: 10 * SCALE_PADDING_OR_MARGIN,
    paddingBottom: 10 * SCALE_PADDING_OR_MARGIN,
  },
  wrapperLine3: {
    padding: 10 * SCALE_PADDING_OR_MARGIN,
    borderBottomColor: SUB_COLOR,
    borderBottomWidth: 2 * SCALE_BORDER / PixelRatio.get(),
  },
  wrapperLine5: {
    padding: 10 * SCALE_PADDING_OR_MARGIN,
  },
  wrapperLine4: {
    padding: 10 * SCALE_PADDING_OR_MARGIN,
    paddingBottom: 50 * SCALE_PADDING_OR_MARGIN,
  },
  identityCard: {
    width: width/2 - 20,
    height: 120 * SCALE_PADDING_OR_MARGIN
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },

});
function mapStateToProps(state) {
    return {
        accessToken: state.token.accessToken,
    };
}
export default connect(mapStateToProps)(CandidateProfileSaved);