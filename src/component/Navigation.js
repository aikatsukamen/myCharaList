import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import FolderIcon from '@material-ui/icons/Folder';
import SortIcon from '@material-ui/icons/Sort';
import SortByAlphaIcon from '@material-ui/icons/SortByAlpha';
import Button from '@material-ui/core/Button';
import RefreshIcon from '@material-ui/icons/Refresh';
const styles = {
  root: {
    width: '80vw'
  },
  button: {
    position: 'absolute',
    top: '5px',
    right: '0'
  }
};

const SimpleBottomNavigation = props => {
  const { classes } = props;

  const handleChange = (event, value) => {
    props.changeView(value);
  };

  return (
    <div>
      <BottomNavigation value={props.selected} onChange={handleChange} showLabels className={classes.root}>
        <BottomNavigationAction value="id" label="デフォルト" icon={<SortByAlphaIcon />} />
        <BottomNavigationAction value="kktId" label="KKTID順" icon={<SortByAlphaIcon />} />
        <BottomNavigationAction value="name" label="名前順" icon={<SortIcon />} />
        <BottomNavigationAction value="notHave" label="未所持" icon={<FolderIcon />} />
      </BottomNavigation>
      <Button color="primary" className={classes.button} onClick={props.requestList}>
        <RefreshIcon className={classes.icon} style={{ fontSize: 30 }} />
      </Button>
    </div>
  );
};

SimpleBottomNavigation.propTypes = {
  classes: PropTypes.object.isRequired,
  selected: PropTypes.string.isRequired,
  changeView: PropTypes.func.isRequired,
  requestList: PropTypes.func.isRequired
};

export default withStyles(styles)(SimpleBottomNavigation);
