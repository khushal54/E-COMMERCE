import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    mobile: "",
    address: "",
    pincode: ""
  });

  const submitHandler = async (e) => {
    e.preventDefault();

    const res = await API.post("/auth/register", form);

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));

    navigate("/");
  };

  return (
    <div className="container mt-5">
      <h2>Register</h2>

      <form onSubmit={submitHandler} className="card p-4">
        <input
          className="form-control mb-3"
          placeholder="Username"
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />

        <input
          className="form-control mb-3"
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          className="form-control mb-3"
          placeholder="Password"
          type="password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <input
          className="form-control mb-3"
          placeholder="Mobile"
          onChange={(e) => setForm({ ...form, mobile: e.target.value })}
        />

        <input
          className="form-control mb-3"
          placeholder="Address"
          onChange={(e) => setForm({ ...form, address: e.target.value })}
        />

        <input
          className="form-control mb-3"
          placeholder="Pincode"
          onChange={(e) => setForm({ ...form, pincode: e.target.value })}
        />

        <button className="btn btn-dark">Register</button>
      </form>
    </div>
  );
}

export default Register;