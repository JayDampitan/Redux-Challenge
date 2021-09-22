import React from 'react';

const OrdersList = ({orders, setOrders}) => {
   
    if ( !orders || !orders.length) return (
        <div className="empty-orders">
            <h2>There are no orders to display</h2>
        </div>
    );
    
    // ------------Attemp to delete an item ordered
    // const deleteItem = (id) => {
    //     const newOrders = orders.filter((order) => order.id !== id)
    //     setOrders(newOrders)
    // }

    // const deleteItem = (id) => {
    //     let newOrders = [...orders];
    //     newOrders.splice(
    //         newOrders.findIndex((item) => item._id === id )
    //     )
    // }




    return orders.map(order => {

        const createdDate = new Date(order.createdAt);
        
        const formattedDate = (dateObject) => {
            const time = {
                date: dateObject.getDate(),
                month: dateObject.getMonth() + 1,
                year: dateObject.getFullYear(),
                hours: dateObject.getHours().toString().padStart(2, "0"),
                minutes: dateObject.getMinutes().toString().padStart(2, "0"),
                seconds: dateObject.getSeconds().toString().padStart(2, "0"),
            };
            return `${time.month}/${time.date}/${time.year} ${time.hours}:${time.minutes}:${time.seconds}`
        }

        const orderedDate = formattedDate(createdDate);
    
        return (
            <div className="row view-order-container" key={order._id}>
                <div className="col-md-4 view-order-left-col p-3">
                    <h2>{order.order_item}</h2>
                    <p>Ordered by: {order.ordered_by || ''}</p>
                </div>
                <div className="col-md-4 d-flex view-order-middle-col">
                    <p>Order placed at {orderedDate}</p>
                    <p>Quantity: {order.quantity}</p>
                </div>
                <div className="col-md-4 view-order-right-col">
                    <button className="btn btn-success">Edit</button>
                    <button className="btn btn-danger">Delete</button>
                </div>
            </div>
        );
    });
}

export default OrdersList;