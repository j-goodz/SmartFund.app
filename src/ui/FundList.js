import React, { Component } from 'react'
import * as actionCreators from '../config/actions';
import { connect } from 'react-redux';
import FundCard from './FundCard';
// import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
// import FormLabel from '@material-ui/core/FormLabel';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import RadioGroup from '@material-ui/core/RadioGroup';
// import Radio from '@material-ui/core/Radio';
// import Paper from '@material-ui/core/Paper';


// const styles = {
//   card: {
//     maxWidth: 345,
//   },
//   media: {
//     height: 140,
//   },
//   //  cardPadding: {    
//   //    padding: '30px',   
//   // },
// };

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing.unit * 2,
  },
});

export class FundList extends Component {
	render() {
		const { classes } = this.props;
		const { spacing } = this.props;

		let fundList
		if ( this.props.spot_price !== null && this.props.loaded_data.spot_price === true ) {
			fundList = this.props.portfolios.map((portfolio) => {
				return (
					<Grid 
					item 
					xs={12}
					sm={12}
					md={12}
					lg={6}
					xl={6} 
					key={ portfolio.id } 
					// spacing={40} 
					>
						<FundCard 
						portfolio={portfolio} 
						key={ portfolio.id } 
						// spacing={Number(spacing)} 
						/> 
					</Grid>
				)
      		})
    	}

		return (
			<div>
				{ this.props.portfolios.length === 0 
				? <div><p>You have no SmartFunds</p></div>
				: <div>
					<Grid 
					// row
					container 
					// direction={'row'}
					className={classes.root} 
					// justify={'space-evenly'}
					// alignItems={'center'}
					// item 
					// cols={3}
					// wrap={'wrap'}
					spacing={32}
					>
						{ fundList } 
					</Grid>
				</div>
				}	
			</div>  
		)
	}
}

FundCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps=(state) => {
    const { portfolios, mm_account, selected_portfolio, historical_price_data, spot_price, local_currency, loaded_data } = state
    return { portfolios, mm_account, selected_portfolio, historical_price_data, spot_price, local_currency, loaded_data }
}
export default connect(mapStateToProps, actionCreators)(withStyles(styles)(FundList))