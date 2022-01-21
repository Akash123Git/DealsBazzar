import React from 'react'
import './Dashboard.css'
import { connect } from 'react-redux'
import Store from '../Redux/Store'

import * as actions from '../Redux/Action/ProductIdAction'
import { Link } from 'react-router-dom'

import Navbar from '../components/Navbar'
import * as userBidAction from '../Redux/Action/BidUserAction'
import * as otherUsersBidsAction from '../Redux/Action/BidOtherUsersAction'
import BidService from '../Service/BidService'

var mapStateToProps = state => {
  return {
    products: state.products,
    product: state.product,
    categories: state.categories,
    token: state.user.token
  }
}

class Dashboard extends React.Component {

  setProduct = (product) => {
    Store.dispatch({
      ...actions.ACTION_SET_PRODUCT_ID, payload: {
        product: product
      }
    })
  }

  componentDidMount() {

    //fetching user bids
    BidService.fetchUserBid()
      .then(response => response.json())
      .then(data => {
      console.log(data)
        if (data.statusCode == 200) {

          Store.dispatch({
            ...userBidAction.ACTION_LOAD_LOGGED_USER_BIDS, payload: {
              bidlist: data.data
            }
          })

          //fetching other users biding details
          BidService.fetchOtherUsersBids()
            .then(response => response.json())
            .then(data => {
              console.log(data)
              if (data.statusCode == 200) {
                Store.dispatch({
                  ...otherUsersBidsAction.ACTION_LOAD_USER_PRODUCTS_BIDS, payload: {
                    bidlist: data.data
                  }
                })
              }
            })
            //fetched other users biding details
        }
      })
    //fetched user bids
  }

  render() {
    return <>
      <Navbar />
      {this.props.token != "" ? <>
        {this.props.products.filter(p => p.vendorId != this.props.token).map(product => product.productImages == null ? <p></p>
          :

          <div className="container">
            <div className="row row-cols-2 row-cols-lg-4 g-2 g-lg-3">
              <div className="col">
                <div className="p-3">
                  <div className="card">
                    <div className="card-body">
                      <img src={`data:image/jpeg;base64,${product.productImages[0]}`} className="card-img-top" alt="first product" />
                      <h5 className="card-title">{product.productName}</h5>
                      <p className="card-text"><strong>Description : </strong> {product.productDescription}</p>
                    </div>
                    <div className="list-group list-group-flush">
                      <h6 className="list-group-item"><strong>price : &#8377; </strong>{product.vendorPrice}</h6>
                      <h6 className="list-group-item"><strong>Measurement : </strong>{this.props.categories.map((category) => { return category.categoryId == product.categoryId ? <p>{category.productMeasurement}</p> : "" })}</h6>
                      <h6 className="list-group-item"><strong>Stocks Available : </strong>{product.productStock}</h6>
                    </div>
                    <div className="card-body">
                      <Link to="/mybid" ><button className="btn btn-warning" onClick={() => this.setProduct(product)}>bid</button></Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          /* product.productImages==null?
          
          :<h1>akash</h1>} */
        )}
      </>
        : <h1>please login</h1>}
    </>
  }
}

export default connect(mapStateToProps)(Dashboard)