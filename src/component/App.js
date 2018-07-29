import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import './App.css';
import { requestList, changeView, updateHaveList } from '../actions';
import GridList from './GridList';
import Navigation from './Navigation';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    float: 'right',
    top: '-60px'
  },
  icon: {}
});

class App extends React.Component {
  componentWillMount() {
    // 初期表示時、リスト取得
    this.props.requestList();
  }

  render() {
    return (
      <div className="App">
        <Navigation selected={this.props.selected} changeView={this.props.changeView} requestList={this.props.requestList} />
        <div style={{ textAlign: 'left', padding: '5px', fontSize: '8px' }}>status:{this.props.status}</div>
        <GridList list={this.props.list} have={this.props.have} sort={this.props.selected} updateHaveList={this.props.updateHaveList} />
      </div>
    );
  }
}

// state
function mapStateToProps(state) {
  return {
    status: state.reducer.status,
    list: state.reducer.list,
    have: state.reducer.have,
    selected: state.reducer.selected
  };
}

// action
const mapDispatchToProps = {
  requestList,
  changeView,
  updateHaveList
};

App.propTypes = {
  classes: PropTypes.object.isRequired,
  status: PropTypes.string.isRequired,
  list: PropTypes.array.isRequired,
  have: PropTypes.array.isRequired,
  selected: PropTypes.string.isRequired,
  requestList: PropTypes.func.isRequired,
  changeView: PropTypes.func.isRequired,
  updateHaveList: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(App));
