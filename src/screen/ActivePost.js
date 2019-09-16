import React, { Component } from 'react';
import { View, FlatList, Text, ActivityIndicator, StyleSheet, Dimensions, Easing, Animated } from 'react-native';
import { connect } from 'react-redux';
import ItemPost from '../components/ItemPost';
import { NEW_SCALE_RATIO } from '../constants/Constants';
import {getJobs} from '../function/PostFunc';
import { Snackbar } from 'react-native-paper';
import * as PostAction from '../action/PostAction';

const { height } = Dimensions.get('window');

class ActivePost extends Component {
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
    // return fetch(`${SERVER}/api/jobs?pageSize=5`)
    //   .then((response) => response.json())
    //   .then((responseJson) => {
    //     this.setState({
    //       isLoading: false,
    //       loadingMore: false,
    //       dataSource: responseJson.data.results,
    //     });
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
          getJobs(this, this.props.accessToken, 0)
              .then(listJobs => {
                //   this.listJobs = listJobs;
                  this.props.setActivePost(listJobs)
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
      console.log('handleLoadMore');
    // this.setState({
    //   loadingMore: true
    // }, () => {
    //   fetch(`${SERVER}/api/jobs?pageIndex=1&&pageSize=5`)
    //     .then((response) => response.json())
    //     .then((responseJson) => {
    //       this.setState({
    //         loadingMore: false,
    //         dataSource: this.state.dataSource.concat(responseJson.data.results),
    //       });
    //     })
    //     .catch((error) => {
    //       console.error(error);
    //     });
    // });


      if (this.state.outOfData || this.state.loadingMore) return;
      this.setState({ loadingMore: true });
          getJobs(this, this.props.accessToken, this.state.page)
              .then(listJobs => {
                  var currentPage = this.state.page + 1;
                  let newListJobs = this.props.activePost.concat(listJobs);
                  this.props.setActivePost(newListJobs);
                  this.setState({loadingMore: false });
                  if (listJobs.length === 0) {
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
            getJobs(this, this.props.accessToken, 0)
                .then(listJobs => {
                    this.setState({refreshing: true});
                    // this.listJobs = [];
                    // this.listJobs = listJobs;
                    this.props.setActivePost(listJobs);
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
        <View style={{ flex: 1 }}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <View style={{flex: 1}}>
                <FlatList
                    data={this.props.activePost}
                    keyExtractor={(item, index) => index}
                    renderItem={({ item, index }) => <ItemPost data={item} nav={this.props.navigation} index={index} token={this.props.accessToken} />}
                    ListFooterComponent={this.renderFooter}
                    onEndReached={this.handleLoadMore}
                    onEndReachedThreshold={0.5}
                    onRefresh={this.refreshList}
                    refreshing={this.state.refreshing}
                    maxToRenderPerBatch={10}
                    windowSize={10}
                    removeClippedSubviews={true}

                />
                <Snackbar
                    visible={this.props.visible}
                    onDismiss={() => this.props.updateSnackbar(false, null)}
                    action={{
                    label: 'OK',
                    onPress: () => {
                        // Do something
                    },
                    }}
                >
                    {this.props.dataSnackbar}
                </Snackbar>
      </View>
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
        activePost: state.data.activePost
    };
}
export default connect(mapStateToProps, PostAction)(ActivePost);
