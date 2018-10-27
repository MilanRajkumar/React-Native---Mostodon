import React, {Component} from 'react';
import {CardSection} from './common';
import { Text, View, Image } from 'react-native';
import HTMLView from 'react-native-htmlview';
import  { Ionicons }  from '@expo/vector-icons';

class ListItem extends Component {
  render () {
    const {
      usernameStyle,
      pImageContainerStyle,
      pImageStyle,
      textStyle,
      verticalLine,
      rightTopContainer
    } = styles
    let { account, content } = this.props.timeline
    const html = `<div> ${content} </div>`
    return(
        <View style = {{flex: 1, flexDirection: 'column'}}>
          <View style = {pImageContainerStyle}>
            <Image
              style={pImageStyle}
              source={{uri: account.avatar}}/>
              <View style = {rightTopContainer}>
                <Text style = {usernameStyle}>{`${account.display_name} @${account.acct}`}</Text>
                <View style = {{ flexDirection: 'row', alignItems: 'center'}}>
                  <Text
                    style={textStyle}>
                    {`${account.followers_count} follower(s)`}
                  </Text>
                  <Text
                    style={textStyle}>
                    {`${account.following_count} following`}
                  </Text>
                </View>
              </View>
          </View>
          <View style = {{ padding: 6 }}>
            <HTMLView
            value={html}
            stylesheet={styles.htmlStyles}
            />
            <View style = {{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', marginLeft: 40, marginRight: 40, padding: 10}}>
              <Ionicons name="ion-reply" size={18} color="#7a839f" />
              <Ionicons name="ion-android-favorite" size={18} color="#7a839f" />
              <Ionicons name="ion-arrow-return-left" size={18} color="#7a839f" />
              <Ionicons name="ion-ios-more" size={18} color="#7a839f" />
            </View>
          </View>

        </View>
    )
  }
}



const styles = {
  rightTopContainer: {
    flex: 4,
  },
  usernameStyle: {
    fontSize: 14,
    paddingLeft: 16,
    color: 'white',
  },
  pImageContainerStyle: {
    flex: 1,
    flexDirection: 'row',
    padding: 4,
  },
  pImageStyle: {
    height: 50,
    flex: 1,
    borderRadius: 4,
    alignSelf: 'center',
  },
  htmlStyles: {
    span: {
      fontWeight: '300',
      color: '#ffff80',
    },
    p: {
      color: 'white',
    }
  },
  textStyle: {
    marginLeft: 16,
    paddingTop: 4,
    fontSize: 10,
    textAlign: 'left',
    color: 'white',
  },
  verticalLine: {
    backgroundColor: 'white',
    width: 1,
    height: 28,
  },
};

export default ListItem;
