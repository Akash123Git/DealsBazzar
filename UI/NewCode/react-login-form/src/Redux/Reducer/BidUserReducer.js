import * as actiontype from '../Action/Action'

export default function BidUserReducer(state=[],action){
    switch(action.type){
        case actiontype.LOAD_LOGGED_USER_BIDS:return action.payload.bidlist
        case actiontype.ADD_LOGEED_USER_BIDS:return [...state,action.payload.bid]
        default:return state
    }
}