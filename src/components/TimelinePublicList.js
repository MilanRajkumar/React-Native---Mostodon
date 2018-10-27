import React, { Component } from 'react';
import { ListView, View } from 'react-native';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { actionTimelinePublic } from '../actions';
import ListItem from './ListItem';
import { apis } from '../components/common';
import { MostodonService } from '../services';

class TimelinePublicList extends Component {
  componentWillMount() {
    this.props.actionTimelinePublic({ path: apis.v1_timeline_public})
    this.createDataSource(this.props)
  }
  componentWillReceiveProps(nextProps) {
    try {
      this.createDataSource(nextProps)
    } catch (e) {
      console.log("componentWillReceiveProps", e)
    }
  }
  createDataSource({timelinePublic}) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    if (!timelinePublic) {
      this.state = {
        dataSource: ds.cloneWithRows([])
      }
    } else {
      this.setState({dataSource: ds.cloneWithRows(timelinePublic)})
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

const mapStateToProps = ({timelinePublic}) => {
  return {timelinePublic};
}

export default connect(mapStateToProps, {actionTimelinePublic})(withRouter(TimelinePublicList));
