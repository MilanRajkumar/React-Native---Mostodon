import React, { Component } from 'react';
import { ListView, View } from 'react-native';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { actionTimelineHome } from '../actions';
import ListItem from './ListItem';
import { apis } from '../components/common';
import { MostodonService } from '../services';

class TimelineHomeList extends Component {
  componentWillMount() {
    this.props.actionTimelineHome({ path: apis.v1_timeline_home})
    this.createDataSource(this.props)
  }
  componentWillReceiveProps(nextProps) {
    try {
      this.createDataSource(nextProps)
    } catch (e) {
      console.log("componentWillReceiveProps", e)
    }
  }
  createDataSource({timelineHome}) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    if (!timelineHome) {
      this.state = {
        dataSource: ds.cloneWithRows([])
      }
    } else {
      this.setState({dataSource: ds.cloneWithRows(timelineHome)})
    }
  }

  renderRow(eachTimeline) {
    return <ListItem timeline = {eachTimeline}/>
  }
  render () {
    return (
      <ListView
        enableEmptySections
        dataSource = { this.state.dataSource }
        renderRow = {(rowData) => this.renderRow(rowData)}/>
    )
  }
}

const mapStateToProps = ({timelineHome}) => {
  return {timelineHome};
}

export default connect(mapStateToProps, {actionTimelineHome})(withRouter(TimelineHomeList));
