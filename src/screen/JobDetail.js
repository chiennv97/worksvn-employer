import Icon2 from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import MapView, { Marker } from 'react-native-maps';
import React, { Component } from 'react';
import { View, ActivityIndicator, Image, StyleSheet,
  Dimensions, Text, TouchableOpacity, PixelRatio, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import { Badge, Button } from 'react-native-elements';
import HeaderScreenDetail from '../components/HeaderScreenDetail';
import Shift from '../components/Shift';
import {
    SCALE_FONT, MAIN_COLOR, SCALE_PADDING_OR_MARGIN,
    SCALE_BORDER, SUB_COLOR, BACKGROUND_COLOR, ICON_COLOR, NEW_SCALE_RATIO
} from '../constants/Constants';
import { formatDate } from '../utils/dateUtils';
import { getJobDetail} from '../function/PostFunc';
import { Chip } from 'react-native-paper';

const defaultLogo = require('../../assets/images/logo.png');

const { height, width } = Dimensions.get('window');

class JobDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isLoading: true,
        map: [],
        data: {
            requiredSkills: null,
            employerCoverUrl: null
        },
        similarJobs: null };
  }
  componentDidMount() {
      
    getJobDetail(this, this.props.accessToken, this.props.navigation.getParam('id', 'null'))
    .then(data => {
        this.setState({data, isLoading: false});
    })
    .catch(() => {
        console.log('fail to get detail job');
    })
  }
  render() {
    const skills = [];
    const shifts = [];
    const { coverImage, wrapperLine1, logoStyle,
      data1Style,
      logoImage, wrapperLine3, wrapperLine4, wrapperLine7, wrapperLine5, wrapperLine6
     } = styles;
    if (this.state.isLoading) {
      return (
        <React.Fragment>
                <SafeAreaView style={{ flex:0, backgroundColor: MAIN_COLOR }} />
                <StatusBar barStyle="light-content" />
                <SafeAreaView>
                    <HeaderScreenDetail nav={this.props.navigation} title={'Chi Tiết Bài Đăng'} />
                    <ActivityIndicator />
                </SafeAreaView>
        </React.Fragment>
          
      );
    }
    if (this.state.data) {
        for (const skill of this.state.data.requiredSkills) {
            skills.push(
              <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', marginTop: 5, marginRight: 5}}>
                <Chip>{skill.name}</Chip>
              </View>
            );
        }
        for (const shift in this.state.data.shifts) {
            shifts.push(
                <View style={{
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    elevation: 3,
                    backgroundColor: 'white',
                    marginBottom: 5 * NEW_SCALE_RATIO
                }}>
                    <Shift shift={shift} shifts={this.state.data.shifts} />
                </View>
            );
        }
    }
    return (
        <React.Fragment>
                <SafeAreaView style={{ flex:0, backgroundColor: MAIN_COLOR }} />
                <StatusBar barStyle="light-content" />
                <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
                    <HeaderScreenDetail nav={this.props.navigation} title={'Chi Tiết Bài Đăng'} />
                    <ScrollView>
                    <View style={{ backgroundColor: BACKGROUND_COLOR, marginBottom: 5 * NEW_SCALE_RATIO }}>
                        <Image
                        style={coverImage}
                        resizeMode='cover'
                        source={this.state.data.employerCoverUrl !== null ?
                            { uri: this.state.data.employerCoverUrl } : { uri: 'https://facebook.github.io/react/logo-og.png' }}
                        
                        />
                        <View style={wrapperLine1}>
                            <TouchableOpacity
                                onPress={() =>
                                    this.props.navigation.navigate('EMPLOYER_PROFILE_SCREEN',
                                        { id: this.state.data.employerID })}
                                style={logoStyle}
                            >
                                <Image
                                    style={logoImage}
                                    resizeMode='cover'
                                    source={this.state.data.employerLogoUrl !== null ?
                                        { uri: this.state.data.employerLogoUrl } : { uri: 'https://facebook.github.io/react/logo-og.png' }}
                                    
                                />
                            </TouchableOpacity>
                        <View style={data1Style}>
                            <Text style={{ fontSize: 17 * SCALE_FONT }}>{this.state.data.jobTitle}</Text>
                            <TouchableOpacity
                                onPress={() =>
                                    this.props.navigation.navigate('EMPLOYER_PROFILE_SCREEN',
                                        { id: this.state.data.employerID })}
                            >
                                <Text style={{ color: MAIN_COLOR }}>{this.state.data.employerName}</Text>
                            </TouchableOpacity>
                        </View>
                        </View>
                        <View style={wrapperLine3}>
                            <View style={{ flexDirection: 'row', flex: 6 }}>
                            <View style={{ marginTop: 5 * SCALE_PADDING_OR_MARGIN }}>
                                <Icon2 name='briefcase' color={ICON_COLOR} size={17} />
                            </View>
                            <View style={{ paddingLeft: 10 * SCALE_PADDING_OR_MARGIN }}>
                                <Text>{this.state.data.jobName.name}</Text>
                                <Text style={{ fontSize: 12 * SCALE_FONT }}>Loại công việc</Text>
                            </View>
                            </View>
                            <View style={{ flexDirection: 'row', flex: 4 }}>
                            <View style={{ marginTop: 2 * SCALE_PADDING_OR_MARGIN }}>
                                <Icon2 name='map-marker' color={ICON_COLOR} size={23} />
                            </View>
                            <View style={{ paddingLeft: 10 * SCALE_PADDING_OR_MARGIN }}>
                                <Text>{this.state.data.region.name}</Text>
                                <Text style={{ fontSize: 12 * SCALE_FONT }}>Khu vực</Text>
                            </View>
                            </View>
                        </View>
                        <View style={wrapperLine4}>
                            <View style={{ flexDirection: 'row', flex: 6 }}>
                            <View style={{ marginTop: 5 * SCALE_PADDING_OR_MARGIN }}>
                                <Icon2 name='calendar-o' color={ICON_COLOR} size={18} />
                            </View>
                            <View style={{ paddingLeft: 10 * SCALE_PADDING_OR_MARGIN }}>
                                <Text>{formatDate(this.state.data.createdDate)}</Text>
                                <Text style={{ fontSize: 12 * SCALE_FONT }}>Ngày đăng</Text>
                            </View>
                            </View>
                            <View style={{ flexDirection: 'row', flex: 4 }}>
                            <View style={{ marginTop: 5 * SCALE_PADDING_OR_MARGIN }}>
                                <Icon2 name='calendar-times-o' color={ICON_COLOR} size={18} />
                            </View>
                            <View style={{ paddingLeft: 10 * SCALE_PADDING_OR_MARGIN }}>
                                <Text>{formatDate(this.state.data.expirationDate)}</Text>
                                <Text style={{ fontSize: 12 * SCALE_FONT }}>Ngày hết hạn</Text>
                            </View>
                            </View>
                        </View>
                        <View style={wrapperLine5}>
                        <Text style={{ paddingBottom: 10 * SCALE_PADDING_OR_MARGIN, fontSize: 20 }}>
                        Mô tả công việc</Text>
                        <Text>{this.state.data.description}</Text>
                        </View>
                        <View style={wrapperLine6}>
                        <Text style={{ paddingBottom: 10 * SCALE_PADDING_OR_MARGIN, fontSize: 20 }}>
                        Kỹ năng yêu cầu</Text>
                        <View style={{ alignItems: 'flex-start', flexDirection: 'row', flexWrap: 'wrap' }}>
                            { skills }
                        </View>
                        </View>
                        <View style={wrapperLine7}>
                        <Text style={{ fontSize: 20 }}>
                        Các ca làm việc</Text>
                        { shifts }
                        </View>
                        <View style={{ padding: 10 * SCALE_PADDING_OR_MARGIN }}>
                            <Text style={{ fontSize: 20 }}>Địa điểm làm việc</Text>
                            <View style={{flexDirection: 'row'}}>
                                <Icon2 name='map-marker' style={{marginTop: 9}} color={ICON_COLOR} size={19} />
                                <Text style={{ fontSize: 9 * NEW_SCALE_RATIO, marginTop: 10, marginBottom: 10 }}> {this.state.data.address}</Text>
                            </View>
                        <MapView
                        style={{ width: width - (20 * SCALE_PADDING_OR_MARGIN), height: height / 2 }}
                        region={{
                            latitude: this.state.data.lat,
                            longitude: this.state.data.lon,
                            latitudeDelta: 0.01,
                            longitudeDelta: 0.01
                        }}
                        scrollEnabled={false}
                        >
                        <Marker
                        coordinate={{
                            latitude: this.state.data.lat,
                            longitude: this.state.data.lon
                        }}
                        title={this.state.data.address}
                        />
                        </MapView>
                        </View>
                    </View>
                    </ScrollView>
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
    marginRight: 10 * NEW_SCALE_RATIO,
    marginTop: 10 * NEW_SCALE_RATIO,
    marginBottom: 10 * NEW_SCALE_RATIO
  },
  logoStyle: {
    flex: 3,
    paddingRight: 5 * SCALE_PADDING_OR_MARGIN,
    paddingLeft: 10 * SCALE_PADDING_OR_MARGIN
  },
  logoImage: {
        height: 50 * NEW_SCALE_RATIO,
        width: 50 * NEW_SCALE_RATIO,
        borderRadius: 50 * NEW_SCALE_RATIO * 0.8,
        //borderStyle: 'solid',
        borderWidth: 0.2 * NEW_SCALE_RATIO,
        borderColor: SUB_COLOR,
        marginLeft: 1.35 * NEW_SCALE_RATIO,
        marginRight: 1.35 * NEW_SCALE_RATIO
  },
  data1Style: { flex: 10 },
  wrapperLine3: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10 * SCALE_PADDING_OR_MARGIN,
  },
  wrapperLine4: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10 * SCALE_PADDING_OR_MARGIN,
    borderBottomColor: SUB_COLOR,
    borderBottomWidth: 2 * SCALE_BORDER / PixelRatio.get(),
  },
  wrapperLine5: {
    // paddingBottom: height / 12,
    padding: 10 * SCALE_PADDING_OR_MARGIN,
    borderBottomColor: SUB_COLOR,
    borderBottomWidth: 2 * SCALE_BORDER / PixelRatio.get(),
  },
  wrapperLine6: {
    padding: 10 * SCALE_PADDING_OR_MARGIN,
    borderBottomColor: SUB_COLOR,
    borderBottomWidth: 2 * SCALE_BORDER / PixelRatio.get(),
  },
  wrapperLine7: {
    paddingLeft: 10 * SCALE_PADDING_OR_MARGIN,
    paddingTop: 10 * SCALE_PADDING_OR_MARGIN,
    paddingRight: 10 * SCALE_PADDING_OR_MARGIN,
    paddingBottom: 10 * SCALE_PADDING_OR_MARGIN,
    borderBottomColor: SUB_COLOR,
    borderBottomWidth: 2 * SCALE_BORDER / PixelRatio.get(),
  },
    horizontalFlatlist: {
        height: 140 * NEW_SCALE_RATIO,
    },
});
function mapStateToProps(state) {
    return {
        accessToken: state.token.accessToken,
        signin: state.token.signin
    };
}
export default connect(mapStateToProps)(JobDetail);
