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

// // -----------------------
// export function fetchETHPrice(){
// 	return(dispatch) => {
// 		return axios.get('https://api.coinbase.com/v2/prices/ETH-USD/spot').then((res) => {
// 			dispatch(updateETHPrice(res.data.data.amount));
// 			// console.log("eth refreshed")
// 		})
// 	}
// }

// export function updateETHPrice(amount){
// 	return{
// 		type:"UPDATE_ETH_PRICE",
// 		eth_price:amount
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
// -----------------------
// export function counterTick(){
// 	return(dispatch) => {
// 		const newCount = store.getState().count ++
// 		return dispatch(counterAdd(newCount))
// 	}
// } 

// export function setSelectedPortfolio(id){
// 	return{
// 		type:"SET_SELECTED_PORTFOLIO",
// 		selected_portfolio: id
// 	}
// }

// -----------------------


// export function versionOne(){
// 	return async (dispatch) => {
// 		// return await axios.get('https://min-api.cryptocompare.com/data/histoday?fsym=BTC&tsym=USD&limit=365&aggregate=1&e=CCCAGG&UTCHourDiff=-4').then((res) => {
// 		let ticker_list = [{ ticker: 'BTC'}, { ticker: 'ETH'}]
		
// 		let hist_payload = []
		

// 		for (let index = 0; index < ticker_list.length; index++) {
// 			// await callback(ticker_list[index], index, array)
// 			hist_payload = await axios.get('https://min-api.cryptocompare.com/data/histoday?fsym=BTC&tsym=USD&limit=365&aggregate=1&e=CCCAGG&UTCHourDiff=-4')
// 			console.log(index)
// 			.then((res) => {
// 				let tempData = res.data.Data.map( (item) => {
// 					const date = moment.unix(item.time).format('YYYY-MM-DD')
// 					return { date: date, close: item.close } 
// 				})
				
				
// 			})
			
// 		}



// 			return dispatch(updatePriceHist(hist_payload))
// 	}
// }





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






// export const refreshList = list => (dispatch) => {
// 	let ticker_list = [{ ticker: 'BTC'}, { ticker: 'ETH'}]
// 	let hist_payload = []
// 	return Promise.all(ticker_list.map((item, hist_payload) => {
// 	  	const url = `https://api.coinbase.com/v2/prices/${item.ticker}-USD/spot`
// 	  	return axios.get(url)
// 			.then(({ data }) => {
// 		  	// data.uniqueId = version.uniqueId;
// 			//   data.refreshId = uuidv1();
// 				console.log("item.ticker: ", item.ticker)
// 				// hist_payload.push(data)
// 				dispatch(updateRefreshList({ item.ticker, data }));
// 			})
// 			.catch((e) => {
// 				console.log(e)
// 			})
// 	}))
// }

// export function updateRefreshList(ticker, history){
//     return{
// 		type:"UPDATE_REFRESH_HIST",
// 		payload: { ticker: ticker.ticker,
//         historical_price_data: history
//     }
// }



// async function asyncForEach(array, callback) {
// 	for (let index = 0; index < array.length; index++) {
// 	  await callback(array[index], index, array)
// 	}
//   }
  
// export  const start = async () => {
// 	await asyncForEach([{ ticker: 'BTC'}, { ticker: 'ETH'}], async (item) => {
// 	//   await waitFor(50)
// 	  console.log(item)
// 	})
// 	console.log('Done')
//   }



export function fetchPriceHist(){
	return async (dispatch) => {
		return await axios.get('https://min-api.cryptocompare.com/data/histoday?fsym=BTC&tsym=USD&limit=365&aggregate=1&e=CCCAGG&UTCHourDiff=-4').then((res) => {
		let tempData = res.data.Data.map( (item) => {
				const date = moment.unix(item.time).format('YYYY-MM-DD')
				return { date: date, close: item.close } 
				// return { [date]: item.close } 
				// return tempData[date] = item.close
			})
			
			// console.log("tempData: ", tempData)
			dispatch(updatePriceHist(tempData));

			// let tempPrice = 0
			// let tempDate = null
			// for (let i = tempData.length-1; i >= 0; i--) {
			// 	if (tempPrice < tempData[i].close) {
			// 		tempDate = tempData[i].date
			// 		tempPrice = tempData[i].close
			// 	}
			// }


		})
	}
}











// export function newfetchPriceHist(){
// 	return async (dispatch) => {
// 		const ticker = 'BTC'
// 		const days = 7
// 		let ticker_list = [{ ticker: 'BTC'}, { ticker: 'ETH'}]

// 		let data = []

// 		data = ticker_list.map((item) => {
// 			console.log(item.ticker)
// 			return 
// 		})
// 		// for (let value of ticker_list) {
// 			// data.push(tempData)
// 			// await axios.get(`https://min-api.cryptocompare.com/data/histoday?fsym=${ticker}&tsym=USD&limit=${days}&aggregate=1&e=CCCAGG`).then((res) => {
// 			// 	let tempData = res.data.Data.map( (item) => {
// 			// 		const date = moment.unix(item.time).format('YYYY-MM-DD')
// 			// 		console.log({ date: date, close: item.close })
// 			// 		return { date: date, close: item.close } 
// 			// 		// return { [date]: item.close } 
// 			// 		// return tempData[date] = item.close
// 			// 	})
				
// 			// }
// 		// return data	
// 			// console.log("tempData: ", tempData)
// 			// dispatch(updatePriceHist(data));

// 			// let tempPrice = 0
// 			// let tempDate = null
// 			// for (let i = tempData.length-1; i >= 0; i--) {
// 			// 	if (tempPrice < tempData[i].close) {
// 			// 		tempDate = tempData[i].date
// 			// 		tempPrice = tempData[i].close
// 			// 	}
// 			// }


// 		})
// 	}
// }


export function fetchNewPriceHist(ticker, days, agg){
	return async (dispatch) => {
		return await axios.get(`https://min-api.cryptocompare.com/data/histoday?fsym=${ticker}&tsym=USD&limit=${days}&aggregate=${agg}&e=CCCAGG`).then((res) => {
			console.log("ticker: ", ticker)
			if (store.getState().historical_price_data === null) {
				// console.log("NULL!@#")
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

				// let newPayload = res.data.Data.map( (item, index) => {
				// 	console.log("new payload")
				// 	const date = moment.unix(item.time).format('YYYY-MM-DD')
				// 	// return { date: date, [ticker]: item.close } 
				// 	// existingData[index][ticker] = item.close
					
				// 	//take current date of new data, use it to looup array item propery
				// 	//if the date is correct, return the

				// 	// existingData[index] = { existingData[index].[ticker]: item.close }
				// 	// return { [date]: item.close } 
				// 	// return tempData[date] = item.close
				// })
				// console.log("newData: ", newData)
				dispatch(updatePriceHist( newData ));
			}
				
			
			// let payload = {[ticker]: tempData}
			// console.log("tempData: ", payload)
			
			
		})
	}
}
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


export function updatePriceHist(history){
	console.log("update price hist reducer")
	console.log("history", history)
    return{
        type:"UPDATE_PRICE_HIST",
        price_hist: history
    }
}

// ----------------------

// export function fetchBTCPrice(){
// 	return(dispatch) => {
// 		return axios.get('https://api.coinbase.com/v2/prices/BTC-USD/spot').then((res) => {
// 			dispatch(updateBTCPrice(res.data.data.amount));
// 			// console.log("BTC Price: ", res.data.data.amount)
// 		})
// 	}
// }
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





export function updateAllHist(history){
    return {
        type:"UPDATE_ALL_HIST",
        historical_price_data: history
    }
}







