import React from 'react'
import './Product.css'
import { connect } from 'react-redux'
import Store from '../Redux/Store'
import * as actions from '../Redux/Action/ProductAction'
import ProductService from '../Service/ProductService'
import Navbar from '../components/Navbar'

var mapStateToProps = state => {
    return {
        bidUserList: state.bidUserList,
        products: state.products
    }
}

class BidUserComponent extends React.Component {

    render() {
        return <>
            <Navbar />
            <table className="table" >
                <thead>
                    <tr>
                        <th scope="col">Sl.no</th>
                        <th scope="col">Product Name</th>
                        <th scope="col">Product Description</th>
                        <th scope="col">Measurement</th>
                        <th scope="col">Product Quantity</th>
                        <th scope="col">Images</th>
                        <th scope="col">vendor Price</th>
                        <th scope="col">bidded price</th>
                        <th scope="col">bidded Stock</th>
                        <th scope="col">bidded date</th>
                        <th scope="col">bid status</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.bidUserList.map((bid, index) => {
                        return <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            {this.props.products.map((product) => {
                                if (bid.productId == product.productId) {
                                    return <>
                                        <td>{product.productName}</td>
                                        <td>{product.productDescription}</td>
                                        {this.props.categories.map((category) => { return category.categoryId == product.categoryId ?
                                        <td>{category.productMeasurement}</td>
                                        : "" })}
                                        <td>{product.productStock}</td>

                                        <td>images</td>
                                        <td>{product.vendorPrice}</td>
                                    </>
                                }
                            })}
                            <td>{bid.bidPrice}</td>
                            <td>{bid.bidStock}</td>
                            <td>{bid.bidDate}</td>
                            <td>
                                {bid.bidStatus==1?<>
                                <h6>Congrats!!! Your bid has been accepted you can now proceed for payment</h6>
                                <hr/><hr/>
                                <button className="btn btn-success">Pay</button>
                                </>
                                :
                                (bid.bidStatus==0?<button className="btn btn-info">not accepted</button>
                                :
                                <button className="btn btn-light">pending</button>)
                                }
                            </td>
                        </tr>


                    })}
                </tbody>
            </table>

        </>

    }

}

export default connect(mapStateToProps)(BidUserComponent);