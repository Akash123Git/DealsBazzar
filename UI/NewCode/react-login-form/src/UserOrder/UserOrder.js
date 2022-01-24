import React from 'react'
import { connect } from 'react-redux'
import Store from '../Redux/Store'
import * as actions from '../Redux/Action/ProductAction'
import ProductService from '../Service/ProductService'
import OrderService from '../Service/OrderService'
import * as productaction from '../Redux/Action/ProductIdAction'
import * as bidaction from '../Redux/Action/BidUserAction'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'
import * as orderUseraction from '../Redux/Action/OrderAction'


var mapStateToProps = state => {
    return {
        products: state.products,
        orderList: state.userorderlist
    }
}



class UserOrder extends React.Component {
    
    cancelOrder=(order)=>{
        
        OrderService.cancelOrder(order)
                .then(response => response.json())
                .then(data => {
                    var arr=this.newOrderList(data.data)
                    if (data.statusCode == 200) {
                        Store.dispatch({
                            ...orderUseraction.ACTION_CANCEL_ORDER, payload: {
                                orderId: data.data.orderId
                            }
                        })
                        var pid=data.data.productId
                        var stock=data.data.stock
                        Store.dispatch({
                            ...actions.ACTION_UPDATE_PRODUCT_QUANTITY, payload: {
                                pid: pid,
                                stock:stock
                            }
                        })
                    }
                })

    }

    filterProduct=(order)=>{
        var arr=[]
        arr=this.props.products.filter(product=>product.productId==order.productId)
        return arr
    }

    newOrderList=(order)=>{
        var arr=[]
        this.props.orderList.map((ord)=>{
            var a=order.orderId
            var b=ord.orderId
            if(a===b){
                console.log(true)
            arr.push(ord)
            }
            else{
                console.log(false)
                    arr.push(order)
                }
            })
        this.setState({arr:arr})
        return arr
    }

    render() {
        return <>
            <Navbar />
            <table className="table table-dark table-striped" >
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
                            {this.filterProduct(order).map((product) => {
                                
                                    
                                    return <>
                                        <td ref={this.product=product}>{product.productName}</td>
                                        <td>{product.productDescription}</td>
                                        <td><img className="image" src={`data:image/jpeg;base64,${product.productImages[0]}`} alt="first image"></img></td>
                                        <td>{product.vendorPrice}</td>
                                        <td>{product.productStock}</td>
                                    </>
                            })}
                            <td>{order.orderDate}</td>
                            <td>
                                {order.orderStatus=="shipping"?<>
                                <button className="btn btn-info">shipping</button>
                                <button className="btn shadow-lg rounded-pill btn-light" onClick={()=>{this.cancelOrder(order)}}>cancel order</button>
                                </>
                                :(order.orderStatus=="cancelled"?
                                <button className="btn btn-dark">cancelled</button>
                                :
                                <button className="btn btn-success">delivered</button>
                                )}
                            </td>
                        </tr>


                    })}
                </tbody>
            </table>

        </>

    }

}

export default connect(mapStateToProps)(UserOrder);