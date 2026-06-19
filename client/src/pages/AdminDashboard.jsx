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

    await API.post("/admin/products", {
      ...product,
      sizes: product.sizes.split(","),
      price: Number(product.price),
      discount: Number(product.discount),
      stock: Number(product.stock)
    });

    alert("Product created");

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
  };

  const getOrders = async () => {
    const res = await API.get("/admin/orders");
    setOrders(res.data);
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
        <h4>Add Product</h4>

        <form onSubmit={createProduct}>
          <input
            className="form-control mb-2"
            placeholder="Title"
            value={product.title}
            onChange={(e) => setProduct({ ...product, title: e.target.value })}
          />

          <textarea
            className="form-control mb-2"
            placeholder="Description"
            value={product.description}
            onChange={(e) =>
              setProduct({ ...product, description: e.target.value })
            }
          />

          <input
            className="form-control mb-2"
            placeholder="Image URL"
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
            placeholder="Sizes comma separated: S,M,L,XL"
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
            value={product.price}
            onChange={(e) => setProduct({ ...product, price: e.target.value })}
          />

          <input
            className="form-control mb-2"
            placeholder="Discount"
            value={product.discount}
            onChange={(e) =>
              setProduct({ ...product, discount: e.target.value })
            }
          />

          <input
            className="form-control mb-2"
            placeholder="Stock"
            value={product.stock}
            onChange={(e) => setProduct({ ...product, stock: e.target.value })}
          />

          <button className="btn btn-dark">Create Product</button>
        </form>
      </div>

      <h4>All Orders</h4>

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