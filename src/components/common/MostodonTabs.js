import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { TabViewAnimated, TabBar } from 'react-native-tab-view';
import TimelineHomeList from '../TimelineHomeList';
import TimelinePublicList from '../TimelinePublicList';
import { FontAwesome } from '@expo/vector-icons';

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

class MostodonTabs extends Component {
  state = {
    index: 0,
    routes: [
      { key: '1', icon: 'home' },
      { key: '2', icon: 'users' },
      { key: '3', icon: 'coffee' },
      { key: '4', icon: 'bell' },
    ],
  };

  _renderIcon = ({ route }) => {
    return <FontAwesome name={route.icon} size={24} color="white" />;
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
      return <TimelineHomeList/>;
    case '2':
      return <TimelinePublicList/>;
    case '3':
      return <View/>;
    case '4':
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

export {MostodonTabs};
