import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import * as actionCreators from '../config/actions';
import { connect } from 'react-redux';
import Input from '@material-ui/core/Input';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import classNames from 'classnames';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import SelectField from 'material-ui/SelectField';
import PieChart from './PieChart';
import AllocationSetup from './AllocationSetup';

// import Select from 'material-ui/Select';
// import { MenuItem,  DropDownMenu } from 'material-ui/MenuItem';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  DropDownMenu
} from 'material-ui';

import {
  Card,
  Text,
  Icon,
  MetaMaskButton
} from 'rimble-ui'




const styles = theme => ({
  root: {
    width: '90%',
  },
  button: {
    marginTop: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  actionsContainer: {
    marginBottom: theme.spacing.unit * 2,
  },
  resetContainer: {
    padding: theme.spacing.unit * 3,
  },
});



function getSteps() {
  return ['Account Funding', 'Asset Selection', 'Choose Allocations','Name your SmartFund:', 'Review', 'Transaction Confirmation','Done!'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return (
        `Enter the amount of Ether you would like to start your SmartFund with:`
        );
    case 2:
      return `Set the allocations of your SmartFund portfolio:`;
    case 3:
      return ``;
    case 4:
      return `Review and create your SmartFund before inception:`;
    case 5:
      return `Waiting for SmartFund tranaction to be mined...`;
    case 7:
      return `Success! Your SmartFund has been created! You can view it in the My SmartFunds screen.`;
    default:
      return 'Unknown step';
  }
}

class NewSmartFund extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeStep: 0,
            values: [],
            assetListLoaded: false,
            assetListData: [],
            selectedAssets: [],
            // Step 1 - SmartFund name and funding. Details Funding Step - block if mm account balance too low or mm is locked.
            smartfund_name: '',
            mm_account: '',
            mm_account_balance: null,
            funding_amount: 0,

            // Step 2 Asset Selection & Step 3 Choose Allocations
            asset_holdings: [
                {
                    portfolio_name: '',
                    inception_allocations: [
                        {
                            name: 'Bitcoin',
                            ticker: 'BTC',
                            price: 983.35,
                            amount: 3.53,
                        }
                    ]
                }  
            ],

            // Step 4 - Name Smartfund
            // Step 7 - Done
            // smartfund_contract: '', // accept reponse for new contract, get back new contract address?

        }

    }
    handleChange = (event, index, selectedAssets) => {
      
      this.setState({selectedAssets});
    console.log("event",event)
    console.log("index",index)
    console.log("selectedAssets",selectedAssets)
    
    }

  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1,
    }));
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };

  menuItems() {
    return this.props.coin_data.map((coin) => (
      <MenuItem
        key={coin.FullName}
        insetChildren={true}
        checked={this.state.selectedAssets && this.state.selectedAssets.indexOf(coin) > -1}
        value={coin.FullName}
        primaryText={coin.FullName}
      />
    ));
    
  }

  render() {
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep } = this.state;

    return (
      <div className={classes.root}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
              <StepContent>
                      <Card className={classes.card}  >
                      <CardActionArea>
                <Typography>{getStepContent(index)}</Typography>
                <div className={classes.actionsContainer}>
                  <div>


                  { this.state.activeStep === 0
                    ? (
                      <div>
                        <Typography><b>Current Balance: {this.props.mm_account_balance}</b></Typography>
                        <TextField
                            id="filled-adornment-amount"
                            className={classNames(classes.margin, classes.textField)}
                            variant="filled"
                            label="Amount"
                            value={'0'}
                            helperText={ this.state.market_value + this.props.local_currency }
                            // onChange={this.handleChange('amount')}
                            InputProps={{
                              startAdornment: <InputAdornment position="start" >Ether</InputAdornment>,
                            }}
                            />
                      </div>
                    ) 
                    : null 
                  }

                  { activeStep === 1
                    ? ( <div>
                      <SelectField
                        multiple={true}
                        hintText="Select your crypto assets"
                        value={this.state.selectedAssets}
                        onChange={this.handleChange}
                      >
                        {this.menuItems()}
                      </SelectField>

                      {/* <Select
                        multiple
                        native
                        value={this.state.selectedAssets}
                        // onChange={this.handleChangeMultiple}
                        inputProps={{
                          id: 'select-multiple-native',
                        }}
                        >
                        {this.state.selectedAssets.map(name => (
                          <option key={name} value={name}>
                            {name}
                          </option>
                        ))}
                      </Select> */}
                      </div>
                    
                    )
                    : null 
                  }
                  { this.state.activeStep === 2
                    ? <div>
                        <AllocationSetup selectedAssets={this.state.selectedAssets} />
                        {/* <PieChart selectedAssets={this.state.selectedAssets} /> */}
                      </div>
                    : null 
                  }
                  {/* { this.state.activeStep === 3
                    ?
                    : null 
                  } */}
                  {/* { this.state.activeStep === 4
                    ?
                    : null 
                  } */}
                  {/* { this.state.activeStep === 5
                    ?
                    : null 
                  } */}
                  {/* { this.state.activeStep === 6
                    ?
                    : null 
                  } */}
                  {/* if (this.state.activeStep === 0) {
  

                  {/* <SelectField /> */}


{/* <div>
                  <Typography><b>Current Balance: {this.props.mm_account_balance}</b></Typography>
                   <TextField
                      id="filled-adornment-amount"
                      className={classNames(classes.margin, classes.textField)}
                      variant="filled"
                      label="Amount"
                      value={'0'}
                      helperText={ this.state.market_value + this.props.local_currency }
                      // onChange={this.handleChange('amount')}
                      InputProps={{
                        startAdornment: <InputAdornment position="start" >Ether</InputAdornment>,
                      }}
                      />
</div> */}
                    <br />
                    
                    <Button
                      disabled={activeStep === 0 || activeStep === 6}
                      onClick={this.handleBack}
                      className={classes.button}
                      >
                      Back
                    </Button> 
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={this.handleNext}
                      className={classes.button}
                      >
                      {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                  </div>
                </div>
        </CardActionArea>
        </Card>
        </StepContent>
        </Step>
          ))}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} className={classes.resetContainer}>
            <Typography>Your SmartFund has been created!</Typography>
            {/* <Button onClick={this.handleReset} className={classes.button}>
              Reset
            </Button> */}
          </Paper>
        )}
      </div>
    );
  }
}

NewSmartFund.propTypes = {
  classes: PropTypes.object,
};

const mapStateToProps=(state) => {
    const { mm_account, selected_portfolio, mm_account_balance, portfolios, loaded_data, local_currency , spot_price } = state
    // return { mm_account, selected_portfolio, mm_account_balance, portfolios, loaded_data, local_currency, spot_price }
    return state
  }
  
  export default connect(mapStateToProps, actionCreators)(withStyles(styles)(NewSmartFund));
  