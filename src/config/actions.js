import axios from 'axios';
import store from './store'
import moment from 'moment';


// // -----------------------
// export function fetchBTCPrice(){
// 	return(dispatch) => {
// 		return axios.get('https://api.coinbase.com/v2/prices/BTC-USD/spot').then((res) => {
// 			dispatch(updateBTCPrice(res.data.data.amount));
// 			// console.log("BTC Price: ", res.data.data.amount)
// 		})
// 	}
// }

// export function updateBTCPrice(amount){
// 	return{
// 		type:"UPDATE_BTC_PRICE",
// 		btc_price:amount
// 	}
// }



// -----------------------
export function counterTick(){
	return(dispatch) => {
		const newCount = store.getState().count ++
		return dispatch(counterAdd(newCount))
	}
}
export function counterAdd(count){
	return{
		type:"COUNTER_ADD",
		count: count
	}
}
// =====================================================================
export function setSelectedFund(find_id){
	return(dispatch) => {
		return dispatch(selectFund(find_id))
	}
}
export function selectFund(id){
	return{
		type:"SELECT_FUND",
		selected_portfolio: id
	}
}
// =====================================================================
export function selectUiInterface(selected_ui){
	return(dispatch) => {
		return dispatch(selectUI(selected_ui))
	}
}
export function selectUI(ui){
	return{
		type:"SELECT_UI",
		active_ui: ui
	}
}
// =====================================================================
export function fetchNewPriceHist(ticker, days, agg){
	return async (dispatch) => {
		return await axios.get(`https://cors.io/?https://min-api.cryptocompare.com/data/histoday?fsym=${ticker}&tsym=USD&limit=${days}&aggregate=${agg}&e=CCCAGG&api_key=a5e3152003c8110c8bee2bba417ab3f3b7d8b82fbade524a0b13adcc3e1b1792`, 
		// {
		// 	method: 'GET',
		// 	mode: 'cors',
		// 	headers: { 'Access-Control-Allow-Origin': * },
		// }
		// { crossdomain: true }
		).then((res) => {
			if (store.getState().historical_price_data === null) {
				let payload = res.data.Data.map( (item) => {
					const date = moment.unix(item.time).format('YYYY-MM-DD')
					return { date: date, [ticker]: item.close } 
				})
				dispatch(updatePriceHist( payload ));
			} else {
				let newData = store.getState().historical_price_data.map( (item) => {
					let newItem = item		
					for (var index of res.data.Data) {
						const checkDate = moment.unix(index.time).format('YYYY-MM-DD')
						if (checkDate === newItem.date) {
							newItem[ticker] = index.close
						}
					}
					return newItem 
				})
				dispatch(updatePriceHist( newData ));
			}
		})
	}
}
export function updatePriceHist(history){
	return{
		type:"UPDATE_PRICE_HIST",
		historical_price_data: history
	}
}
// ------------------------------------
// =====================================================================
export function fetchCoinData(){
	return async (dispatch) => {
		return await axios.get(`https://cors.io/?https://min-api.cryptocompare.com/data/all/coinlist`,
		// {
		// 	method: 'GET',
		// 	mode: 'cors',
		// 	headers: { 'Access-Control-Allow-Origin': * },
		// }
		).then( (res) => {
			const payload = []	
			for (let item of Object.values(res.data.Data)) {
				if(item.SortOrder <= store.getState().coin_limit) {
					payload.push(item)
				}
			}
			dispatch(updateCoinData( payload ));
		})

	}
}
export function updateCoinData(payload){
	return{
		type:"UPDATE_COIN_DATA",
		coin_data: payload
	}
}
// =====================================================================
export function fetchCoinSpot(){
	return async (dispatch) => {

		let ticker_list = []
		for (let portfolio of store.getState().portfolios) {
			for (let portfolio_asset of portfolio.inception_allocations ) {
				if(	ticker_list.includes(portfolio_asset.ticker) === false	) {
					ticker_list.push(portfolio_asset.ticker)
				}
			}
		}
		
		for (let item of Object.values(store.getState().coin_data)) {
			if(	ticker_list.includes(item.Symbol) === false	) {
				ticker_list.push(item.Symbol)
			}
		}
		// console.log("ticker list ", ticker_list)
		const ticker_string = ticker_list.toString()
		// console.log("ticker_string", ticker_string)
		return await axios.get(
			`https://cors.io/?https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${ticker_string}&tsyms=${store.getState().spot_pairs.toString()}`,
			// {
			// 	method: 'GET',
			// 	mode: 'cors',
			// 	headers: { 'Access-Control-Allow-Origin': * },
			// }
		).then( (res) => {
			// const payload = []	
			// for (let item of Object.values(res.data.Data)) {
			// 	console.log("item ", item)
			// 	// 	// if(item.SortOrder <= store.getState().coin_limit) {
			// // 	// 	payload.push(item)
			// // 	// }
			// }
			// const payload = res.data
			dispatch(updateCoinSpot( res.data ));
		})
	}
}
export function updateCoinSpot(payload){
	return{
		type:"UPDATE_COIN_SPOT",
		spot_price: payload
	}
}
// =====================================================================
export function fetchUsersPriceHist(){
	return async (dispatch) => {
		const current_date = moment()
		const start_date = moment.unix(store.getState().data_start_date)
		const days = current_date.diff(start_date, 'days', false)
		const aggregate = store.getState().aggregate
		const rows = (days + 1 / aggregate).toFixed(0)
		let ticker_list = []
		for (let portfolio of store.getState().portfolios) {
			for (let portfolio_asset of portfolio.inception_allocations ) {
				if(	ticker_list.includes(portfolio_asset.ticker) === false	) {
					ticker_list.push(portfolio_asset.ticker)
				}
			}
		}
		// console.log("ticker list ", ticker_list)
			for (let ticker of ticker_list) {
			
			dispatch(fetchNewPriceHist(ticker, rows, aggregate))
		}
		// dispatch(setDataLoaded('coin_data'))
	}
}

// =====================================================================
export function setDataLoaded(dataset){
	return async (dispatch) => {
		let payload = store.getState().loaded_data
		// let payload = dataset 
		// console.log("payload", payload)
		if(dataset === 'coin_data') {
			payload.coin_data = true
		} else if (dataset === 'spot_price') {
			payload.spot_price = true
		} else if (dataset === 'historical_price_data') {
			payload.historical_price_data = true
		} else {
			return
		}

		dispatch(dataLoaded( payload ))
	}
		
}
export function dataLoaded(payload){
	return{
		type:"UPDATE_DATA_LOADED",
		loaded_data: payload
	}
}
// ------------------------------------














// const portfolios = store.getState().portfolios
// const start_date = 1518238874
// const end_date = 1549775747
// const limit = 365
// let price_data = null

	
												
												




// =====================================================================
// =====================================================================
// =====================================================================
// =====================================================================
// =====================================================================



// export function updateAllHist(history){
// 	return {
// 		type:"UPDATE_ALL_HIST",
// 		historical_price_data: history
// 	}
// }





// export function fetchPrice(ticker){
// 	console.log("FetchPriceHist called!")
// 	return(dispatch) => {
// 		return axios.get(`https://api.coinbase.com/v2/prices/${ticker}-USD/spot`).then((res) => {
// 			dispatch(updatePrice(res.data.data.amount));
// 			// console.log("BTC Price: ", res.data.data.amount)
// 		})
// 	}
// }
// export function updatePrice(amount){
// 	return{
// 		type:"UPDATE_PRICE",
// 		btc_price:amount
// 	}
// }























