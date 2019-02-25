import React, { Component } from 'react';
import Router from './Router'
import { NavLink } from 'react-router-dom'
import * as actionCreators from './config/actions';
import { connect } from 'react-redux';
import Stringify from 'react-stringify'
import SimpleLineChart from './ui/SimpleLineChart'
import Dashboard from './ui/Dashboard'
import moment from 'moment';
import Web3 from 'web3';

// const Navigation = (props) => <nav>
//   {/* <ul> */}
//     {/* <li><NavLink to='/'>Dashboard</NavLink></li> */}
//     {/* <li><NavLink to='/new'>New Fund</NavLink></li> */}
//   {/* </ul> */}
// </nav>

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      web3: null
      }
    this.tick = this.tick.bind(this)
  }

  async componentDidMount() {
    let timer = setInterval(this.tick, 1000 * this.props.interval)
    this.setState({timer})

		try {

			if (this.state.web3 === null ) {
				let web3 = new Web3(window.web3.currentProvider);
				this.setState({ web3 })
				this.props.setWeb3(web3)
        let accountInterval = setInterval( async () => {
          // if (this.props.web3.eth.accounts[0] !== this.props.mm_account) {
          // if (this.state.web3.eth.accounts[0] !== this.props.mm_account) {
            // console.log("this.state.web3.eth.accounts[0]", this.state.web3.eth.accounts[0])
            // console.log("this.props.mm_account", this.props.mm_account)
          if (this.state.web3.eth.accounts[0] !== this.props.mm_account) {
            const [ newAccount, _ ] = await web3.eth.getAccounts()
            this.props.setAccount(newAccount)
            this.setState({ account: newAccount })
            this.state.web3.eth.getBalance(this.props.mm_account, (err, balance) => {
              this.balance = this.props.web3.utils.fromWei(balance, "ether") + " ETH"
              // console.log("this.balance", this.balance)
              this.props.setBalance(this.balance)
            });


          }
        }, 10000);
        this.pullHistoricalData()

      }

		} catch (err) {
      		console.log("Error finding web3.", err);
   	}
  }

  
		// try {

    //   // console.log("web3", web3)
    //   let web3 = new Web3(window.web3.currentProvider);
		// 	// if (this.state.web3 === null ) {
		// 	if (this.props.web3 === null ) {
    //     // this.setState({ web3 })
    //     let accountInterval = setInterval(() => {
    //     if (this.props.web3.eth.accounts[0] !== this.props.mm_account) {
    //       const newAccount = web3.eth.accounts[0]
    //       // this.setState({ account: newAccount })
    //       // this.props.updateAccount(newAccount)
    //       this.props.setAccount(newAccount)
    //       // console.log("newAccount",newAccount)s
    //       }
    //     }, 1000);
        
    //   }
        
		// 		// let [ from_addr, _ ] = await web3.eth.getAccounts()
		// 		// this.setState({ from_addr })
		// 	// }
		// 	// console.log("this.state:", this.state);

		// } catch (err) {
    //   		console.log("Error finding web3.", err);
    // }
    // this.initAccountUpdater()
    // this.props.setAccount()
    // this.props.setAccount('hello!')
    
  // }
  
  // initAccountUpdater() {
  //   // console.log("this.state.web3.eth.accounts[0]",this.state.web3.eth.accounts[0])
  //   // console.log("this.props.mm_account",this.props.mm_account)
  //   let accountInterval = setInterval(() => {
  //     if (this.state.web3.eth.accounts[0] !== null && this.state.web3.eth.accounts[0] !== this.props.mm_account) {
  //       const newAccount = this.state.web3.eth.accounts[0]
  //       // this.setState({ account: newAccount })
  //       this.props.setAccount(newAccount)
  //       console.log("newAccount",newAccount)
  //       }
  //     }, 1000);
  // }

  async pullHistoricalData() {
    await this.props.fetchCoinData()
 
    this.props.fetchCoinSpot()
    // smart contract data here --> then:
    this.props.fetchUsersPriceHist()
    // this.props.setDataLoaded('historical_price_data')
    
  }
  
  componentWillUnmount() {
    this.clearInterval(this.state.timer)
  }
  
  tick() {
    // this.counterTick()
    // this.props.counterTick()
  }

  render() {
    // console.log("this.props.loaded_data", this.props.loaded_data)
    if ( this.props.loaded_data.coin_data === false  || this.props.loaded_data.spot_price === false || this.props.loaded_data.historical_price_data === false ) {
      return (
        <div align='center'>
          <h3>Loading SmartFund data. Please wait... </h3>
          <h1>( ͡° ͜ʖ ͡°)</h1>
        </div>
      )
    }

    return (
      <div>
        {/* <Navigation /> */}
        <Router />
        {/* <Stringify value={this.state.web3} /> */}
      </div>

    );
  }
}


const mapStateToProps=(state) => {
  const { interval, count, portfolios, historical_price_data, selected_portfolio } = state
  // return { interval, count, portfolios, historical_price_data, selected_portfolio }
  return state
}

export default connect (mapStateToProps, actionCreators)(App);

