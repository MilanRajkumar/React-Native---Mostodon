import React  from 'react';
import { ToolbarAndroid } from 'react-native';

const Toolbar = ({onActionSelected}) => {
    return (
      <ToolbarAndroid
      style = {styles.toolbarStyle}
      title = "Employee List"
      actions = {
          [
            {
              title: 'Add',
              show: 'always'
           }
          ]
        }
      onActionSelected = { onActionSelected } />
    )
}

const styles = {
  toolbarStyle: {
    height: 40,
    alignItems: 'center'
  }
}

export {Toolbar}
