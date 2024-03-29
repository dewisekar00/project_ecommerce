import React from "react";
import { useSelector } from "react-redux";
import SearchingProduct from "./SearchingProduct";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const totalPrice = useSelector((state) => state.addCart.totalPrice);
  const totalItems = useSelector((state) => state.addCart.total);
  const navigate = useNavigate();

  const handleToCart = () => {
    navigate("/cart");
  };
  const token = localStorage.getItem("token");
  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  const handleLogin = () => {
    navigate("/login");
  };
  
  return (
    <div className="navbar bg-base-100 sticky top-0 z-40 md:px-8">
      <div className="flex-1">
        <a className="btn btn-ghost text-green-500 text-xl">shosho</a>
      </div>

      <div className="hidden sm:block">
        <SearchingProduct />
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="badge badge-sm indicator-item">
                {totalItems}
              </span>
            </div>
          </div>

          <div
            tabIndex={0}
            className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
          >
            <div className="card-body">
              <span className="font-bold text-lg">{totalItems} Items</span>
              <span className="text-green-700">
                Subtotal: ${totalPrice.toFixed(2)}
              </span>
              <div className="card-actions">
                <button
                  className="btn bg-green-300 text-white btn-block"
                  onClick={handleToCart}
                >
                  view cart
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://i.pinimg.com/564x/f5/fd/14/f5fd146c41549072d5a7823e31ea8eae.jpg"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a className="justify-between">Profile</a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              {token ? (
                <a onClick={handleLogOut}>Logout</a>
              ) : (
                <a onClick={handleLogin}>Login</a>
              )}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
