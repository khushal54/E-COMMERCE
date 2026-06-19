import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/api";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  const getProduct = async () => {
    const res = await API.get(`/products/${id}`);
    setProduct(res.data);
  };

  const addToCart = async () => {
    await API.post("/cart/add", {
      productId: id,
      quantity,
      size
    });

    alert("Product added to cart");
  };

  useEffect(() => {
    getProduct();
  }, [id]);

  if (!product) return <h3 className="container mt-5">Loading...</h3>;

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-5">
          <img src={product.mainImg} className="img-fluid" />
        </div>

        <div className="col-md-7">
          <h2>{product.title}</h2>
          <p>{product.description}</p>

          <h4>₹{product.price}</h4>
          <p className="text-success">{product.discount}% Discount</p>

          <p>Category: {product.category}</p>
          <p>Stock: {product.stock}</p>

          <select
            className="form-control mb-3"
            onChange={(e) => setSize(e.target.value)}
          >
            <option value="">Select Size</option>
            {product.sizes?.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>

          <input
            type="number"
            className="form-control mb-3"
            value={quantity}
            min="1"
            onChange={(e) => setQuantity(Number(e.target.value))}
          />

          <button className="btn btn-dark" onClick={addToCart}>
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;