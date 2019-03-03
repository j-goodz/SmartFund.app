import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import SimpleLineChart from './SimpleLineChart';
import SimpleTable from './SimpleTable';
import moment from 'moment';
import * as actionCreators from '../config/actions';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const styles = theme => ({
  root: {
    display: 'flex',
  },
})

class SmartFund extends React.Component {
  state = {
    // open: true,
  };
  
  render() {
    // console.log("this.props.match.params.id", this.props.match.params.id)
    const { classes } = this.props;

		if (this.props.selected_portfolio === -1 ) {
		// if (this.props.selected_portfolio === -1 && this.props.acctive_ui === 'smartfund') {
			return <Redirect from={process.env.PUBLIC_URL + '/:id'} to={process.env.PUBLIC_URL + '/'} />
    }
    
    return (
      <div className={classes.root}>
        {/* <CssBaseline /> */}
        <main className={classes.content}>
            <Typography variant="h4" gutterBottom component="h2">
              { this.props.portfolios[this.props.selected_portfolio].portfolio_name }
            </Typography>
            <Typography variant="h6" gutterBottom component="h2">
              Created { moment.unix(this.props.portfolios[this.props.selected_portfolio].inception_date).format('lll') }
              {/* const date = moment.unix(item.time).format('YYYY-MM-DD') */}
            </Typography>
            <Typography variant="h6" gutterBottom component="h2">
              Price {this.props.local_currency}
            </Typography>
            <Typography component="div" className={classes.chartContainer}>
              <SimpleLineChart />
            </Typography>
            <Typography variant="h5" gutterBottom component="h2">
              Asset Allocation
            </Typography>
            <div className={classes.tableContainer}>
              <SimpleTable />
            </div>
        </main>
      </div>
    );
  }
}

SmartFund.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps=(state) => {
  const { mm_account, selected_portfolio, mm_account_balance, portfolios, loaded_data, local_currency } = state
  return { mm_account, selected_portfolio, mm_account_balance, portfolios, loaded_data, local_currency }
}

export default connect(mapStateToProps, actionCreators)(withStyles(styles)(SmartFund));

