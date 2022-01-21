import * as actiontype from '../Action/Action'

export default function CategoryReducer(state=[],action){
    switch(action.type){
        case actiontype.LOAD_CATEGORIES:return action.payload.categories
        default:return state
    }
}