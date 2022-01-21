import {combineReducers, createStore} from 'redux'
import ProductReducer from './Reducer/ProductReducer'
import ProductIdReducer from './Reducer/ProductIdReducer'
import UserReducer from './Reducer/UserReducer'
import CategoryReducer from './Reducer/CategoryReducer'
import BidOtherUsersReducer from './Reducer/BidOtherUsersReducer'
import BidUserReducer from './Reducer/BidUserReducer'

var store=createStore(combineReducers({
    products : ProductReducer,
    product : ProductIdReducer,
    categories : CategoryReducer,
    user : UserReducer,
    bidUserList : BidUserReducer,
    bidOtherUserslist : BidOtherUsersReducer 
}),{
    products:[],
    product:{},
    categories:[],
    user : { loginstatus : false, token : undefined , username : undefined, userdetails : undefined },
    bidUserList:[],
    bidOtherUserslist:[]

})

export default store;