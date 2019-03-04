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
import * as actionCreators from '../../config/actions';
import { connect } from 'react-redux';
// import Input from '@material-ui/core/Input';
// import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
// import Visibility from '@material-ui/icons/Visibility';
// import VisibilityOff from '@material-ui/icons/VisibilityOff';
import classNames from 'classnames';
// import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';
// import CardActionArea from '@material-ui/core/CardActionArea';
// import CardActions from '@material-ui/core/CardActions';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import SelectField from 'material-ui/SelectField';
import AllocationSetup from './AllocationSetup';
import SmartFundDetails from './SmartFundDetails';
import { Redirect } from 'react-router-dom';


import {
//   FormControl,
//   InputLabel,
//   Select,
  MenuItem,
//   DropDownMenu
} from 'material-ui';

import {
//   Card,
//   Text,
//   Icon,
//   MetaMaskButton
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
  return ['Funding Amount', 'Asset Selection', 'Asset Allocation', 'Review & Create SmartFund', 'Confirm SmartFund Creation','Comlpete!'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return (
        `Enter the amount of Ether you would like to start your SmartFund with:`
        );
    // case 2:
    //   return `Set the allocations of your SmartFund portfolio:`;
    // case 3:
    //   return `Review and create your SmartFund before inception:`;
    // case 4:
    //   return `Confirming Blockchain Transaction ...`;
    case 5:
      return `Success! Your SmartFund has been created! You can view it in the My SmartFunds screen.`;
    // default:
    //   return 'Unknown step';
  }
}

class NewSmartFund extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeStep: 0,
            assetListLoaded: false,
            assetListData: [],
            selectedAssets: [],
            smartfundName: '',
            funding_amount: 0.00001,
            marketValue: null,
            allocations: [
				{
					name: 'Bitcoin',
					ticker: 'BTC',
					price: 983.35,
					amount: 3.53,
				}
            ]
        }

    }
	handleAssetSelectionChange = (event, index, selectedAssets) => {
	this.setState({selectedAssets});
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
		this.setState({activeStep: 0});
	};

	amountChange = (e) => {
		if (Number(e.target.value) < 0) {
			this.setState({funding_amount: 0}); 
		} else {
		this.setState({funding_amount: e.target.value});
		}
			// this.setMarketValue()
	};

	componentDidMount() {
		
		
	}
		
  	menuItems() {
		return this.props.coin_data.map((coin) => (
			<MenuItem
				key={coin.FullName}
				insetChildren={true}
				checked={this.state.selectedAssets && this.state.selectedAssets.indexOf(coin) > -1} // broken - fix
				value={coin.FullName}
				primaryText={coin.FullName}
			/>
		));
  	}

	setMarketValue() {
		const marketValue = (this.state.funding_amount * this.props.spot_price.RAW['ETH'][this.props.local_currency].PRICE).toFixed(2)
		this.setState({ marketValue: marketValue });
		console.log("this.state.funding_amount", this.state.funding_amount)
		// console.log("this.state.funding_amount", this.state.funding_amount)

  	}

	handleChange = name => event => {
		this.setState({ [name]: event.target.value });
		// this.setMarketValue()
	};

  	render() {
		const { classes } = this.props;
		const steps = getSteps();
		const { activeStep } = this.state;

		if (this.props.active_ui !== 'new' ) {
			return <Redirect from={process.env.PUBLIC_URL + '/new'} to={process.env.PUBLIC_URL + '/'} />
		}

		// // if ( this.props.loaded_data.spot_price === false ) {
		// if ( this.props.loaded_data.coin_data === false  || this.props.loaded_data.spot_price === false || this.props.loaded_data.historical_price_data === false ) {
		// 		return 'Loading...'
		// } else {
		// 	if (this.props.loaded_data.spot_price !== null) {
		// 		this.setMarketValue()
		// 	}
		// }


		return (
			<div className={classes.root}>
				<Stepper activeStep={activeStep} orientation="vertical">
				{steps.map((label, index) => (
					<Step key={label}>
						<StepLabel>{label}</StepLabel>
						<StepContent>
							<Card className={classes.card}  >
							{/* <CardActionArea> */}
								<CardContent>
							<Typography>{getStepContent(index)}</Typography>
							<div className={classes.actionsContainer}>
								<div>


					{ this.state.activeStep === 0 // Funding Portfolio 
						? ( <div>
						<br />
							<Typography><b>Current Balance: {this.props.mm_account_balance !== null ? this.props.mm_account_balance + ' ETH' : null } </b></Typography>
							<TextField
								id="amount"
								className={classNames(classes.margin, classes.textField)}
								variant="filled"
								inputProps={{step: 0.1}}
								label="Amount"
								// defaultValue={this.state.funding_amount}
								value={this.state.funding_amount}
								type="number"
								onChange={this.amountChange}
								helperText={ this.state.marketValue + ' ' + this.props.local_currency }
								InputProps={{
								startAdornment: <InputAdornment position="start" >Ether</InputAdornment>,
								}}
								/>
						</div>
						) 
						: null 
					}

					{ activeStep === 1 // Select your crypto assets
						? ( 
						<div> 
							<SelectField
							multiple={true}
							hintText="Select your crypto assets"
							value={this.state.selectedAssets}
							onChange={this.handleAssetSelectionChange}
							>
							{this.menuItems()}
							</SelectField>
						</div>
						)
						: null 
					}
					{ this.state.activeStep === 2 // Set your crypto allocation
						? <div>
							<AllocationSetup selectedAssets={this.state.selectedAssets} />
						</div>
						: null 
					}
					{ this.state.activeStep === 3 // Review SmartFund details
						? <div>
						<TextField
							id="standard-required"
							label="SmartFund Name *"
							className={classes.textField}
							// defaultValue={'My SmartFund (' + (this.props.portfolios.length+1) + ')'}
							value={this.state.smartfundName}
							onChange={this.handleChange('smartfundName')}
							margin="normal"
						/>
						{/* <SmartFundDetails /> */}
						</div>
						: null 
					}
					{ this.state.activeStep === 4 // Confirming SmartFund transaciton
						? <div>
							<Typography>Confirming SmartFund transaciton ...</Typography>
							<LinearProgress />
						</div>
						: null 
					}

					{ this.state.activeStep === 5 // Complete!
						? <div>
							<Typography>Your SmartFund has been created! You can view it in the <u>My Smartfunds</u> list</Typography>
						</div>
						: null 
					}
						{/* <br /> */}
						{ activeStep !== 4 ? 
						<div>
							<Button
							disabled={activeStep === 0 || activeStep === 6 || activeStep === 4}
							onClick={this.handleBack}
							className={classes.button}
							>
							Back
							</Button> 
							<Button
							disabled={activeStep === 4 || ( activeStep === 3 && this.state.smartfundName === '' ) }
							variant="contained"
							// color="primary"
							color={activeStep === 3 ? 'secondary' : 'primary' }
							onClick={this.handleNext}
							className={classes.button}
							>
							{/* {activeStep === steps.length - 1 && activeStep !== 4 ? 'Finish' : 'Next'} */}
							{activeStep === 3 ? 'Create SmartFund' : 'Next'}
							</Button>
						</div>
						: null
						}
					</div>
				</div>
			{/* </CardActionArea> */}
			</CardContent>
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
  