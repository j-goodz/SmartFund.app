import React, { Component } from 'react'
import CanvasJSReact from  '../assets/canvasjs.react'
// var CanvasJSReact = require('./canvasjs.react');
import { connect } from 'react-redux';


// var CanvasJSReact = require('./canvasjs.react');
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;



class PieChart extends Component {

    // console.log('this.props', this.props)
	render() {
		const options = {
			animationEnabled: true,
			// title: {
			// 	text: "Customer Satisfaction"
			// },
			subtitles: [{
				text: "71% Positive",
				verticalAlign: "center",
				fontSize: 24,
				dockInsidePlotArea: true
			}],
			data: [{
				type: "doughnut",
				showInLegend: true,
				indexLabel: "{name}: {y}",
				yValueFormatString: "#,###'%'",
				// dataPoints: this.props.portfolios(this.props.portfolioId).inception_allocations
				dataPoints: [
					{ name: "Unsatisfied", y: 5 },
					{ name: "Very Unsatisfied", y: 31 },
					{ name: "Very Satisfied", y: 40 },
					{ name: "Satisfied", y: 17 },
					{ name: "Neutral", y: 7 }
				]
			}]
		}
		return (
		<div>
			<CanvasJSChart options = {options}
				/* onRef={ref => this.chart = ref} */
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
}
// module.exports = PieChart

const mapStateToProps=(state) => {
    const { portfolios, mm_account, selected_portfolio, historical_price_data, spot_price, local_currency } = state
    return { portfolios, mm_account, selected_portfolio, historical_price_data, spot_price, local_currency }
    // return state
}



export default connect(mapStateToProps)(PieChart)
// export default PieChart
// export default connect(mapStateToProps)(withStyles(styles)(FundCard))
// export default withStyles(styles)(FundCard)

