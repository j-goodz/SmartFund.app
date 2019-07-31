import React, { Component } from 'react'
import { connect } from 'react-redux';
import {Pie} from 'react-chartjs-2';
import 'chartjs-plugin-labels';
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'

const options = {
	title: {
	  text: 'My stock chart'
	},
	series: [{
	  data: [1, 2, 3]
	}]
  }
class HighstockMulti extends Component {
	constructor(props) {
        super(props);
        this.state = {
			colorCodes: []
		}
	
	}

	componentDidMount() {

	}

	render() {
		// console.log('this.props.assetPercentages', this.props.assetPercentages)
		let pieData
		// if ( this.props.assetPercentages !== undefined )
		// {
			pieData = {
				labels: this.props.selectedAssets, 
				datasets: [{
					label: "Asset Allocations",
					// backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
					backgroundColor: this.props.color_codes,
					// backgroundColor: 'rgb(255, 99, 132)',
					// borderColor: 'rgb(255, 99, 132)',
					data: this.props.assetPercentages, 
				}]
			// }
		}
		// console.log('pieData', pieData)
			return (
		<div>
			{/* < Pie data={pieData} /> */}
			<HighchartsReact
				highcharts={Highcharts}
				constructorType={'stockChart'}
				options={options}
			/>
		</div>
		);
	}
}

const mapStateToProps=(state) => {
    const { portfolios, mm_account, selected_portfolio, historical_price_data, spot_price, local_currency, color_codes } = state
    return { portfolios, mm_account, selected_portfolio, historical_price_data, spot_price, local_currency, color_codes }
    // return state
}

export default connect(mapStateToProps)(HighstockMulti)
