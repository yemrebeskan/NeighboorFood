import React, { useContext, useState } from "react";
import OrderedFoodContext from "../../context/OrderedFoodContext";
import "./Orders.css";

const Orders = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const ordersCtx = useContext(OrderedFoodContext);
  const orders = ordersCtx.giveOrderHandler();

  const closeSelectedOrder = () => {
    setSelectedOrder(null);
  };  

  return (
    <div className="mb-64">
      <ul className="order">
        {orders.map((order, index) => (
          <li key={index} onClick={selectedOrder===order?closeSelectedOrder:() => setSelectedOrder(order)}>
            Order {index + 1}
          </li>
        ))}
      </ul>

      {selectedOrder && (
        <div className="selected-order">
          <ul>
            {selectedOrder.map((food, index) => (
              <li key={index}>
                <div className="food-details">
                  <div>{food.menuName}</div>
                  <div>{food.price}</div>
                  <div>{food.count}</div>
                  
                </div>
               
              </li>
            ))}
            <div>Total Price: {ordersCtx.totalPrice}</div>
          </ul>
           
          
        </div>
      )}
    </div>
  );
};

export default Orders;
