import React, { Component } from 'react'
import * as actionCreators from '../config/actions';
import { connect } from 'react-redux';
import FundCard from './FundCard';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

export class FundList extends Component {
  render() {
    return (
      <div>
       
      </div>
    )
  }
}

const mapStateToProps=(state) => {
    const { portfolios, mm_account, selected_portfolio, historical_price_data } = state
    return { portfolios, mm_account, selected_portfolio, historical_price_data }
}
  
export default connect(mapStateToProps, actionCreators)(FundList);
// export default connect(mapStateToProps, actionCreators)(withStyles(styles)(FundList));
