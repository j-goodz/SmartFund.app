import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import * as actionCreators from '../../config/actions';
import { connect } from 'react-redux';
import moment from 'moment';


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
function createData(
  name, 
  iconUrl, 
  // ticker, 
  initial_amount, 
  initial_price, 
  book_value, 
  market_value, 
  change
) {
  id += 1;
  return { 
    id, 
    name, 
    iconUrl,
    // ticker, 
    initial_amount, 
    initial_price, 
    book_value, 
    market_value, 
    change 
};
}

export class SmartFundDetails extends Component {
  constructor(props) {
    super(props);
    // this.state = {
      //   portfolios: null,
      //   // portfolio_id: this.props.portfolios
      // }
    }  
    
    componentDidMount() {
    }

    // percIncrease(a, b) {
    //   let percent;
    //   if(b !== 0) {
    //       if(a !== 0) {
    //           percent = (b - a) / a * 100;
    //       } else {
    //           percent = b * 100;
    //       }
    //   } else {
    //       percent = - a * 100;            
    //   }       
    //   return Math.floor(percent);
    // }
      
  render() {    
		const { classes } = this.props
		const portfolio_id = this.props.selected_portfolio    
		const current_date = moment().format("YYYY-MM-DD").toString()
		let latest_prices = null
		let data = []

		data = this.props.portfolios[portfolio_id].inception_allocations.map((item) => {
			const symbol = this.props.spot_price.DISPLAY[item.ticker][this.props.local_currency].FROMSYMBOL
			const iconUrl = this.props.spot_price.DISPLAY[item.ticker][this.props.local_currency].IMAGEURL
			const book_value = (item.price * item.amount).toFixed(2)
			const market_value = (item.amount * this.props.spot_price.RAW[item.ticker][this.props.local_currency].PRICE).toFixed(2)
			const percent_change = this.percIncrease( book_value, market_value) + "%"
			let coin_name 
			// console.log("this.props.coin_data ", this.props.coin_data)
			if ( this.props.coin_data !== null ) { 
			coin_name = Object.values(this.props.coin_data).map((coin_item) => {
				if(coin_item.Symbol === item.ticker){
				return coin_item.FullName
				}
			})
			}

			return (
			createData( 
				coin_name,
				iconUrl,
				// item.ticker, 
				symbol + ' ' + item.amount,
				'$' + item.price,
				'$' + book_value,
				'$' + market_value, 
				percent_change  
			)
			)
		})

		return (
		<Paper className={classes.root}>
			<Table className={classes.table}>
			<TableHead>
				<TableRow>
				<TableCell>Crypto Asset (Ticker)</TableCell>
				{/* <TableCell align="center">Ticker</TableCell> */}
				<TableCell align="center">Initial Amount</TableCell>
				<TableCell align="center">Initial Price Per Unit ({this.props.local_currency})</TableCell>
				<TableCell align="right">Book Value ({this.props.local_currency})</TableCell>
				<TableCell align="right">Market Value ({this.props.local_currency})</TableCell>
				<TableCell align="right">% Change</TableCell>
				</TableRow>
			</TableHead>
			<TableBody>
				{data.map(n => (
				<TableRow key={n.id}> 
					<TableCell component="th" scope="row">
					<img src={ `https://www.cryptocompare.com${n.iconUrl}` } width={16} height={16} ></img>
					&nbsp;
					{n.name}
					</TableCell>
					{/* <TableCell align="center">{n.ticker}</TableCell> */}
					<TableCell align="center">{n.initial_amount} {n.ticker}</TableCell>
					<TableCell align="center">{n.initial_price}</TableCell>
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

SmartFundDetails.propTypes = {
  classes: PropTypes.object.isRequired,
};


const mapStateToProps=(state) => {
  const { portfolios, historical_price_data, selected_portfolio, spot_price, local_currency, coin_data } = state
  return { portfolios, historical_price_data, selected_portfolio, spot_price, local_currency, coin_data }
}

export default connect(mapStateToProps, actionCreators)(withStyles(styles)(SmartFundDetails));
