import React, { Component } from 'react';
import Router from './Router'
import { NavLink } from 'react-router-dom'
import * as actionCreators from './config/actions';
import { connect } from 'react-redux';
import Stringify from 'react-stringify'
import SimpleLineChart from './ui/SimpleLineChart'
import Dashboard from './ui/Dashboard'
import moment from 'moment';

// const Navigation = (props) => <nav>
//   {/* <ul> */}
//     {/* <li><NavLink to='/'>Dashboard</NavLink></li> */}
//     {/* <li><NavLink to='/new'>New Fund</NavLink></li> */}
//   {/* </ul> */}
// </nav>

class App extends Component {

  constructor(props) {
    super(props);
    // // this.state = {
    // //     timer: null,
    // //     count: null
    // //   }
    this.tick = this.tick.bind(this)
  }

  async componentDidMount() {
    let timer = setInterval(this.tick, 1000 * this.props.interval)
    // let timer = setInterval(this.tick, 1000 * this.props.interval)
    this.setState({timer})
    // await this.props.fetchCoinData().then( await this.pullHistoricalData() )
    await this.props.fetchCoinData() //.then( await this.pullHistoricalData() )
    // this.pullHistoricalData()
    this.props.fetchUsersPriceHist()
    this.props.fetchCoinSpot()
  }
  
  async pullHistoricalData() {
    // console.log("start_date ", start_date)
    // console.log("current_date ", current_date)
    // const days = moment.duration(().diff(moment())).asDays()
    // const days = moment.duration(current_date.diff(start_date)).asDays().toFixed(0)
    // console.log("days ", days)
    // const diff =  Math.floor(( current_date - start_date ) / 86400000)
    // console.log("diff ", diff)
    // console.log("aggregate ", aggregate)
    // console.log("row_limit ", row_limit)
    
    const current_date = moment()
    const start_date = moment.unix(this.props.data_start_date)
    const days = current_date.diff(start_date, 'days', false)
    const aggregate = 7
    const row_limit = (days + 1 / aggregate).toFixed(0)

    let ticker_list = []
    // for(let index of this.props.coin_data) {
    //   if ((index.SortOrder) <= this.props.coin_limits) {
    //     ticker_list.push(index.Symbol)
    //   }

    // }

    // let ticker_list = []
    // console.log("this.props.coin_data ", this.props.coin_data)
    
    // Object.values(this.props.coin_data).map((item) => {
    //   return item
    // })


    // for (let coin_item of this.props.coin_data) {
    //   // console.log("coin item: ", coin_item )
    //   if(coin_item.SortOrder <= 5) {
    //     ticker_list.push({ rank: coin_item.SortOrder , ticker: coin_item.Symbol })
      
    //   }
    // }


    // for (let coin_item of Object.values(this.props.coin_data)) {
    //   if(coin_item.SortOrder <= 5) {
    //     ticker_list.push({ rank: coin_item.SortOrder , ticker: coin_item.Symbol })
      
    //   }
    // }







    // ticker_list = await Object.values(this.props.coin_data).map((coin) => {
    //   if(coin.SortOrder <= 5) {
    //     console.log("coin.SortOrder ", coin.SortOrder)  
    //     console.log("coin.Symbol ", coin.Symbol)  
    //     // return coin.SortOrder
    //     return coin.Symbol
    //   }
    // })

    console.log("ticker_list ", ticker_list)
    // let data_json = 

    // if( this.props.coin_data !== null ) {
    //   ticker_list = await this.props.coin_data.values.map((item) => {
    //     if(item.SortOrder <= this.props.coin_limit) {
    //         return item.Symbol
    //     }
    //   })
    // }


    // var lookup = {};
    // for (var i = 0, len = array.length; i < len; i++) {
    //     lookup[array[i].id] = array[i];
    // }
    
    // for (var index of this.props.portfolios[0].inception_allocations) {
    // for (var index of ticker_list) {
    //   // ticker, days, aggregate 
    //   this.props.fetchNewPriceHist(index, row_limit, 1)
    // }
  // }
  }

  componentWillUnmount() {
    this.clearInterval(this.state.timer)
  }
  
  tick() {
    // this.counterTick()
    // this.props.counterTick()
  }

  render() {
    
    // if (this.props.data_loaded === false && this.props.coin_data !== null) {
    //   this.pullHistoricalData()
    // }

    return (
      <div>
        {/* <Navigation /> */}
        <Router />
        {/* <Stringify value={this.props} /> */}
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

