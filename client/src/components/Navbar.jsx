import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <Link className="navbar-brand fw-bold" to="/">
        ShopEZ
      </Link>

      <div className="ms-auto d-flex gap-3 align-items-center">
        {user && (
          <>
            <Link className="nav-link text-white" to="/">
              Products
            </Link>

            {user.userType === "USER" && (
              <>
                <Link className="nav-link text-white" to="/cart">
                  Cart
                </Link>

                <Link className="nav-link text-white" to="/orders">
                  Orders
                </Link>
              </>
            )}

            {user.userType === "ADMIN" && (
              <Link className="nav-link text-warning" to="/admin">
                Admin
              </Link>
            )}
          </>
        )}

        {!user ? (
          <>
            <Link className="btn btn-outline-light btn-sm" to="/login">
              Login
            </Link>
            <Link className="btn btn-warning btn-sm" to="/register">
              Register
            </Link>
          </>
        ) : (
          <button className="btn btn-danger btn-sm" onClick={logout}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;