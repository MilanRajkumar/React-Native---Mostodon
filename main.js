import Expo from 'expo';
import React , { Component } from 'react';
import { View, Text } from 'react-native';
import LoginForm0 from './src/components/LoginForm0';
import Profile from './src/components/Profile';
import Home from './src/components/Home';
import { Route, NativeRouter } from 'react-router-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './src/reducers';
import ReduxThunk from 'redux-thunk';

class App extends Component {
  render () {
    const store = createStore(reducers, applyMiddleware(ReduxThunk));
    return (
      <NativeRouter>
        <Provider store = { store }>
          <View style={styles.bgColor}>
            <Route exact path="/" component={Home}/>
            <Route exact path="/login" component={LoginForm0}/>
            <Route exact path="/profile" component={Profile}/>
          </View>
        </Provider>
      </NativeRouter>
    )
  }
}

const styles = {
  bgColor: {
    flex:1
  }
}
Expo.registerRootComponent(App);
