import React from 'react'
import { connect } from 'react-redux'
import Store from '../Redux/Store'
import * as actions from '../Redux/Action/ProductAction'
import ProductService from '../Service/ProductService'
import * as productaction from '../Redux/Action/ProductIdAction'
import * as bidaction from '../Redux/Action/BidUserAction'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'

var mapStateToProps = state => {
    return {
        products: state.products,
        orderList: state.userorderlist
    }
}



class UserOrder extends React.Component {

    render() {
        return <>
            <Navbar />
            <table className="table" >
                <thead>
                    <tr>
                        <th scope="col">Sl.no</th>
                        <th scope="col">Product Name</th>
                        <th scope="col">Product Description</th>
                        <th scope="col">Images</th>
                        <th scope="col">bidded price</th>
                        <th scope="col">bidded Stock</th>
                        <th scope="col">orderDate</th>
                        <th scope="col">orderStatus</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.orderList.map((order, index) => {
                        return <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            {this.props.products.map((product) => {
                                if (order.productId == product.productId) {
                                    
                                    return <>
                                        <td ref={this.product=product}>{product.productName}</td>
                                        <td>{product.productDescription}</td>
                                        <td><img className="image" src={`data:image/jpeg;base64,${product.productImages[0]}`} alt="first image"></img></td>
                                        <td>{product.vendorPrice}</td>
                                        <td>{product.productStock}</td>
                                    </>
                                }
                            })}
                            <td>{order.orderDate}</td>
                            <td>
                                {order.orderStatus=="shipping"?<>
                                <button className="btn btn-info">shipping</button>
                                </>
                                :
                                <button className="btn btn-info">delivered</button>
                                }
                            </td>
                        </tr>


                    })}
                </tbody>
            </table>

        </>

    }

}

export default connect(mapStateToProps)(UserOrder);