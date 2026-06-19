import { useEffect, useState } from "react";
import API from "../api/api";

function AdminDashboard() {
  const [product, setProduct] = useState({
    title: "",
    description: "",
    mainImg: "",
    category: "",
    sizes: "",
    gender: "UNISEX",
    price: "",
    discount: "",
    stock: ""
  });

  const [orders, setOrders] = useState([]);

  const createProduct = async (e) => {
    e.preventDefault();

    try {
      await API.post("/admin/products", {
        ...product,
        sizes: product.sizes.split(","),
        price: Number(product.price),
        discount: Number(product.discount),
        stock: Number(product.stock)
      });

      alert("Product created successfully");

      setProduct({
        title: "",
        description: "",
        mainImg: "",
        category: "",
        sizes: "",
        gender: "UNISEX",
        price: "",
        discount: "",
        stock: ""
      });
    } catch (err) {
      alert(err.response?.data?.message || "Product creation failed");
    }
  };

  const getOrders = async () => {
    try {
      const res = await API.get("/admin/orders");
      setOrders(res.data);
    } catch (err) {
      console.log(err.response?.data?.message || "Orders fetch failed");
    }
  };

  const updateStatus = async (id, status) => {
    await API.put(`/admin/orders/${id}/status`, { status });
    getOrders();
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Admin Dashboard</h2>

      <div className="card p-4 mb-5">
        <h4 className="mb-3">Add Product</h4>

        <form onSubmit={createProduct}>
          <input
            className="form-control mb-2"
            placeholder="Product Title"
            value={product.title}
            onChange={(e) => setProduct({ ...product, title: e.target.value })}
          />

          <textarea
            className="form-control mb-2"
            placeholder="Product Description"
            value={product.description}
            onChange={(e) =>
              setProduct({ ...product, description: e.target.value })
            }
          />

          <input
            className="form-control mb-2"
            placeholder="Product Image URL"
            value={product.mainImg}
            onChange={(e) =>
              setProduct({ ...product, mainImg: e.target.value })
            }
          />

          <input
            className="form-control mb-2"
            placeholder="Category"
            value={product.category}
            onChange={(e) =>
              setProduct({ ...product, category: e.target.value })
            }
          />

          <input
            className="form-control mb-2"
            placeholder="Sizes comma separated: S,M,L,XL or 7,8,9"
            value={product.sizes}
            onChange={(e) => setProduct({ ...product, sizes: e.target.value })}
          />

          <select
            className="form-control mb-2"
            value={product.gender}
            onChange={(e) => setProduct({ ...product, gender: e.target.value })}
          >
            <option value="MEN">MEN</option>
            <option value="WOMEN">WOMEN</option>
            <option value="KIDS">KIDS</option>
            <option value="UNISEX">UNISEX</option>
          </select>

          <input
            className="form-control mb-2"
            placeholder="Price"
            type="number"
            value={product.price}
            onChange={(e) => setProduct({ ...product, price: e.target.value })}
          />

          <input
            className="form-control mb-2"
            placeholder="Discount"
            type="number"
            value={product.discount}
            onChange={(e) =>
              setProduct({ ...product, discount: e.target.value })
            }
          />

          <input
            className="form-control mb-3"
            placeholder="Stock"
            type="number"
            value={product.stock}
            onChange={(e) => setProduct({ ...product, stock: e.target.value })}
          />

          <button type="submit" className="btn btn-dark w-100">
            Create Product
          </button>
        </form>
      </div>

      <h4>All Orders</h4>

      {orders.length === 0 && <p>No orders yet.</p>}

      {orders.map((order) => (
        <div className="card p-3 mb-3" key={order._id}>
          <h6>Order ID: {order._id}</h6>
          <p>User: {order.userId?.username}</p>
          <p>Amount: ₹{order.finalAmount}</p>
          <p>Status: {order.status}</p>

          <select
            className="form-control mb-2"
            value={order.status}
            onChange={(e) => updateStatus(order._id, e.target.value)}
          >
            <option value="PLACED">PLACED</option>
            <option value="PACKED">PACKED</option>
            <option value="SHIPPED">SHIPPED</option>
            <option value="DELIVERED">DELIVERED</option>
            <option value="CANCELLED">CANCELLED</option>
          </select>
        </div>
      ))}
    </div>
  );
}

export default AdminDashboard;