import Icon from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import Icon3 from 'react-native-vector-icons/Foundation';

import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Day from './Day';
import { MAIN_COLOR, NEW_SCALE_RATIO, SCALE_FONT, SCALE_PADDING_OR_MARGIN } from '../constants/Constants';
import { formatTimeShift } from '../utils/dateUtils';
import { convertSalary } from '../utils/numberUtils';

export default class Shift extends Component {
  render() {
    const { wrapperViewLine1, wapper, padding
     } = styles;
    const genders = [];
    for (const g of this.props.shifts[this.props.shift].genderRequireds) {
      if (g.gender === 'FEMALE') {
        genders.push(
          <View style={{ flexDirection: 'row' }}>
            <View style={padding}>
              <Icon3 name='female-symbol' color='#e62e00' size={22} />
            </View>
            <Text style={padding}>
            {g.applied} / {g.quantity}</Text>
          </View>
        );
      } else if (g.gender === 'MALE') {
        genders.push(
          <View style={{ flexDirection: 'row' }}>
            <View style={padding}>
              <Icon3 name='male-symbol' color='#e62e00' size={22} />
            </View>
            <Text style={padding}>{g.applied} / {g.quantity}</Text>
          </View>
        );
      } else if (g.gender === 'BOTH') {
        genders.push(
          <View style={{ flexDirection: 'row' }}>
            <View style={padding}>
              <Icon3 name='female-symbol' color='#e62e00' size={22} />
            </View>
            <View style={padding}>
              <Icon3 name='male-symbol' color='#e62e00' size={22} />
            </View>
            <Text style={padding}>{g.applied} / {g.quantity}</Text>
          </View>
        );
      }
    }
    return (
      <View style={wapper}>
        <View style={wrapperViewLine1}>
          <Text style={{ fontSize: 20, paddingTop: 5 }}>Ca số {Number(this.props.shift) + 1}</Text>
          <View style={{ alignItems: 'flex-end', flexDirection: 'row'}}>
            <Day
                title={'2'}
                show={this.props.shifts[this.props.shift].mon}
                fontSize={12 * SCALE_FONT}
                size={18 * NEW_SCALE_RATIO}
                disabled
            />
            <Day
                title={'3'}
                show={this.props.shifts[this.props.shift].tue}
                fontSize={12 * SCALE_FONT}
                size={18 * NEW_SCALE_RATIO}
                disabled
            />
            <Day
                title={'4'}
                show={this.props.shifts[this.props.shift].wed}
                fontSize={12 * SCALE_FONT}
                size={18 * NEW_SCALE_RATIO}
                disabled
            />
            <Day
                title={'5'}
                show={this.props.shifts[this.props.shift].thu}
                fontSize={12 * SCALE_FONT}
                size={18 * NEW_SCALE_RATIO}
                disabled
            />
            <Day
                title={'6'}
                show={this.props.shifts[this.props.shift].fri}
                fontSize={12 * SCALE_FONT}
                size={18 * NEW_SCALE_RATIO}
                disabled
            />
            <Day
                title={'7'}
                show={this.props.shifts[this.props.shift].sat} fontSize={12 * SCALE_FONT}
                size={18 * NEW_SCALE_RATIO}
                disabled
            />
            <Day
                title={'CN'}
                show={this.props.shifts[this.props.shift].sun}
                fontSize={12 * SCALE_FONT}
                size={18 * NEW_SCALE_RATIO}
                disabled
            />
          </View>
        </View>
        <View style={{ flexDirection: 'row', padding: 5 * SCALE_PADDING_OR_MARGIN }}>
          <Icon name='clock' color={MAIN_COLOR} size={19} />
          <Text style={{ paddingLeft: 10 * SCALE_PADDING_OR_MARGIN }}>
          {this.props.shifts[this.props.shift].startTime}</Text>
          <Text> - </Text>
          <Text>{this.props.shifts[this.props.shift].endTime}</Text>
        </View>
        <View style={{ flexDirection: 'row', padding: 10 * SCALE_PADDING_OR_MARGIN }}>
          <Icon2 name='dollar' color='#e62e00' size={19} />
          <Text
            style={{
              paddingLeft: 12 * SCALE_PADDING_OR_MARGIN,
              color: '#e62e00',
              fontWeight: 'bold' }}
          >
          {convertSalary(this.props.shifts[this.props.shift].maxSalary,
            this.props.shifts[this.props.shift].minSalary,
            this.props.shifts[this.props.shift].unit
          )}</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
          { genders }
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  wrapperViewLine1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5 * SCALE_PADDING_OR_MARGIN
    // justifyContent: 'center',
    // alignItems: 'center',
    // height: 60
  },
  wapper: {
    padding: 5 * SCALE_PADDING_OR_MARGIN,
    margin: 5 * SCALE_PADDING_OR_MARGIN,
    flex: 1,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // elevation: 3,
    position: 'relative',
  },
  padding: {
    paddingLeft: 5 * SCALE_PADDING_OR_MARGIN,
    paddingRight: 5 * SCALE_PADDING_OR_MARGIN,
  }
});
