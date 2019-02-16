import React, { Component } from 'react'
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AddBoxtIcon from '@material-ui/icons/AddBox';
import InsertChartIcon from '@material-ui/icons/InsertChart';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import InfoIcon from '@material-ui/icons/Info';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import { NavLink } from 'react-router-dom'
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
// import store from '../config/store'
import * as actionCreators from '../config/actions';
import { connect } from 'react-redux';

import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';



      
const mainListItems = ( 
  <div>
    <Link to={process.env.PUBLIC_URL + '/dashboard'} style={{ textDecoration: 'none' }} >
      <ListItem button>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        {/* <NavLink to='/'><ListItemText primary="Dashboard" /></NavLink> */}
          <ListItemText primary="Dashboard" />
        </ListItem>
    </Link>    
    <Link to={process.env.PUBLIC_URL + '/new'} style={{ textDecoration: 'none' }} >
      <ListItem button>
      <ListItemIcon>
        <AddBoxtIcon />
      </ListItemIcon>
      {/* <NavLink to='/new'><ListItemText primary="New Portfolio" /></NavLink> */}
        <ListItemText primary="New Portfolio" />
      </ListItem>
    </Link>    
    <Link to={process.env.PUBLIC_URL + '/performance'} style={{ textDecoration: 'none' }} >
      <ListItem button>
        <ListItemIcon>
          <InsertChartIcon />
        </ListItemIcon>
        {/* <NavLink to='/performance'><ListItemText primary="New Performance" /></NavLink> */}
        {/* <Link to={process.env.PUBLIC_URL + '/'} > */}
          <ListItemText primary="Performance" />
      </ListItem>
    </Link>
  </div>
)


export class ListItems extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   portfolios: null,
    //   // portfolio_id: this.props.portfolios
    // }
  }  

  componentDidMount() {

  }

  render() {
    let openListItems = this.props.portfolios.map((item) => {
      // console.log(item.id, item.portfolio_name, item.status)
      
      if (item.status === 'open') {
        return (
          <Link to={ process.env.PUBLIC_URL + `/dashboard/${item.id}` } style={{ textDecoration: 'none' }} key={item.id} >
            <ListItem button key={item.id}>
              <ListItemIcon>
                <ShowChartIcon />
              </ListItemIcon>
              <ListItemText primary={ item.portfolio_name } />
            </ListItem>

          </Link>
        );
      }
    })

    let closedListItems = this.props.portfolios.map((item) => {
      // console.log(item.id, item.portfolio_name, item.status)
      
      if (item.status === 'closed') {
        return (
          <Link 
            to={ process.env.PUBLIC_URL + `/dashboard/${item.id}` } 
            style={{ textDecoration: 'none' }} 
            // match={match} 
            key={item.id} 
          >




            <ListItem button>
              <ListItemIcon>
                <ShowChartIcon />
              </ListItemIcon>
              <ListItemText primary={ item.portfolio_name } />
            </ListItem>
          </Link>
        );
      }
    })
    
    function selectPortfolio(id) {
      
    }

    return ( 
      <div>
        <Divider />
        {/* { this.state.portfolios } */}
        <List>{mainListItems}</List>
        <Divider />
        <ListSubheader inset>Open Portfolios</ListSubheader>
        <List>{openListItems}</List>
        <Divider />
        <ListSubheader inset>Liquidated Portfolios</ListSubheader>
        <List>{closedListItems}</List>
      </div>   
    )
  }
}
      
const mapStateToProps=(state) => {
  const { btc_price, interval, count, portfolios, historical_price_data } = state
  return { btc_price, interval, count, portfolios, historical_price_data }
  // return state
}

export default connect (mapStateToProps)(ListItems)

