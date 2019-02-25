import React, { Component } from 'react'
import * as actionCreators from '../config/actions';
import { connect } from 'react-redux';
import FundCard from './FundCard';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Paper from '@material-ui/core/Paper';



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

// const styles = theme => ({
//   cardPadding: {    
//     padding: '30px',   
//   },
// });



export class FundList extends Component {
  render() {
    const { classes } = this.props;
    const { spacing } = this.props;

    let fundList
    if ( this.props.spot_price !== null && this.props.loaded_data.spot_price === true ) {
      fundList = this.props.portfolios.map((portfolio) => {
        return (
          <Grid item xs={12}>
            {/* <Grid container className={classes.demo} justify="center" spacing={Number(spacing)}> */}
            {/* <FundCard portfolio={portfolio} key={ portfolio.id } className={classes.spacing} />  */}
            <FundCard portfolio={portfolio} key={ portfolio.id } spacing={Number(spacing)} /> 
            {/* <FundCard portfolio={portfolio} key={ portfolio.id }  />  */}
                {/* {[0, 1, 2].map(value => (
                <Grid key={value} item>
                  <Paper className={classes.paper} />
                </Grid>
              ))} */}
            {/* </Grid> */}
          </Grid>
          
        )
      })
    }

    return (
      <div>

        
        { 
          this.props.portfolios.length === 0 
          ? <div><p>You have no SmartFunds</p></div>
          : 
          <div>
              
              
              
              <Grid //row
              container 
              className={classes.root} 
              justify="space-between"
              spacing={40}
              >
              
              
              { fundList } 
              


{/* 
              <Grid item xs={12} spacing={40} >
                <Paper className={classes.control}>
                  <Grid container>
                    <Grid item>
                       <FormLabel>Filter</FormLabel> 
                      <RadioGroup
                        name="filter"
                        aria-label="Filter"
                        value={'filter'}
                        // onChange={this.handleChange('filter')}
                        row
                      >
                        <FormControlLabel value="0" control={<Radio />} label="All" />
                        <FormControlLabel value="1" control={<Radio />} label="Open" />
                        <FormControlLabel value="2" control={<Radio />} label="Liquidated" />
                      </RadioGroup>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
 */}


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


// export default connect(mapStateToProps, actionCreators)(withStyles(styles)(FundList))
// export default connect(mapStateToProps, actionCreators)(FundList)
export default connect(mapStateToProps, actionCreators)(withStyles(styles)(FundList))
