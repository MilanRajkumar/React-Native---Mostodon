import React, { Component } from 'react';
import {
  TextInput,
  View,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity ,
  Text,
  Linking,
  AsyncStorage
 } from 'react-native';
import { withRouter } from 'react-router';
import { apis, Card, CardSection, Input, Button, Spinner, Dialog } from './common';
import { Ionicons } from '@expo/vector-icons';
import * as Keychain from 'react-native-keychain';
import { MostodonService } from '../services';
var dismissKeyboard = require('dismissKeyboard');

class LoginForm extends Component {
  state = { showDialog: false }
  goToLogin () {
    this.props.history.push('/login')
  }
  goToHome () {
    this.props.history.push('/')
  }

  componentDidMount () {
    var url = Linking.getInitialURL().then((url) => {
      if (url) {
        const self = this
        // Now store the access token to persistent store and redirect to home page
        try {
          const code = (url.split('='))[1]
          let myInput = {}
          AsyncStorage.multiGet([apis.oauth_keys.client_id, apis.oauth_keys.instanceUri, apis.oauth_keys.client_secret, apis.oauth_keys.redirect_uri], (err, stores) => {
           stores.map((result, i, store) => {
             // get at each store's key/value so you can work with it
             let key = store[i][0];
             let value = store[i][1];
             myInput[key] = value
            });
          })
          .then (() => {
            myInput.code = code
            myInput.path = apis.v1_oauth_token
             MostodonService.v1_oauth_token(myInput)
              .then((responseJson) => {
                global.access_token = responseJson.access_token
                Keychain
                  .setGenericPassword(myInput.instanceUri, responseJson.access_token)
                  .then(function() {
                    console.log('Credentials saved successfully!');
                    self.goToHome();
                  })
                  .catch (error => {
                    console.log('Not able to store Credentials.', error)
                  })
              })
              .catch (error => console.log(error));
            });
        } catch (error) {
          console.log('Not able to get instanceUri!!!')
        }
      }
    });
  }

  openUrl () {
    Linking.openURL('https://mastodon.social/about').catch(err => console.error('An error occurred', err));
  }
  openMore () {
    Linking.openURL('https://instances.mastodon.xyz').catch(err => console.error('An error occurred', err));
  }
  signIn () {
    try {
      AsyncStorage.setItem(apis.oauth_keys.instanceUri, this.state.url)
      .then (() => {
        global.instanceUri = this.state.url
        MostodonService.v1_apps(apis.v1_apps)
        .then((responseJson) => {
          this.redirectToBrowser(responseJson)
        })
        .catch (error => console.log(error));
      })
      .catch (error => {
        console.log('AsyncStorage', error)
      });
    } catch (error) {
      console.log('AsyncStorage', error)
    };
  }

  redirectToBrowser (responseJson) {
    AsyncStorage.multiSet([
      [apis.oauth_keys.client_id, responseJson.client_id],
      [apis.oauth_keys.client_secret, responseJson.client_secret],
      [apis.oauth_keys.redirect_uri, responseJson.redirect_uri]
    ]).then (() => {
      let uri = `http://${this.state.url}/oauth/authorize?client_id=${responseJson.client_id}&redirect_uri=mastodon://com.ping_me&response_type=code`
      Linking.openURL(uri).catch(err => console.error('An error occurred in openning the login uri', err));
    })
  }
  render () {
    const {
      formContainerStyle,
      containerStyle,
      inputStyle,
      buttonContainerStyle,
      imageContainerStyle,
      imageStyle,
      infoContainerStyle,
      infoImageStyle,
      link1Style
    } = styles
    return (
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <View style={formContainerStyle}>
          <View style={imageContainerStyle}>
            <Image
              style={imageStyle}
              source={require('../assets/image/mastodon.png')}/>
          </View>
          <View style = { containerStyle }>

            <TextInput
              autoCorrect = { false }
              placeholder = { 'Your instance (eg: mastodon.social)' }
              style = { inputStyle }
              placeholderTextColor = {'#5f6286'}
              underlineColorAndroid = {'#5f6286'}
              onChangeText = { (url) => this.setState({url}) }/>

              <View style={buttonContainerStyle}>
                <Button onPress = { this.signIn.bind(this) }>
                  {"Let's Go"}
                </Button>
              </View>

              <TouchableOpacity
                style={infoContainerStyle}
                onPress = { () =>  this.setState({showDialog: !this.state.showDialog}) }>
                <Image
                  style={infoImageStyle}
                  source={require('../assets/image/info.png')}/>
              </TouchableOpacity >
            </View>
            <Dialog visible = { this.state.showDialog }
              onClose = { () =>  this.setState({showDialog: !this.state.showDialog})}>
              {`The address or domain of any instance can be entered here, such as mastodon.social, icosahedron.website, social.tchncs.de, and`} <Text style = { link1Style } onPress = {this.openMore}>more!</Text>
              {`\n\nIf you don't yet have an account, you can enter the name of the instance you would like to join and create an account there.`}
              {`\n\nAn instance is a single place where your account is hosted, but you can easily communicate with and follow folks on other instances as though you were on the same site.`}
              {`\n\nMore info can be found at`} <Text style = { link1Style } onPress = {this.openUrl}>mastodon.social</Text>
            </Dialog>
        </View>

      </TouchableWithoutFeedback>
    )
  }
}

const styles = {
  errorTextStyle : {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  },
  formContainerStyle: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#222330',
    justifyContent: 'center'
  },
  buttonContainerStyle: {
    justifyContent: 'center',
    marginTop: 20
  },
  inputStyle: {
    height: 40,
    fontSize: 14,
    color: 'white',
    textAlign: 'center'
  },
  containerStyle: {
    flex: 2,
    flexDirection: 'column',
    marginTop: 40,
    marginLeft: 20,
    marginRight: 20
  },
  imageContainerStyle: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  imageStyle: {
    width: 150,
    height: 150,
    resizeMode: 'contain'
  },
  infoContainerStyle: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  infoImageStyle: {
    width: 36,
    height: 36,
    resizeMode: 'contain'
  },
  link1Style: {
    color: '#3c9add',
    textDecorationLine: 'underline',
  }
}

export default (withRouter(LoginForm));
