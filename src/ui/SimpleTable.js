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
    
    
    componentDidMount() {

      
    }

    percIncrease(a, b) {
      let percent;
      if(b !== 0) {
          if(a !== 0) {
              percent = (b - a) / a * 100;
          } else {
              percent = b * 100;
          }
      } else {
          percent = - a * 100;            
      }       
      return Math.floor(percent);
    }
      
  render() {    
    const { classes } = this.props
    const portfolio_id = this.props.selected_portfolio      
    const current_date = moment().format("YYYY-MM-DD").toString()
    let latest_prices = null
    let data = []

    if (this.props.historical_price_data !== null) {
      for (let item of this.props.historical_price_data) {
        if ( current_date === item.date ) {
          latest_prices = item
        }
      }
      
      data = this.props.portfolios[portfolio_id].inception_allocations.map((item) => {
        // console.log("item.amount * latest_prices[item.ticker]: ", item.amount * latest_prices[item.ticker])
        // const book_value = item.price * item.amount
        // const market_value = (item.amount * latest_prices[item.ticker]).toFixed(2)
        // const percent_change = this.percIncrease( book_value, market_value) + "%"
        // // const percent_change = (book_value / market_value ).toFixed(2)
        // (item.amount * latest_prices[item.ticker]).toFixed(2) + '%'

        // if (isNaN(item.price) {
        //   return
        // }
        return (
          createData( 
            item.name,
            item.ticker, 
            // item.amount,
            // '$' + book_value,
            // '$' + market_value, 
            // percent_change  
              
          )
        )
      })

    }
    



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
