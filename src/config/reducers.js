import Dashboard from "../ui/Dashboard";

let defaultState = {
	// user details
	mm_account: '',
	mm_account_balance: null,
	smartfund_contract: '',
	portfolios: [
		{
			id: 0,
			portfolio_name: 'First Portfolio',
			inception_date: 1546300800,
			close_date: 1460250000,
			funding_account: '0xf6e142f84EeBE8b533F97353dE1d3Cd39Cc272f3ll',
			inception_fee: 0.1,
			close_fee: 0.15,
			status: 'Closed',
			inception_allocations: [
				{
					name: 'Bitcoin',
					ticker: 'BTC',
					price: 983.35,
					amount: 3.53,
				},
				{
					name: 'Ether',
					ticker: 'ETH',
					price: 74.91,
					amount: 4.56,
				},
				{
					name: 'Bitcoin Cash',
					ticker: 'BCH',
					price: 33.78,
					amount: 35.62,
				},
				{
					name: 'Ether Classic',
					ticker: 'ETC',
					price: 2.56,
					amount: 4.16,
				},
				{
					name: 'Litecoin',
					ticker: 'LTC',
					price: 2.75,
					amount: 39.16,
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
			id: 1,
			portfolio_name: 'Second Portfolio',
			inception_date: 1546300800,
			close_date: 1549775747,
			funding_account: '0xf6e142f84EeBE8b533F97353dE1d3Cd39Cc272f3ll',
			inception_fee: 0.1,
			close_fee: 0.15,
			status: 'Open',
			inception_allocations: [
				{
					name: 'Bitcoin',
					ticker: 'BTC',
					price: 8911.35,
					amount: 0.62,
				},
				{
					name: 'Ether',
					ticker: 'ETH',
					price: 559.91,
					amount: 0.46,
				},
				{
					name: 'Bitcoin Cash',
					ticker: 'BCH',
					price: 1031.78,
					amount: 6.62,
				},
				{
					name: 'Ether Classic',
					ticker: 'ETC',
					price: 19.56,
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
	loaded_data: {
		coin_data: false,
		spot_price: false,
		historical_price_data: false,
	},
	//timer 
	interval: 2,
	count: 0,
	
	// UI Settings
	selected_portfolio: -1, 
	active_ui: 'dashboard',
	// price data
	coin_limit: 10,
	historical_price_data: null,
	coin_data: null,
	spot_price: null,
	data_start_date: 1460250000,
	aggregate: 7,
	spot_pairs: ['USD','EUR','CAD','GBP','JPY'],
	local_currency: 'USD',

	web3: null,
	
}

const priceReducer = (state = defaultState, action) => {
	// console.log()
	if(action.type === 'UPDATE_BTC_PRICE') {
		return{
			...state,
			btc_price: action.btc_price
		} 
	} else if(action.type === 'UPDATE_COIN_DATA') {
		return{
			...state,
			coin_data: action.coin_data
		}
	} else if(action.type === 'UPDATE_COIN_SPOT') {
		return{
			...state,
			spot_price: action.spot_price
		}
	} else if(action.type === 'SELECT_FUND') {
		return{
			...state,
			selected_portfolio: action.selected_portfolio
		}
	} else if(action.type === 'SELECT_UI') {
		return{
			...state,
			active_ui: action.active_ui
		}
	} else if(action.type === 'UPDATE_DATA_LOADED') {
		return{
			...state,
			data_loaded: action.payload
		}
	} else if(action.type === 'UPDATE_PRICE_HIST') {
		return{
			...state,
			historical_price_data: action.historical_price_data
		}
	} else if(action.type === 'ACCOUNT_CHANGE') {
		return{
			...state,
			mm_account: action.account
		}
	} else if(action.type === 'UPDATE_WEB3') {
		return{
			...state,
			web3: action.web3
		}
	} else if(action.type === 'UPDATE_BALANCE') {
		return{
			...state,
			mm_account_balance: action.balance
		}
	} else {
		return{
			...state
		}
	}

}

export default priceReducer;

