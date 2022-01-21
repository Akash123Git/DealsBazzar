import * as actiontype from '../Action/Action'

export default function BidOtherUsersReducer(state=[],action){
    switch(action.type){
        case actiontype.LOAD_USER_PRODUCTS_BIDS:return action.payload.bidlist
        case actiontype.UPDATE_PRODUCT_BIDS:return state.map((bid)=>{
        
            //another map start
            action.payload.bidlist.map((updatedbid)=>{

                if(bid.productId==updatedbid.productId){

                    bid.bidStatus=updatedbid.bidStatus   
                }
            })
            //another map end
            return bid
        })
        default:return state
    }
}