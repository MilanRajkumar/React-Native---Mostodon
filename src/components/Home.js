import React, { Component } from 'react';
import {
  View,
  Text,
  DrawerLayoutAndroid,
  Linking,
  AsyncStorage,
  Image,
  TouchableWithoutFeedback
  } from 'react-native';
import { apis, Button, SearchToolbar, MostodonTabs, SearchListDropDown } from './common';
import * as Keychain from 'react-native-keychain';
import { withRouter } from 'react-router';
import { MostodonService } from '../services';
import { actionUserProfile } from '../actions';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { pick, debounce } from 'lodash';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { instanceUri: '', searchResult: [] }
  }

  getInstanceUri () {
    const self = this
    return (
      AsyncStorage.getItem(apis.oauth_keys.instanceUri)
      .then ((value) => {
        global.instanceUri = value
        self.setState({ instanceUri: value })
        self.props.actionUserProfile({ path: apis.v1_current_user})
      })
    )
  }
  componentDidMount() {
    const self = this
    Keychain
      .getGenericPassword()
      .then(function(credentials) {
        if (credentials.password) {
          global.access_token = credentials.password
          self.getInstanceUri()
        } else {
          self.props.history.push('/login');
        }
      }).catch(function(error) {
        console.log('Keychain couldn\'t be accessed! Maybe no value set?', error);
        self.props.history.push('/login');
      })
  }

  signOut () {
    const self = this
    Keychain
    .resetGenericPassword()
    .then(function() {
      AsyncStorage.removeItem('instanceUri')
      .then (() => {
        console.log('Credentials successfully deleted');
        self.props.history.push('/login');
      });
    })
    .catch (error => console.log('resetGenericPassword:', error));
  }

  openDrawer () {
    this.refs['DRAWER'].openDrawer()
  }

  find = debounce((text) => {
    MostodonService.v1_accounts_search({ path: apis.v1_accounts_search, name: text, limit: 5})
    .then((response) => {
      let accounts = response.map((data) => {
        return pick(data, ['id', 'username', 'avatar']);
      })
      this.setState({searchResult: accounts})
    })
    .catch ((error) => {
      console.log(error)
    });
  }, 1000);

  closeSearch = (value) => {
    if (value) {
      this.setState({
        searchResult: []
      })
    }
  }

  goToProfile = () => {
    this.props.history.push('/profile')
  }

  render () {
    const {
      pImageContainerStyle,
      pImageStyle,
      textStyle,
      verticalLine,
      textCategory
    } = styles
    let navigationView = (
      <View style={{flex: 1, backgroundColor: '#222330'}}>
        <TouchableWithoutFeedback onPress = {this.goToProfile}>
        <View style = {pImageContainerStyle}>
          <Image
            style={pImageStyle}
            source={{uri: this.props.avatar}}/>
          <Text
            style={textStyle}>
            {this.props.username}
          </Text>
          <View style = {{ flexDirection: 'row', alignItems: 'center'}}>
            <Text
              style={textStyle}>
              {`${this.props.followers_count} followers`}
            </Text>
            <View style = {verticalLine}/>
            <Text
              style={textStyle}>
              {`${this.props.following_count} following`}
            </Text>
          </View>
          <Text
            style={{fontSize: 14, color: 'white'}}>
            {`${this.props.statuses_count} post(s)`}
          </Text>
          </View>
        </TouchableWithoutFeedback>

        <View style = {{
          width: 280,
          flexDirection: 'row',
          alignSelf: 'center',
          backgroundColor: 'white',
          height: .2,
          marginTop: 10,
        }}/>
        <View>
          <View style = {{ marginTop: 30, flexDirection: 'row', alignItems: 'center', padding: 6, marginLeft: 6 }}>
          <Ionicons name="ion-android-favorite" size={20} color="#fff" />
          <Text
          style={textCategory}
          onPress = { this.signOut.bind(this)}>Favorites</Text>
          </View>
          <View style = {{ flexDirection: 'row', alignItems: 'center', padding: 6, marginLeft: 6 }}>
          <Ionicons name="ion-backspace-outline" size={24} color="#fff" />
          <Text
          style={textCategory}
          onPress = { this.signOut.bind(this)}>
          Users blocks</Text>
          </View>
          <View style = {{ flexDirection: 'row', alignItems: 'center', padding: 6, marginLeft: 6 }}>
          <Ionicons name="sion-log-out" size={24} color="#fff" />
          <Text
          style={textCategory}
          onPress = { this.signOut.bind(this)}>
          Logout</Text>
          </View>
        </View>
      </View>
    );
    return (
      <DrawerLayoutAndroid
        ref={'DRAWER'}
        drawerWidth={300}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        renderNavigationView={() => navigationView}>
        <SearchToolbar
          toggleValue = { this.closeSearch.bind(this) }
          onHumburger = {this.openDrawer.bind(this)}
          onChangeText = { (text) => this.find(text)}
          />
        { this.state.instanceUri ? <MostodonTabs /> : null }
        { this.state.searchResult.length ? <SearchListDropDown data = {this.state.searchResult} /> : null }

      </DrawerLayoutAndroid>
    )
  }
}


const mapStateToProps = ({ profile }) => {
  const { username, avatar, followers_count, following_count, statuses_count } = profile;
  return { username, avatar, followers_count, following_count, statuses_count };
}

const styles = {
  pImageContainerStyle: {
    padding: 12,
    alignItems: 'center',
  },
  pImageStyle: {
    height: 80,
    borderRadius: 50,
    width: 80,
  },
  textStyle: {
    margin: 10,
    fontSize: 14,
    textAlign: 'left',
    color: 'white',
  },
  verticalLine: {
    backgroundColor: 'white',
    width: 1,
    height: 28,
  },
  textCategory: {
    marginLeft: 24,
    padding: 8,
    fontSize: 14,
    textAlign: 'left',
    color: 'white',
  },
}

export default connect (mapStateToProps, { actionUserProfile })(withRouter(Home));
