import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { TabViewAnimated, TabBar } from 'react-native-tab-view';
import { Ionicons } from '@expo/vector-icons';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#282C37',
  },
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabStyle: {
    backgroundColor: 'transparent',
  },
});

class ProfileTabs extends Component {
  state = {
    index: 0,
    routes: [
      { key: '1', icon: 'ion-android-home' },
      { key: '2', icon: 'ion-ios-people' },
      { key: '3', icon: 'ion-ios-world' },
    ],
  };

  _renderIcon = ({ route }) => {
    return <Ionicons name={route.icon} size={24} color="white" />;
  };

  _handleChangeTab = (index) => {
    this.setState({ index });
  };

  _renderHeader = (props) => {
    return <TabBar
    {...props}
    tabStyle = {styles.tabStyle}
    renderIcon={this._renderIcon}
    />;
  };

  _renderScene = ({ route }) => {
    switch (route.key) {
    case '1':
      return <View/>;
    case '2':
      return <View/>;
    case '3':
      return <View/>;
    default:
      return null;
    }
  };

  render() {
    return (
      <TabViewAnimated
        lazy = {true}
        style={styles.container}
        navigationState={this.state}
        renderScene={this._renderScene}
        renderHeader={this._renderHeader}
        onRequestChangeTab={this._handleChangeTab}
      />
    );
  }
}

export default ProfileTabs;
