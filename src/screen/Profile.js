import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import MapView, { Marker } from 'react-native-maps';
import { Rating } from 'react-native-elements';
import { View, ActivityIndicator, ScrollView, Image,
  StyleSheet, Dimensions, Text, PixelRatio, SafeAreaView, StatusBar } from 'react-native';
import HeaderScreenDetail from '../components/HeaderScreenDetail';
import { SCALE_PADDING_OR_MARGIN,
  SCALE_BORDER, SUB_COLOR, BACKGROUND_COLOR, ICON_COLOR, MAIN_COLOR } from '../constants/Constants';
import {BASE_URL} from '../constants/Url'
const { height, width } = Dimensions.get('window');
import {getProfile} from '../function/ProfileFunc';
import { connect } from 'react-redux';

class EmployerProfile extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true, map: [], location: '' };
      getProfile(this.props.accessToken)
      .then((data) => this.setState({
        isLoading: false,
        data: data,
      }))
      .catch((err) => console.log(err))
  }
  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1 }}>
          <HeaderScreenDetail nav={this.props.navigation} />
          <ActivityIndicator />
        </View>
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
                <View style={{ backgroundColor: BACKGROUND_COLOR }}>
                <HeaderScreenDetail nav={this.props.navigation} title={'Thông Tin Nhà Tuyển Dụng'} />
                <ScrollView>
                <View style={{ backgroundColor: BACKGROUND_COLOR }}>
                    <Image
                    style={coverImage}
                    resizeMode='cover'
                    source={this.state.data.coverUrl !== null ?
                        { uri: this.state.data.coverUrl } : { uri: 'https://facebook.github.io/react/logo-og.png' }}
                    />
                </View>
                <View style={wrapperLine1}>
                    <View style={logoStyle}>
                    <Image
                        style={logoImage}
                        resizeMode='cover'
                        source={this.state.data.logoUrl !== null ?
                        { uri: this.state.data.logoUrl } : { uri: 'https://facebook.github.io/react/logo-og.png' }}
                    />
                    </View>
                    <View style={data1Style}>
                    <Text style={{ fontSize: 16, color: 'black' }}>{this.state.data.employerName}</Text>
                    <Text>{this.state.data.region.name}</Text>
                    </View>
                </View>
                <View style={wrapperLine2}>
                    <View
                    style={{
                    flex: 1,
                    alignItems: 'center',
                    borderRightColor: SUB_COLOR,
                    borderRightWidth: 2 * SCALE_BORDER / PixelRatio.get() }}>
                    <Text>Môi trường làm việc</Text>
                    <Rating
                        type='star'
                        fractions={1}
                        readonly
                        startingValue={this.state.data.rating.salaryRating}
                        imageSize={20}
                        ratingColor='#3498db'
                        ratingBackgroundColor='#c8c7c8'
                        onFinishRating={this.ratingCompleted}
                        style={{ paddingVertical: 10, padding: 10 }}
                    />
                    <View style={{ flexDirection: 'row' }}>
                        <Icon name='user' color={ICON_COLOR} size={14} />
                        <Text style={{ fontSize: 12 }}> {this.state.data.rating.ratingCount}</Text>
                    </View>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                    <Text>Đãi ngộ nhân viên</Text>
                    <Rating
                        type='star'
                        fractions={1}
                        readonly
                        startingValue={this.state.data.rating.salaryRating}
                        imageSize={20}
                        ratingColor='#3498db'
                        ratingBackgroundColor='#c8c7c8'
                        onFinishRating={this.ratingCompleted}
                        style={{ paddingVertical: 10, padding: 10 }}
                    />
                    <View style={{ flexDirection: 'row' }}>
                        <Icon name='user' color={ICON_COLOR} size={14} />
                        <Text style={{ fontSize: 12 }}> {this.state.data.rating.ratingCount}</Text>
                    </View>
                    </View>
                </View>
                <View style={wrapperLine3}>
                    <Text style={{ fontSize: 18, paddingBottom: 10 * SCALE_PADDING_OR_MARGIN }}>
                    Thông tin nhà tuyển dụng</Text>
                    <View style={{ flexDirection: 'row', paddingBottom: 10 * SCALE_PADDING_OR_MARGIN }}>
                    <View>
                        <Icon name='dollar' color={ICON_COLOR} size={18} />
                    </View>
                    <View style={{ paddingLeft: 10 * SCALE_PADDING_OR_MARGIN }}>
                        <Text>{this.state.data.taxCode !== null ? this.state.data.taxCode : '_'}</Text>
                        <Text style={{ fontSize: 12 }}>Mã số thuế</Text>
                    </View>
                    </View>
                    <View style={{ flexDirection: 'row', paddingBottom: 10 * SCALE_PADDING_OR_MARGIN }}>
                    <View>
                        <Icon name='map-marker' color={ICON_COLOR} size={18} />
                    </View>
                    <View style={{ paddingLeft: 10 * SCALE_PADDING_OR_MARGIN }}>
                        <Text>{this.state.data.address}</Text>
                        <Text style={{ fontSize: 12 }}>Địa chỉ</Text>
                    </View>
                    </View>
                    <View pointerEvents="none">
                    <MapView
                    style={{ width: width, height: height / 3 }}
                    region={{
                        latitude: this.state.data.lat,
                        longitude: this.state.data.lon,
                        latitudeDelta: 0.005,
                        longitudeDelta: 0.005
                    }}
                    >
                    <Marker
                    coordinate={{
                        latitude: this.state.data.lat,
                        longitude: this.state.data.lon
                    }}
                    />
                    </MapView>
                    </View>
                </View>
                <View style={wrapperLine4}>
                    <Text style={{ fontSize: 18, paddingBottom: 10 * SCALE_PADDING_OR_MARGIN }}>
                    Mô tả sơ lược</Text>
                    <View style={{ paddingBottom: 10 * SCALE_PADDING_OR_MARGIN }}>
                    <Text>{this.state.data.description !== null ? this.state.data.description : 'Không có mô tả'}</Text>
                    </View>
                </View>
                </ScrollView>
            </View>
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
  wrapperLine4: {
    padding: 10 * SCALE_PADDING_OR_MARGIN,
    paddingBottom: 50 * SCALE_PADDING_OR_MARGIN,
  }
});
function mapStateToProps(state) {
    return {
        accessToken: state.token.accessToken,
    };
}
export default connect(mapStateToProps)(EmployerProfile);