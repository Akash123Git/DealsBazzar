import React from 'react'
import { connect } from 'react-redux'
import Store from '../Redux/Store'
import * as bidaction from '../Redux/Action/BidOtherUsersAction'
import BidService from '../Service/BidService'

var mapStateToProps = state => {
    return {
        bidOtherUserslist: state.bidOtherUserslist
    }
}

class BidOtherUsersComponent extends React.Component {
    constructor(props){
        super(props)
    }

    updateBidStatus=(bid,status)=>{

        bid.bidStatus=status

        BidService.updateBid(bid)
        .then(response=>response.json())
        .then(data=>{
          if(data.statusCode==200){
            alert("bid status is successfully updated")
            Store.dispatch({
              ...bidaction.ACTION_UPDATE_PRODUCT_BID, payload: {
                bidlist: data.data
              }
            })
          }else{
            alert("bid status could ne updated, please try again after some time")
          }
        })

    }

    render() {
        return <>
            <table className="table" >
                <thead>
                    <tr>
                        <th scope="col">Bidder Name</th>
                        <th scope="col">Bidder Price</th>
                        <th scope="col">Bidder Stock</th>
                        <th scope="col">Bidder Status</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.bidOtherUserslist.filter(bids=>bids.productId==this.props.productId).map((bid, index) => {
                        return <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{bid.userId}</td>
                            <td>{bid.bidPrice}</td>
                            <td>{bid.bidStock}</td>
                            <td>
                                {bid.bidStatus == 1 ? 
                                <>
                                    <h6>Congrats!!! Your bid has been accepted you can now proceed for payment</h6>
                                        <hr /><hr />
                                    <button className="btn btn-success">Accepted</button>
                                </>
                                :
                                (bid.bidStatus == 0 ?
                                    <button className="btn btn-info">Not Accepted</button>
                                :
                                    <button className="btn btn-light" onClick={()=>{this.updateBidStatus(bid,1)}} >Accept</button>)
                                }
                            </td>
                        </tr>


                    })}
                </tbody>
            </table>

        </>

    }

}

export default connect(mapStateToProps)(BidOtherUsersComponent);