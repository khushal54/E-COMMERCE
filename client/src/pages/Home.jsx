import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/api";

function Home() {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    const res = await API.get("/products");
    setProducts(res.data);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="container mt-4">
      <h2>ShopEZ Products</h2>

      <div className="row mt-4">
        {products.map((product) => (
          <div className="col-md-4 mb-4" key={product._id}>
            <div className="card h-100">
              <img
                src={product.mainImg}
                className="card-img-top product-img"
                alt={product.title}
              />

              <div className="card-body">
                <h5>{product.title}</h5>
                <p>{product.description}</p>
                <h6>₹{product.price}</h6>
                <p className="text-success">{product.discount}% OFF</p>

                <Link
                  to={`/products/${product._id}`}
                  className="btn btn-dark w-100"
                >
                  Shop Now
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;