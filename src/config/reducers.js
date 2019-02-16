
let defaultState = {
	// user details
	mm_account: '0xf6e142f84EeBE8b533F97353dE1d3Cd39Cc272f3',
	portfolios: [
		{
			id: 1,
			portfolio_name: 'First Portfolio',
			inception_date: 1518238874,
			close_date: 1549775747,
			funding_account: '0xf6e142f84EeBE8b533F97353dE1d3Cd39Cc272f3ll',
			inception_fee: 0.1,
			close_fee: 0.15,
			status: 'closed',
			chart_start_date: 1518238874,
			chart_end_date: 1549775747,
			inception_allocations: [
				{
					name: 'Bitcoin',
					ticker: 'BTC',
					price: 4282,
					amount: 0.62,
				},
				{
					name: 'Ether',
					ticker: 'ETH',
					price: 200,
					amount: 0.46,
				},
				{
					name: 'Bitcoin Cash',
					ticker: 'BCH',
					price: 153,
					amount: 6.62,
				},
				{
					name: 'Ether Classic',
					ticker: 'ETC',
					price: 33,
					amount: 0.16,
				},
				{
					name: 'Litecoin',
					ticker: 'LTC',
					price: 14,
					amount: 0.16,
				},
			],
			close_allocations: [
				{
					name: 'Bitcoin',
					ticker: 'BTC',
					price: 4282,
					amount: 0.62,
				},
				{
					name: 'Ether',
					ticker: 'ETH',
					price: 218,
					amount: 2.51,
				},
			],
		},
		{
			id: 2,
			portfolio_name: 'Second Portfolio',
			inception_date: 1518238874,
			close_date: 1549775747,
			funding_account: '0xf6e142f84EeBE8b533F97353dE1d3Cd39Cc272f3ll',
			inception_fee: 0.1,
			close_fee: 0.15,
			status: 'open',
			chart_start_date: 1518238874,
			chart_end_date: 1549775747,
			inception_allocations: [
				{
					name: 'Bitcoin',
					ticker: 'BTC',
					price: 4282,
					amount: 0.62,
				},
				{
					name: 'Ether',
					ticker: 'ETH',
					price: 200,
					amount: 0.46,
				},
				{
					name: 'Bitcoin Cash',
					ticker: 'BCH',
					price: 153,
					amount: 6.62,
				},
				{
					name: 'Ether Classic',
					ticker: 'ETC',
					price: 33,
					amount: 0.16,
				},
			],
			close_allocations: [
				{
					name: 'Bitcoin',
					ticker: 'BTC',
					price: 4282,
					amount: 0.62,
				},
				{
					name: 'Ether',
					ticker: 'ETH',
					price: 218,
					amount: 2.51,
				},
			],
		},
	],
	
	// app settings
	interval: 2,
	count: 0,
	selected_portfolio: 1, 

	// price data
	historical_price_data: null,
	spot_price: null,
}

const priceReducer = (state = defaultState, action) => {
	// console.log()
	if(action.type === 'UPDATE_BTC_PRICE') {
		return{
			...state,
			btc_price: action.btc_price
		} 
	} else if(action.type === 'UPDATE_ETH_PRICE') {
		return{
			...state,
			eth_price: action.eth_price
		}
	} else if(action.type === 'UPDATE_ETH_PRICE') {
		return{
			...state,
			eth_price: action.eth_price
		}
	} else {
		return{
			...state
		}
	}

}

export default priceReducer;

