import * as actiontype from './Action'

export const ACTION_LOAD_USER_ORDERS={
    type:actiontype.LOAD_USER_ORDERS,
    payload:{
        userorderlist:undefined
    }
}
export const ACTION_LOAD_ORDERS={
    type:actiontype.LOAD_ORDERS,
    payload:{
        orderlist:undefined
    }
}
export const ACTION_ADD_ORDER={
    type:actiontype.ADD_ORDER,
    payload:{
        order:undefined
    }
}
export const LOGOUT={
    type:actiontype.LOGOUT,
    payload:{
        reset:undefined
    }
}