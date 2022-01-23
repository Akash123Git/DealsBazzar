import * as actiontype from '../Action/Action'


export default function OrderReducer(state = [], action) {
    switch (action.type) {
        case actiontype.LOAD_ORDERS: return action.payload.orderlist
        case actiontype.LOGOUT: return action.payload.reset
        default:return state
    }
}