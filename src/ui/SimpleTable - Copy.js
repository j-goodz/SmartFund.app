import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import * as actionCreators from '../config/actions';
import { connect } from 'react-redux';
import Stringify from 'react-stringify'
import moment from 'moment';
import { renderByOrder } from 'recharts/lib/util/ReactUtils';

const styles = {
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
};


let id = 0;
function createData(name, ticker, initial_amount, book_value, market_value, change) {
  id += 1;
  return { id, name, ticker, initial_amount, book_value, market_value, change };
}



export class SimpleTable extends Component {
  constructor(props) {
    super(props);
    // this.state = {
      //   portfolios: null,
      //   // portfolio_id: this.props.portfolios
      // }
    }  
    
    
    // function SimpleTable(props) {
      
      
  render() {
        
    const { classes } = this.props;
    const portfolio_id = this.props.selected_portfolio
      
    const current_date = moment().format("YYYY-MM-DD").toString()
        
    // console.log("this.props.historical_price_data: ", this.props.historical_price_data)
    
    const latest_prices = this.props.historical_price_data.map((item) => {
      console.log("loop" )

      if ( current_date === item.date ) {
        console.log("foudn item.date!", item.date )
        return item
      } else {
        return
      }
    })
    
    // console.log("latest_prices: ", latest_prices)

    let data = this.props.portfolios[portfolio_id].inception_allocations.map((item) => {
      return (createData( item.name, item.ticker, item.amount,'$' +  item.price * item.amount , "$ -- ", "-- %" ))
    })



    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Crypto Asset</TableCell>
              <TableCell align="center">Ticker</TableCell>
              <TableCell align="center">Initial Amount</TableCell>
              <TableCell align="right">Book Value</TableCell>
              <TableCell align="right">Market Value</TableCell>
              <TableCell align="right">% Change</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(n => (
              <TableRow key={n.id}> 
                <TableCell component="th" scope="row">
                  {n.name}
                </TableCell>
                <TableCell align="center">{n.ticker}</TableCell>
                <TableCell align="center">{n.initial_amount} {n.ticker}</TableCell>
                <TableCell align="right">{n.book_value}</TableCell>
                <TableCell align="right">{n.market_value}</TableCell>
                <TableCell align="right">{n.change}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    );

  }
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
};


const mapStateToProps=(state) => {
  const { portfolios, historical_price_data, selected_portfolio } = state
  return { portfolios, historical_price_data, selected_portfolio }
}

export default connect(mapStateToProps, actionCreators)(withStyles(styles)(SimpleTable));
