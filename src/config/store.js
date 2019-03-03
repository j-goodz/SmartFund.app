// import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { createStore, applyMiddleware, compose } from 'redux'
// import cartReducer from '../features/cart/reducer'
import priceReducer from './reducers'
import thunk from 'redux-thunk';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const rootReducer = combineReducers({
//     // cart: cartReducer,
//     price: priceReducer

// })

// const store = createStore(
//     reducers,
//     applyMiddleware(thunk)
// )
const store = createStore(
    // rootReducer,
    priceReducer,
    // applyMiddleware(thunk)
    composeEnhancer(applyMiddleware(thunk))
)

export default store 

// export default compose(applyMiddleware(thunk))(store)(duedates);
// export default compose(applyMiddleware(thunk))(store)(duedates);
