
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { View, Dimensions, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {MAIN_COLOR, ROUTE_KEY, KEY_GOOGLE_MAP, UPDATE_POSITION} from '../../constants/Constants';

const { height, width } = Dimensions.get('window');

class GetPosition extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: 21.0242225,
        longitude: 105.8207913,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01
      }
    };
  }
  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
      this.setState({
        region: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01
        }
      }, () => {
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.state.region.latitude},${this.state.region.longitude}&key=${KEY_GOOGLE_MAP}`)
          .then((response) => response.json())
          .then((responseJson) => {
            console.log(responseJson);
            this.props.dispatch({ type: UPDATE_POSITION,
                lat: this.state.region.latitude,
                lon: this.state.region.longitude,
                addressStr: responseJson.results[0].formatted_address });
          })
          .catch((error) => {
            console.error(error);
          });
      });
      console.log(position);
      console.log(this.state.region);
    }, (error) => console.log(error),
    { timeout: 2000, maximumAge: 3600000 }
  );
  }
  render() {
    return (
      <View>
        <View style={styles.header}>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()} >
                <Icon name='keyboard-backspace' color='white' size={27} />
            </TouchableOpacity>
            <Text style={styles.titleStyle}>Vị trí</Text>
          </View>
          <TouchableOpacity onPress={() =>
            {
              if (this.props.navigation.getParam('type', null) === ROUTE_KEY.SIGN_UP_SCREEN) {
                  this.props.navigation.navigate(ROUTE_KEY.SIGN_UP_SCREEN);
              } else if (this.props.navigation.getParam('type', null) === ROUTE_KEY.SEARCH_FILL) {
                  this.props.navigation.navigate(ROUTE_KEY.SEARCH_FILL);
              }
            }} >
              <Icon2 name='check' color='white' size={27} />
          </TouchableOpacity>
        </View>
        <MapView
        style={{ width, height: height - height / 14 }}
        region={
          this.state.region
        }
        >
          <Marker
          coordinate={{
            latitude: this.state.region.latitude,
            longitude: this.state.region.longitude
          }}
          />
        </MapView>

      </View>
    );
  }
}
const styles = StyleSheet.create({
  header: {
    height: height / 14,
    backgroundColor: MAIN_COLOR,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10 },
  titleStyle: { color: '#FFF', paddingLeft: 10, fontSize: 18, fontWeight: 'bold' }
});
function mapStateToProps(state) {
    return {
        accessToken: state.token.accessToken
    };
}
export default connect(mapStateToProps)(GetPosition);
