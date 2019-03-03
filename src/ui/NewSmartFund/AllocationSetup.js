import React, { Component } from 'react'
import { connect } from 'react-redux';
import 'rc-slider/assets/index.css';
import { Range } from 'rc-slider';
import NewPieChart from './NewPieChart';

class AllocationSetup extends Component {
    constructor(props) {
        super(props);
        this.state = {
			selectedAssets: [],
			assetPercentages: [],
			sliderValues: [],
			sliderColors: [],
		}
		this.handleChangeSlider = this.handleChangeSlider.bind(this)
	}		
	componentDidMount() {
		this.setState({ selectedAssets: this.props.selectedAssets })
		let newAssetList = []
        if ( this.props.coin_data !== null ) { 
			Object.values(this.props.coin_data).map((coinItem) => {
				for (let item of this.props.selectedAssets ) {
					if (item === coinItem.FullName) {
						const price =  this.props.spot_price.RAW[coinItem.Symbol][this.props.local_currency].PRICE
						const newItem = { 'FullName': coinItem.FullName, 'Ticker': coinItem.Symbol, 'Price': price }
						newAssetList.push(newItem)

					}
			  	} 
			})

			let newSliderValues = []
			// const assetListLength = newAssetList.length + 1
			newAssetList.forEach((value, index) => {
				const sliderVal = (index) * (100 / newAssetList.length) 
				newSliderValues.push(Number(sliderVal.toFixed(0)))
			})
			newSliderValues.push(100)
			this.setState({ sliderValues: newSliderValues })
			this.handleChangePercentages(newSliderValues)
		 }
		 
		 const newSliderColors = this.props.color_codes.map((colorCode) => {
			return { backgroundColor: colorCode }
		 })
		 this.setState({ sliderColors: newSliderColors })
		//  console.log("sliderColors",newSliderColors)
	}
	
	handleChangeSlider = (value) => {
		let newSliderValues = value
		newSliderValues[0] = 0
		newSliderValues[newSliderValues.length-1] = 100
		this.setState({
			sliderValues: newSliderValues,
		});
		this.handleChangePercentages(newSliderValues)
	}
	
	handleChangePercentages = (sliderValues) => {
		let newAssetPercentages = []
		for (let i = 1; i < sliderValues.length; i++) {
			const assetPercent = Number(sliderValues[i]) - Number(sliderValues[i-1])
			newAssetPercentages.push(assetPercent)
		}
		this.setState({
			assetPercentages: newAssetPercentages,
		});
	}

	render() {
		return (
			<div>	
				<NewPieChart 
					selectedAssets={this.state.selectedAssets} 
					assetPercentages={this.state.assetPercentages} 
				/>
				<br />
				<Range 
				pushable
				// marks={ '1': { style, 'fdfsd' }} 
				allowCross={false}
				// vertical={false}
				count={this.state.assetListLength}
				onChange={this.handleChangeSlider}
				value={this.state.sliderValues}
				// maximumTrackStyle				
				trackStyle={this.state.sliderColors}
				// trackStyle={[{ backgroundColor: 'red' }, { backgroundColor: 'green' }]}
				// handleStyle={[{ backgroundColor: 'yellow' }, { backgroundColor: 'gray' }]}
				railStyle={{ backgroundColor: 'black' }}
				/>
			</div>
		)
	}
}

const mapStateToProps=(state) => {
    const { portfolios, mm_account, selected_portfolio, historical_price_data, spot_price, local_currency, coin_data, color_codes } = state
    return { portfolios, mm_account, selected_portfolio, historical_price_data, spot_price, local_currency, coin_data, color_codes }
    // return state
}
export default connect(mapStateToProps)(AllocationSetup)


