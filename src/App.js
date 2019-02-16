import React, { Component } from 'react';
import Router from './Router'
import { NavLink } from 'react-router-dom'
import * as actionCreators from './config/actions';
import { connect } from 'react-redux';
import Stringify from 'react-stringify'
import SimpleLineChart from './ui/SimpleLineChart'
import Dashboard from './ui/Dashboard'
import moment from 'moment';

const Navigation = (props) => <nav>
  {/* <ul> */}
    {/* <li><NavLink to='/'>Dashboard</NavLink></li> */}
    {/* <li><NavLink to='/new'>New Fund</NavLink></li> */}
  {/* </ul> */}
</nav>

class App extends Component {

    constructor(props) {
      super(props);
      // // this.state = {
      // //     timer: null,
      // //     count: null
      // //   }
      this.tick = this.tick.bind(this)
    }
  
    componentDidMount() {
      let timer = setInterval(this.tick, 1000 * this.props.interval)
      // let timer = setInterval(this.tick, 1000 * this.props.interval)
      this.setState({timer})
      // this.refreshPrice()
      
      // this.props.fetchPrice("BCH")
      // this.props.refreshList()

      this.pullHistoricalData()
      
    }
    
    async pullHistoricalData() {
      // ticker, days, aggregate
      // await this.props.fetchNewPriceHist('ETC', 10, 1) 
      // ticker, days, aggregate 
      // await this.props.fetchNewPriceHist('BTC', 3, 1) 
      // await this.props.fetchNewPriceHist('ETH', 3, 1) 
      // await this.props.fetchNewPriceHist('BCH', 3, 1) 
      

      for (var index of this.props.portfolios[this.props.selected_portfolio].inception_allocations) {
        // console.log(this.props.portfolios[this.props.selected_portfolio].inception_allocations)
        await this.props.fetchNewPriceHist(index.ticker, 40, 1)
      }
      // await this.props.fetchNewPriceHist("BTC", 1000, 30)
      // await this.props.fetchNewPriceHist("BTC", 1000, 30)
      // let data = props.portfolios[0].inception_allocations.map((item) => {
      //   // console.log(item.inception_allocations)


      //   return (createData( item.name, item.ticker, item.amount,'$' +  item.price * item.amount , "$ -- ", "-- %"))
      // })




    }

    componentWillUnmount() {
      this.clearInterval(this.state.timer)
    }

    // refreshPrice() {
    //   // this.props.fetchBTCPrice()
    //   // console.log("state.count: ", this.state.count)
    //   // const newCount = this.state.count + 1
    //   // this.setState({ count: newCount })
    // }
  
    tick() {
      // this.refreshPrice()
      // this.counterTick()

      // this.props.counterTick()
      
      // console.log("state: ", this.state)
      // this.props.newfetchPriceHist()
      // this.props.versionOne()
      // this.props.fetchHist('BTC', 10)
    }

  render() {
    return (
      <div>
        <Navigation />
        <Router />
        <Stringify value={this.props} />
      </div>

    );
  }
}


const mapStateToProps=(state) => {
  const { btc_price, interval, count, portfolios, historical_price_data, price_hist, selected_portfolio } = state
  return { btc_price, interval, count, portfolios, historical_price_data, price_hist, selected_portfolio }
  // return state
}

export default connect (mapStateToProps, actionCreators)(App);

