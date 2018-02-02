import React, { Component } from 'react';
import {AppBar, Typography} from 'material-ui'
import GridList, { GridListTile, GridListTileBar } from 'material-ui/GridList';
import Subheader from 'material-ui/List/ListSubheader';
import IconButton from 'material-ui/IconButton';
import InfoIcon from 'material-ui-icons/Info';



export default class ResultList extends Component {
  render() {

    return (
      <div>
        <GridList cellHeight={180}>
          <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
            <Subheader component="div">Agencies near by you</Subheader>
          </GridListTile>
          <GridListTile>
            <img src="/realty_austin.jpg" alt="Alternative text" width="180px"/>
            <GridListTileBar
              title="Bar title"
              subtitle={<span>by: "Author"</span>}
              actionIcon={
                <IconButton>
                  <InfoIcon />
                </IconButton>
              }
            />
          </GridListTile>
          <GridListTile>
            <img src="/realty_austin.jpg" alt="Alternative text" width="180px"/>
            <GridListTileBar
              title="Bar title"
              subtitle={<span>by: "Author"</span>}
              actionIcon={
                <IconButton>
                  <InfoIcon />
                </IconButton>
              }
            />
          </GridListTile>
        </GridList>
      </div>
    )
  }
}