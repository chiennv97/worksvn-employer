import React, { Component } from 'react';
import { View, FlatList, StatusBar, ActivityIndicator, StyleSheet, SafeAreaView, Easing, Animated } from 'react-native';
import { connect } from 'react-redux';
import ItemNotification from '../components/ItemNotification';
import { NEW_SCALE_RATIO, MAIN_COLOR } from '../constants/Constants';
import {getNotification} from '../function/PostFunc';
import * as PostAction from '../action/PostAction';
import HeaderManager from '../components/HeaderManager';
class Notifycation extends Component {
  constructor(props) {
    super(props);
      this.state = {
          isLoading: true,
          reloading: false,
          refreshing: false,
          outOfData: false,
          page: 0,
          visible: true
      };
      this.listJobs = [];
      this.paddingLoadingMore = new Animated.Value(20);
  }
  componentDidMount() {

    getNotification(this, this.props.accessToken, 0)
              .then(listJobs => {
                  this.listJobs = listJobs.items;
                  var currentPage = this.state.page + 1;
                  this.setState({isLoading: false,
                      loadingMore: false,
                      outOfData: false,
                      page: currentPage }); 
              })
              .catch(() => {
                  console.log('fail to get searchStudent');
              });
      
  }
  openMenu() {
    this.props.navigation.toggleDrawer();
  }
  handleLoadMore = () => {
      if (this.state.outOfData || this.state.loadingMore) return;
      this.setState({ loadingMore: true });
      getNotification(this, this.props.accessToken, this.state.page)
              .then(listJobs => {
                  var currentPage = this.state.page + 1;
                //   let newListJobs = this.props.activePost.concat(listJobs.items);
                //   this.props.setActivePost(newListJobs, listJobs.totalItems);
                this.listJobs = this.listJobs.concat(listJobs.items);
                  this.setState({loadingMore: false });
                  if (listJobs.items.length === 0) {
                      this.setState({outOfData: true});
                  } else {
                      this.setState({page: currentPage});
                  }
              })
              .catch(() => {
                  console.log('fail to get searchStudent');
              });
  };
  refreshList = () => {
        this.setState({refreshing: true, page: 0});
        getNotification(this, this.props.accessToken, 0)
                .then(listJobs => {
                    this.setState({refreshing: true});
                    this.listJobs = [];
                    this.listJobs = listJobs.items;
                    // this.props.setActivePost(listJobs.items, listJobs.totalItems);
                    this.setState({
                        isLoading: false,
                        loadingMore: false,
                        refreshing: false,
                        outOfData: false,
                        page: 1
                    });
                })
                .catch(() => {
                    console.log('fail to get searchStudent');
                });
    };
  renderFooter = () => {
      console.log(this.state.loadingMore);
      Animated.timing(
          this.paddingLoadingMore, {
              duration: 0,
              toValue: 20,
              easing: Easing.ease
          }
      ).start();
      if (!this.state.loadingMore && this.state.outOfData) {
          Animated.timing(
              this.paddingLoadingMore, {
                  duration: 100,
                  toValue: 0,
                  easing: Easing.ease
              }
          ).start();
      }
      return (
          <Animated.View style={{paddingTop: this.paddingLoadingMore,
              paddingBottom: 40
          }}>
              {this.state.loadingMore && (
                  <ActivityIndicator/>
              )}
          </Animated.View>
      );
  };
  render() {
    if (this.state.isLoading) {
      return (
        <React.Fragment>
            <SafeAreaView style={{ flex:0, backgroundColor: MAIN_COLOR }} />
            <StatusBar barStyle="light-content" />
            <SafeAreaView>
                <HeaderManager
                            bodyTitle={'Thông báo'}
                            onPress={() => {
                            this.props.navigation.toggleDrawer(); 
                            }}
                            iconLeft={'menu'}
                    />
                <ActivityIndicator />
            </SafeAreaView>
        </React.Fragment> 
      );
    }
    return (
        <React.Fragment>
            <SafeAreaView style={{ flex:0, backgroundColor: MAIN_COLOR }} />
            <StatusBar barStyle="light-content" />
            <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
                <HeaderManager
                        bodyTitle={'Thông báo'}
                        onPress={() => {
                        this.props.navigation.toggleDrawer(); 
                        }}
                        iconLeft={'menu'}
                />
                <FlatList
                        data={this.listJobs}
                        keyExtractor={(item, index) => index}
                        renderItem={({ item, index }) => <ItemNotification data={item}  jid={this.props.navigation.getParam('id', 'null')} nav={this.props.navigation} index={index} token={this.props.accessToken} />}
                        ListFooterComponent={this.renderFooter}
                        onEndReached={this.handleLoadMore}
                        onEndReachedThreshold={0.5}
                        onRefresh={this.refreshList}
                        refreshing={this.state.refreshing}
                        maxToRenderPerBatch={10}
                        windowSize={10}
                        removeClippedSubviews={true}

                    />
            </SafeAreaView>
        </React.Fragment>
    );
  }
}
const styles = StyleSheet.create({
    horizontalFlatlist: {
        height: 190 * NEW_SCALE_RATIO,
    },
    titleList: {
        fontSize: 11 * NEW_SCALE_RATIO,
        color: '#292929',
        marginTop: 7 * NEW_SCALE_RATIO,
        paddingBottom: 7 * NEW_SCALE_RATIO,
        paddingTop: 3 * NEW_SCALE_RATIO,
        paddingLeft: 7 * NEW_SCALE_RATIO,
        fontWeight: '500',
        backgroundColor: 'white',
    }
});
function mapStateToProps(state) {
    return {
        accessToken: state.token.accessToken,
        visible: state.data.snackbar,
        dataSnackbar: state.data.dataSnackbar,
        signin: state.token.signin,
    };
}
export default connect(mapStateToProps, PostAction)(Notifycation);
