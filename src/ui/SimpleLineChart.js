import React, { Component } from 'react'
import ResponsiveContainer from 'recharts/lib/component/ResponsiveContainer';
import LineChart from 'recharts/lib/chart/LineChart';
import Line from 'recharts/lib/cartesian/Line';
import XAxis from 'recharts/lib/cartesian/XAxis';
import YAxis from 'recharts/lib/cartesian/YAxis';
import CartesianGrid from 'recharts/lib/cartesian/CartesianGrid';
import Tooltip from 'recharts/lib/component/Tooltip';
import Legend from 'recharts/lib/component/Legend';
import { connect } from 'react-redux';
import * as actionCreators from '../config/actions';
import Stringify from 'react-stringify'

// 99% per https://github.com/recharts/recharts/issues/172


// function assets() {
  // for (var index of this.props.portfolios[0].inception_allocations) {
  // const asset_date = this.props.portfolios[0].inception_allocations.map((item) => {  
  //   return ( <Line type="monotone" dataKey={ asset_date.ticker } stroke="#82ca9d" /> )
  // }

  // return ( <Line type="monotone" dataKey="BTC" stroke="#82ca9d" />


  // ) 
  

// }


// let data = props.portfolios[0].inception_allocations.map((item) => {
//   // console.log(item.inception_allocations)
  
 
//   return (createData( item.name, item.ticker, item.amount,'$' +  item.price * item.amount , "$ -- ", "-- %"))
// })





export class SimpleLineChart extends Component {
  constructor(props) {
    super(props);
    // this.state = {
      //   portfolios: null,
      //   // portfolio_id: this.props.portfolios
      // }
    }  
    

  render(){
    const asset_data = this.props.portfolios[this.props.selected_portfolio].inception_allocations.map((item) => {  
      return ( <Line type="monotone" dataKey={ item.ticker } stroke="#82ca9d" key={ item.id + item.ticker }/> )
    })
    return (
      <ResponsiveContainer width="99%" height={320}>
        <LineChart data={this.props.historical_price_data}>
          <XAxis dataKey="date" />
          <YAxis />
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          { asset_data }
          {/* <Line type="monotone" dataKey="ETH" stroke="#82ca9d" /> */}
          {/* <Line type="monotone" dataKey="ETC" stroke="#8884d8" activeDot={{ r: 8 }} /> */}
        </LineChart>
      </ResponsiveContainer>
    )
  }

}


const mapStateToProps=(state) => {
  const { portfolios, historical_price_data, chart_start_date, selected_portfolio } = state
  return { portfolios, historical_price_data, chart_start_date, selected_portfolio }
}

export default connect (mapStateToProps, actionCreators)(SimpleLineChart);

