class OrderService{

fetchUserOrders=()=>{
    return fetch("http://localhost:8080/order/getUserOrders")
}

fetchOrders=()=>{
    return fetch("http://localhost:8080/order/getorders")
    
}

}

var obj = new OrderService()
export default obj;