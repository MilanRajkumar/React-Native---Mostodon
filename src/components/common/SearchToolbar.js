import React, { Component }  from 'react';
import { ToolbarAndroid } from 'react-native';
import {
  TextInput,
  View,
  ActivityIndicator
  } from 'react-native';

class SearchToolbar extends Component {
  constructor(props) {
    super(props)
    this.state = { searchClick: false, toSpin: false }
  }
  render () {
    let iconName = this.state.searchClick? 'times': 'search'
    return (
      <View>
        <ToolbarAndroid
        style = {styles.toolbarStyle}
        title = "Mastodon"
        titleColor = 'white'
        actions = {
          [
            {
              title: 'Search',
              show: 'always'
            }
          ]
        }
        onIconClicked={this.props.onHumburger}
        onActionSelected = {this.onActionSelected}
        >
        {
          !!this.state.searchClick ?
          <View style={ styles.searchContainer }>
            <TextInput style = {styles.searchBox}
              autoCorrect = {false}
              placeholderTextColor= '#bfbfbf'
              placeholder = "Search account"
              onChangeText = {
                this.onChangeText
              }/>
          </View> : null
        }

        </ToolbarAndroid>
        {this.showSpinner()}
      </View>
    )
  }

  showSpinner () {
    if (this.state.toSpin) {
      return <ActivityIndicator
        size={55}
      />
    } else {
      return null
    }
  }

  onChangeText = (text) => {
    console.log('calling..')
    this.setState({toSpin: true})
    this.props.onChangeText(text)
  }

  onActionSelected = (position) => {
    if (position === 0) { // index of 'Settings'
      if (this.state.searchClick) {
        this.props.toggleValue(this.state.searchClick)
      }
      this.setState({searchClick: !(this.state.searchClick)})
    }
  }
}

const styles = {
  toolbarStyle: {
    height: 56,
    backgroundColor: '#3f415a',
  },
  searchBox: {
    backgroundColor: 'transparent',
    color: 'white',
    flex: 1,
    marginTop: 2,
    marginBottom: 2,
    borderRadius: 2,
    fontSize: 16,
  },
  searchContainer: {
    flex: 1,
    backgroundColor: '#3f415a',
    flexDirection: 'row',
    alignSelf: 'center',
  }
}

export {SearchToolbar}
