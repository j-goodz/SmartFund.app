import React, { Component } from 'react'
import CanvasJSReact from  '../assets/canvasjs.react'
import { connect } from 'react-redux';
import 'rc-slider/assets/index.css';
import Slider, { Range } from 'rc-slider';


class AllocationSetup extends Component {
    // console.log('this.props', this.props)
	render() {
		return (
			
			<div>	
	{/* <Slider /> */}
	<br />
	<Range 
		pushable={true} 
		// marks={ '1': { style, 'fdfsd' }} 
		allowCross={false}
		// vertical={false}
		count={3}
		// onChange={}
		defaultValue={[25,50,75]}
		maximumTrackStyle
		/>
		</div>
			)
	}
}

const mapStateToProps=(state) => {
    const { portfolios, mm_account, selected_portfolio, historical_price_data, spot_price, local_currency } = state
    return { portfolios, mm_account, selected_portfolio, historical_price_data, spot_price, local_currency }
    // return state
}



export default connect(mapStateToProps)(AllocationSetup)
// export default PieChart
// export default connect(mapStateToProps)(withStyles(styles)(FundCard))
// export default withStyles(styles)(FundCard)

