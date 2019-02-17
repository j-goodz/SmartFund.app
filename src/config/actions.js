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
export function setSelectedFund(find_id){
	// console.log("setSelectedFund: ", setSelectedFund)
	return(dispatch) => {
		// const newCount = store.getState().count ++
		return dispatch(selectFund(find_id))
	}
}
export function selectFund(id){
	return{
		type:"SELECT_FUND",
		selected_portfolio: id
	}
}

// -----------------------
export function fetchPrice(ticker){
	console.log("FetchPriceHist called!")
	return(dispatch) => {
		return axios.get(`https://api.coinbase.com/v2/prices/${ticker}-USD/spot`).then((res) => {
			dispatch(updatePrice(res.data.data.amount));
			// console.log("BTC Price: ", res.data.data.amount)
		})
	}
}

export function updatePrice(amount){
	return{
		type:"UPDATE_PRICE",
		btc_price:amount
	}
}


export function fetchNewPriceHist(ticker, days, agg){
	return async (dispatch) => {
		return await axios.get(`https://min-api.cryptocompare.com/data/histoday?fsym=${ticker}&tsym=USD&limit=${days}&aggregate=${agg}&e=CCCAGG`).then((res) => {
			// console.log("ticker: ", ticker)
			if (store.getState().historical_price_data === null) {
				// console.log("NULL!@#")
				// console.log("res.data.Data", res.data.Data)
				let payload = res.data.Data.map( (item) => {
					const date = moment.unix(item.time).format('YYYY-MM-DD')
					return { date: date, [ticker]: item.close } 
				})
				// console.log("payload ", payload)
				dispatch(updatePriceHist( payload ));
			} else {
				// console.log("NOT NULL!@#")
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
				// console.log("newData: ", newData)
				dispatch(updatePriceHist( newData ));
			}
		})
	}
}
export function updatePriceHist(history){
	// console.log("update price hist reducer")
	// console.log("history", history)
	return{
		type:"UPDATE_PRICE_HIST",
		historical_price_data: history
	}
}

// ------------------------------------

export function updateAllHist(history){
	return {
		type:"UPDATE_ALL_HIST",
		historical_price_data: history
	}
}


// export function updateAllHist(history){
// 	return {
// 		type:"UPDATE_ALL_HIST",
// 		historical_price_data: history
// 	}
// }
// dispatch(updatePriceHist( { [ticker]: tempData }));
// dispatch(updatePriceHist(tempData));

// export async function fetchHist(ticker, days){
// 	return async (dispatch) => {
// 		return await axios.get(`https://min-api.cryptocompare.com/data/histoday?fsym=${ticker}&tsym=USD&limit=${days}&aggregate=1&e=CCCAGG`).then((res) => {
// 		let tempData = res.data.Data.map( (item) => {
// 				const date = moment.unix(item.time).format('YYYY-MM-DD')
// 				return { date: date, unix_date: item.time, close: item.close } 
// 			})
// 			dispatch (updatePriceHist(tempData));
// 		})
// 	}
// }
// ----------------------

export async function fetchAllHist(){
	return(dispatch) => {	
	// const ticker_list = portfolios.inception_allocations.map((item) => {
		// 	return item.ticker
		// })
		
		// const data = await this.fetchHist('BTC', 10)
		
		return  (dispatch) => {
			// return async (dispatch) => {
				const portfolios = store.getState().portfolios
				const start_date = 1518238874
				const end_date = 1549775747
				const limit = 365
				let price_data = null
			// const ticker = 'BTC'
			
			// // for (let allocation_item of ticker_list) {
				
			// return 	console.log(store.getState().portfolios)
		// 	for (let allocation_item in portfolios.inception_allocations) {
		// 		const ticker = allocation_item.ticker
		// 		// console.log(ticker)
		// 	// const history_payload = await axios.get(`https://min-api.cryptocompare.com/data/histoday?fsym=${ticker}&tsym=USD&limit=${limit}&aggregate=1&e=CCCAGG`).then((res) => {
		// // 		let tempData = res.data.Data.map( (item) => {
		// // 			const date = moment.unix(item.time).format('YYYY-MM-DD')
		// // 			return { date: date, unix_date: item.time, close: item.close } 
		// // 		})
			dispatch(updateAllHist(portfolios));
			}
			// dispatch(updateAllHist(portfolios));

	}
	
	
		

		// 	})
			
		// })
		
		// console.log("tempData: ", tempData)
		// return
	// }
}












