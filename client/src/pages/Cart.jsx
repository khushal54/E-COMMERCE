import { useEffect, useState } from "react";
import API from "../api/api";

function Cart() {
  const [cart, setCart] = useState([]);

  const [order, setOrder] = useState({
    name: "",
    mobile: "",
    email: "",
    address: "",
    pincode: "",
    paymentMethod: "COD"
  });

  const getCart = async () => {
    const res = await API.get("/cart");
    setCart(res.data);
  };

  const removeItem = async (id) => {
    await API.delete(`/cart/${id}`);
    getCart();
  };

  const placeOrder = async () => {
    await API.post("/orders", order);
    alert("Order placed successfully");
    getCart();
  };

  useEffect(() => {
    getCart();
  }, []);

  const total = cart.reduce((sum, item) => {
    const discountAmount = (item.price * item.discount) / 100;
    return sum + (item.price - discountAmount) * item.quantity;
  }, 0);

  return (
    <div className="container mt-4">
      <h2>My Cart</h2>

      {cart.map((item) => (
        <div className="card p-3 mb-3" key={item._id}>
          <div className="d-flex gap-3">
            <img src={item.mainImg} width="120" />

            <div>
              <h5>{item.title}</h5>
              <p>Size: {item.sizes}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Price: ₹{item.price}</p>

              <button
                className="btn btn-danger btn-sm"
                onClick={() => removeItem(item._id)}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      ))}

      <h4>Total: ₹{total}</h4>

      <hr />

      <h3>Order Details</h3>

      <input
        className="form-control mb-2"
        placeholder="Name"
        onChange={(e) => setOrder({ ...order, name: e.target.value })}
      />

      <input
        className="form-control mb-2"
        placeholder="Mobile"
        onChange={(e) => setOrder({ ...order, mobile: e.target.value })}
      />

      <input
        className="form-control mb-2"
        placeholder="Email"
        onChange={(e) => setOrder({ ...order, email: e.target.value })}
      />

      <input
        className="form-control mb-2"
        placeholder="Address"
        onChange={(e) => setOrder({ ...order, address: e.target.value })}
      />

      <input
        className="form-control mb-2"
        placeholder="Pincode"
        onChange={(e) => setOrder({ ...order, pincode: e.target.value })}
      />

      <select
        className="form-control mb-3"
        onChange={(e) =>
          setOrder({ ...order, paymentMethod: e.target.value })
        }
      >
        <option value="COD">Cash On Delivery</option>
        <option value="UPI">UPI</option>
        <option value="CARD">Card</option>
        <option value="NET_BANKING">Net Banking</option>
      </select>

      <button className="btn btn-success" onClick={placeOrder}>
        Place Order
      </button>
    </div>
  );
}

export default Cart;