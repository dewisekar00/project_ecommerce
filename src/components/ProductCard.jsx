import React from "react";
import { fetchAddCart } from "../config/redux/Slice/addCart";
import { useNavigate } from "react-router-dom";
import { fetchDetailProduct } from "../config/redux/Slice/detailProduct";

import { useDispatch, useSelector } from "react-redux";

const ProductCard = (props) => {
  const { id, image, title, price } = props;
  const dispatch = useDispatch();
  const products = useSelector((state) => state.addCart.addCart);

  const handleAddToCart = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      // Jika pengguna belum login, tampilkan pesan atau arahkan ke halaman login
      document.getElementById("my_modal_2").showModal();
    } else {
      // Jika pengguna sudah login, cek apakah produk sudah ada di keranjang belanja
      const isProductExist = products.some((product) => product.id === id);
      if (isProductExist) {
        document.getElementById("my_modal_1").showModal();
      } else {
        // Jika belum ada, tambahkan produk ke keranjang belanja
        dispatch(fetchAddCart(id));
      }
    }
  };
  const navigate = useNavigate();
  const handleToLogin = () => {
    navigate("/login");
  };

  const toDetailProduct = () => {
    navigate(`/detail-product/${id}`);
    dispatch(fetchDetailProduct(id));
  };

  const handleToCart = () => {
    navigate("/cart");
  };

  return (
    <div>
      <div className="card card-compact w-40 h-72 sm:w-48 sm:h-72 bg-base-100 shadow-xl ">
        <figure>
          <div onClick={toDetailProduct} className="cursor-pointer">
            <img
              src={image}
              alt="product image"
              className="h-32 object-cover"
            />
          </div>
        </figure>
        <div className="card-body h-48 ">
          <div className="h-24">
            <h2
              className="card-title text-sm text-[12px] cursor-pointer"
              onClick={toDetailProduct}
            >
              {title.length > 30 ? `${title.slice(0, 30)}...` : title}
            </h2>
            <h2 className="font-bold">{`$ ${price}`}</h2>
          </div>
          <div className="flex justify-end ">
            <button
              className="btn border bg-white text-green-400 border-green-400 rounded-full  text-xs btn-sm hover:bg-green-400 hover:text-white"
              onClick={handleAddToCart}
            >
              Add to cart
            </button>

            <dialog id="my_modal_1" className="modal">
              <div className="modal-box">
                <h3 className="font-bold text-lg">message</h3>
                <p className="py-4">The product is already in the cart!</p>
                <div className="modal-action">
                  <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn">close</button>
                    <button
                      className="btn bg-green-300   mx-4"
                      onClick={handleToCart}
                    >
                      view cart
                    </button>
                  </form>
                </div>
              </div>
            </dialog>

            <dialog id="my_modal_2" className="modal">
              <div className="modal-box">
                <h3 className="font-bold text-lg">message</h3>
                <p className="py-4">Kamu belum login nih,login dulu yuk!</p>
                <div className="modal-action">
                  <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn">close</button>
                    <button
                      className="btn bg-green-300   mx-4"
                      onClick={handleToLogin}
                    >
                      login
                    </button>
                  </form>
                </div>
              </div>
            </dialog>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
