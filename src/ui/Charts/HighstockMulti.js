import React, { Component } from 'react'
import { connect } from 'react-redux';
import {Pie} from 'react-chartjs-2';
import 'chartjs-plugin-labels';
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'

// const options = {
// 	title: {
// 	  text: 'Performance'
// 	},
// 	series: [{
// 	  data: [1, 2, 3]
// 	},
// 	{
// 		data: [1.1, 2.1, 3.1]
// 	  }
// 	]
//   }
const options = {

	rangeSelector: {
		selected: 4
	},

	yAxis: {
		// labels: {''},
		plotLines: [{
			value: 0,
			width: 2,
			color: 'silver'
		}]
	},

	plotOptions: {
		series: {
			compare: 'percent',
			showInNavigator: true
		}
	},

	tooltip: {
		pointFormat: '{series.name}: {point.y} ({point.change}%)',
		valueDecimals: 2,
		split: true
	},

	// series: seriesOptions
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
		//  pieData
		let pieData = {
				labels: this.props.selectedAssets, 
				datasets: [{
					label: "Asset Allocations",
					backgroundColor: this.props.color_codes,
					data: this.props.assetPercentages, 
				}]
		}
			return (
		<div>
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
