import React, { Component } from 'react'
import { connect } from 'react-redux';
// import {Pie} from 'react-chartjs-2';
// import 'chartjs-plugin-labels';
// import Highcharts from 'highcharts/highstock'
// import HighchartsReact from 'highcharts-react-official'
import DonutChart from 'react-donut-chart';


class ReactDonutChart extends Component {
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
					backgroundColor: this.props.color_codes,
					data: this.props.assetPercentages, 
				}]
			// }
		}
			return (
		<div>
<DonutChart
    data={[
		{
			label: 'BTC',
			value: 25
		},
		{
			label: 'ETH',
			value: 25
		},
		{
			label: 'XMR',
			value: 25
		},
		{
			label: 'TRON',
			value: 25
		},
		// {
		// 	label: '',
		// 	value: 75,
		// 	isEmpty: true
		// }
	]} />
		</div>
		);
	}
}

const mapStateToProps=(state) => {
    const { portfolios, mm_account, selected_portfolio, historical_price_data, spot_price, local_currency, color_codes } = state
    return { portfolios, mm_account, selected_portfolio, historical_price_data, spot_price, local_currency, color_codes }
    // return state
}

export default connect(mapStateToProps)(ReactDonutChart)
