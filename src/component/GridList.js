import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import LazyLoad from 'react-lazyload';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    width: '90vw',
    height: '80vh'
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)'
  },
  gridListRoot: {
    height: '50px'
  },
  gridListTitle: {
    fontSize: '10px'
  },
  gridListSubTitle: {
    fontSize: '10px'
  },
  progress: {
    margin: theme.spacing.unit * 2
  }
});

const TitlebarGridList = props => {
  const { classes } = props;

  let newList = [...props.list];
  switch (props.sort) {
  case 'id':
    // マイキャラリストのID
    break;
  case 'kktId':
    // KKTID
    newList.sort((a, b) => {
      return a.kktId < b.kktId ? -1 : 1;
    });
    break;
  case 'name':
    // マイキャラ名
    newList.sort((a, b) => {
      return a.name < b.name ? -1 : 1;
    });
    break;
  case 'notHave':
    // 未所持
    newList = newList.filter(user => {
      return props.have.indexOf(user.id) === -1;
    });
    break;
  default:
    break;
  }

  return (
    <div className={classes.root}>
      <GridList cellHeight={180} className={classes.gridList} cols={2}>
        {newList.map(tile => (
          <GridListTile key={tile.id}>
            <LazyLoad overflow={true} once={true} height={'100%'} offset={[-100, 0]} debounce={100} placeholder={<CircularProgress className={classes.progress} />}>
              {/* 未所持は白黒画像にする */}
              {(() => {
                if (props.have.indexOf(tile.id) > -1) {
                  return <img src={tile.image} alt={tile.name} className="image" />;
                } else {
                  return <img src={tile.image} alt={tile.name} className="grayscale-image" />;
                }
              })()}
            </LazyLoad>
            <GridListTileBar
              title={tile.name}
              subtitle={<span>by:{tile.kktId}</span>}
              classes={{
                root: classes.gridListRoot,
                title: classes.gridListTitle,
                subtitle: classes.gridListSubTitle
              }}
              actionIcon={(() => {
                if (props.have.indexOf(tile.id) > -1) {
                  return (
                    <IconButton
                      className={classes.icon}
                      onClick={() => {
                        props.updateHaveList({ list: [tile.id], action: 'remove' });
                      }}
                    >
                      <RemoveIcon />
                    </IconButton>
                  );
                } else {
                  return (
                    <IconButton
                      className={classes.icon}
                      onClick={() => {
                        props.updateHaveList({ list: [tile.id], action: 'add' });
                      }}
                    >
                      <AddIcon />
                    </IconButton>
                  );
                }
              })()}
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
};

TitlebarGridList.propTypes = {
  classes: PropTypes.object.isRequired,
  list: PropTypes.array.isRequired,
  have: PropTypes.array.isRequired,
  sort: PropTypes.string.isRequired,
  updateHaveList: PropTypes.func.isRequired
};

export default withStyles(styles)(TitlebarGridList);
