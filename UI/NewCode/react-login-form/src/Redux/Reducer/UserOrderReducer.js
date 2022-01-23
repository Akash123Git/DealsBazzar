import * as actiontype from '../Action/Action'


export default function UserOrderReducer(state = [], action) {
    switch (action.type) {
        case actiontype.LOAD_USER_ORDERS: return action.payload.userorderlist
        case actiontype.ADD_ORDER: return [...state,action.payload.order]
        case actiontype.LOGOUT: return action.payload.reset
        default:return state
    }
}