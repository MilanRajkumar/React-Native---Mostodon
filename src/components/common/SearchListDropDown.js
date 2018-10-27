import React, { Component } from 'react';
import { Text, TouchableOpacity, View, Image, ListView, StyleSheet } from 'react-native';

class SearchListDropDown extends Component {
  componentWillMount() {
    this.createDataSource(this.props)
  }
  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps)
  }
  createDataSource({data}) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    if (!data) {
      this.state = {
        dataSource: ds.cloneWithRows([])
      }
    } else {
      this.setState({dataSource: ds.cloneWithRows(data)})
    }
  }
  render () {
    return (
      <ListView
        enableEmptySections
        style={styles.containerStyle}
        dataSource = { this.state.dataSource }
        renderRow = {(rowData) => this.renderRow(rowData)}
        renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}/>
    )
  }
  renderRow (row) {
    const {containerStyle, textStyle, pImageContainerStyle, pImageStyle} = styles
    return (
      <View style = {{flex: 1, flexDirection: 'row' }}>
          <View style = {pImageContainerStyle}>
            <Image
              style={pImageStyle}
              source={{uri: row.avatar}}/>
          </View>
          <Text style = {textStyle}>{`${row.username}`}</Text>
        </View>
    )
  }
}


const styles= {
  pImageContainerStyle: {
    flex: 1,
    padding: 10,
  },
  pImageStyle: {
    width: 24,
    height: 24,
    borderRadius: 4,
    marginLeft: 24,
  },
  textStyle: {
    padding: 4,
    fontSize: 16,
    textAlign: 'left',
    flex: 3,
    alignSelf: 'center',
  },
  containerStyle: {
    backgroundColor: '#bfbfbf',
    top: 50,
    zIndex: 1,
    width: '100%',
    flexWrap: 'wrap',
    position: 'absolute',
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },
}
export {SearchListDropDown}
