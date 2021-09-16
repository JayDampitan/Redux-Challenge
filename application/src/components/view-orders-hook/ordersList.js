import React from 'react';

const OrdersList = ({orders, setOrders}) => {
   

    if (!orders || !orders || !orders.length) return (
        <div className="empty-orders">
            <h2>There are no orders to display</h2>
        </div>
    );

     
    const deleteItem = () => {
        setOrders(orders.filter((item) => item.id !== orders._id))
    }

    return orders.map(order => {
        
        const createdDate = new Date(order.createdAt);
        let hours = createdDate.getHours();
        let minutes = createdDate.getMinutes() %12;
        let seconds = createdDate.getSeconds() %12;

        let orderedTime = `${hours}:${minutes}:${seconds}`;

        return (
            <div className="row view-order-container" key={order._id}>
                <div className="col-md-4 view-order-left-col p-3">
                    <h2>{order.order_item}</h2>
                    <p>Ordered by: {order.ordered_by || ''}</p>
                </div>
                <div className="col-md-4 d-flex view-order-middle-col">
                    <p>Order placed at { orderedTime }</p>
                    <p>Quantity: {order.quantity}</p>
                </div>
                <div className="col-md-4 view-order-right-col">
                    <button className="btn btn-success">Edit</button>
                    <button className="btn btn-danger" onClick={deleteItem}>Delete</button>
                </div>
            </div>
        );
    });
}

export default OrdersList;