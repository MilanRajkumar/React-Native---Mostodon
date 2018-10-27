import React, { Component } from 'react';
import { View, Modal, Text, TouchableOpacity } from 'react-native';
import { CardSection } from './CardSection';
import { Button } from './Button';

const Dialog = ({ children, visible, onClose }) => {
  const { containerStyle, textStyle, closeTextStyle, cardSectionStyle, closeTextContainer } = styles
  return (
    <Modal
      visible = { visible }
      transparent
      animationType = 'slide'
      onRequestClose = { () => {} }
    >
      <View style = { containerStyle }>
        <View style = { cardSectionStyle }>
          <Text adjustsFontSizeToFit={true} style = { textStyle }>{ children }</Text>
          <TouchableOpacity onPress={onClose} style = {styles.closeTextContainer}>
            <Text style = {closeTextStyle}>
              CLOSE
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
};

const styles = {
  cardSectionStyle: {
    flex: 6
  },
  textStyle: {
    flex: 1,
    padding: 18,
    fontSize: 15,
    color: 'white'
  },
  containerStyle: {
    backgroundColor: '#404040',
    marginTop: 70,
    marginBottom: 70,
    marginLeft: 20,
    marginRight: 20,
    flex: 1,
    borderRadius: 2
  },
  closeTextStyle: {
    alignSelf: 'center',
    fontSize: 14,
    fontWeight: '600',
    paddingTop: 10,
    color: '#3c9add',
    paddingBottom: 10
  },
  closeTextContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginLeft: 20,
    marginRight: 20
  }
}

export { Dialog };
