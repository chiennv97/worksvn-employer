import React, {Component} from 'react';
import {StyleSheet, View, Text, Button, Image, ScrollView, Animated} from 'react-native';
import { guideline, logo } from "../constants/image";

import {normalize} from '../components/fontsize';
// import console = require('console');
import {height, width} from '../constants/dimenstion';
const backgrounds = [
    {
      title: "Hệ thống chủ động tìm ứng viên tương thích",
      img: guideline.suggest_candidate
    },
    {
        title: "Đánh giá hai chiều thông qua các tiêu chí",
        img: guideline.review
    },
    {
        title: "Hệ thống trợ giúp quản lý tuyển dụng hiệu quả",
        img: guideline.manage
    },
    {
        title: "Quy trình xác minh tài khoản đảm bảo độ tin cậy",
        img: guideline.security
    },
  ];

export default class Welcome extends Component {
    scrollX = new Animated.Value(0);
    state = {
        slideIndex: 0
      };
    componentDidMount() {
        this.scrollX.addListener(({ value }) => {
          this.setState({ slideIndex: Math.floor(value / width) });
        });
    } 
    renderDots() {
        const dotPosition = Animated.divide(this.scrollX, width);
    
        return (
          <View style={styles.viewDots}>
            {backgrounds.map((item, index) => {
              const opacity = dotPosition.interpolate({
                inputRange: [index - 1, index, index + 1],
                outputRange: [0.3, 1, 0.3],
                extrapolate: "clamp"
              });
    
              return (
                <Animated.View 
                  key={`dot-${index}`}
                  style={[styles.dot, {opacity}]}
                />
              );
            })}
          </View>
        );
      }
    renderImages() {
        return (
            <ScrollView
                horizontal
                pagingEnabled
                scrollEnabled
                decelerationRate={0}
                scrollEventThrottle={10}
                snapToAlignment="center"
                showsHorizontalScrollIndicator={false}
                onScroll={Animated.event([
                    { nativeEvent: { contentOffset: { x: this.scrollX } } }
                  ])}
            >
                {backgrounds.map((item, index) => (
                        <View style={styles.viewImages} key={`img-${index}`}>
                            <Image 
                            source={item.img}
                            resizeMode="contain"
                            style={styles.image}/>
                            <Text style={styles.title}>
                                {item && item.title}
                            </Text>
                        </View>
                ))}
                
                </ScrollView>
        )
    }
    
    render() {
        const { navigation } = this.props;
        return(
        <View style={styles.content}>
            <View style={styles.section_1}>
                {this.renderImages()} 
                {this.renderDots()}
            </View>
            <View style={styles.section_2}>
                <View style={{height: '35%'}}>
                    <Image
                    source={logo}
                    resizeMode="center"
                    style={styles.logo}
                    />
                </View>
                <View style={styles.viewButton}>
                    <Button
                        title="ĐĂNG NHẬP"
                        onPress={() => navigation.navigate("SignIn")}  
                    />
                </View>
                <View style={{alignItems: 'center', marginTop: 10}}>
                    <Text>Bằng cách đăng nhập bạn đã đồng ý với</Text>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={styles.policy}>Điều khoản dịch vụ</Text>
                        <Text> và </Text>
                        <Text style={styles.policy}>Chính sách bảo mật</Text>
                    </View>
                </View>
            </View>
        </View>)
    }
}
const styles = StyleSheet.create({
    content: {
        flex: 1,
        
    },
    section_1: {
        flex: 3,
        backgroundColor: '#1E90FF'
    },
    section_2: {
        flex: 1,
        marginTop: 15
    },
    viewButton: {
        width: '90%',
        alignSelf: 'center',
        margin: 0,
        
    },
    dot: { 
        width: 10,
        height: 10,
        backgroundColor: '#ffffff',
        margin: 10,
        borderRadius: 10
    },
    viewDots: {flexDirection: 'row', alignSelf: 'center'},
    viewImages: {alignItems: 'center', width: width - 20, height: height, marginTop: height/10, marginLeft: 10, marginRight: 10},
    title: {color: '#fff', fontSize: normalize(15), textAlign: 'center'},
    policy: {color: '#FF4500'},
    logo: {
        width: width ,
        height: "70%",
        padding: 0
    },
    image: {
        width: width/2 ,
        height: "40%"
    }
});