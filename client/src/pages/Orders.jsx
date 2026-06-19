import { useEffect, useState } from "react";
import API from "../api/api";

function Orders() {
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    const res = await API.get("/orders/my-orders");
    setOrders(res.data);
  };

  const cancelOrder = async (id) => {
    await API.put(`/orders/${id}/cancel`);
    getOrders();
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div className="container mt-4">
      <h2>My Orders</h2>

      {orders.map((order) => (
        <div className="card p-3 mb-3" key={order._id}>
          <h5>Order ID: {order._id}</h5>
          <p>Status: {order.status}</p>
          <p>Total Amount: ₹{order.finalAmount}</p>
          <p>Payment: {order.paymentMethod}</p>
          <p>Address: {order.address}</p>

          {order.items.map((item, index) => (
            <div key={index}>
              <p>
                {item.title} - Qty: {item.quantity} - ₹{item.price}
              </p>
            </div>
          ))}

          {order.status !== "CANCELLED" && order.status !== "DELIVERED" && (
            <button
              className="btn btn-danger btn-sm"
              onClick={() => cancelOrder(order._id)}
            >
              Cancel Order
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default Orders;