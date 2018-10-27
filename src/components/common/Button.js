import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Button = ({onPress, children}) => {
  const {buttonStyle, textStyle} = styles
  return (
    <TouchableOpacity onPress={onPress} style = {styles.buttonStyle}>
      <Text style = {textStyle}>
        {children}
      </Text>
    </TouchableOpacity>
  )
}

const styles= {
  textStyle: {
    alignSelf: 'center',
    fontSize: 14,
    fontWeight: '600',
    paddingTop: 10,
    color: 'white',
    paddingBottom: 10
  },
  buttonStyle: {
    backgroundColor: '#1b6498',
    borderRadius: 2,
    borderColor: '#007aff'
  }
}

export { Button };
