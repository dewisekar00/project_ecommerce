import React, { useState, useCallback } from "react";
import { fetchAddCart } from "../config/redux/Slice/addCart";
import { useNavigate } from "react-router-dom";
import { fetchDetailProduct } from "../config/redux/Slice/detailProduct";

import { useDispatch, useSelector } from "react-redux";
import Modal from "./Modal";

const ProductCard = (props) => {
  const [isModalOpen, setIsModalOpen] = useState({ login: false, cart: false });
  const { id, image, title, price } = props;
  const dispatch = useDispatch();
  const products = useSelector((state) => state.addCart.addCart);
  const navigate = useNavigate();

  const handleAddToCart = useCallback(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsModalOpen({ ...isModalOpen, login: true });
    } else {
      const isProductExist = products.some((product) => product.id === id);
      if (isProductExist) {
        setIsModalOpen({ ...isModalOpen, cart: true });
      } else {
        dispatch(fetchAddCart(id));
      }
    }
  }, [dispatch, id, products]);

  /*
note: Dengan menggunakan useCallback, React akan memastikan bahwa toDetailProduct hanya dibuat ulang jika salah satu dari dependensi ini berubah
  */
  const toDetailProduct = useCallback(() => {
    navigate(`/detail-product/${id}`);
    dispatch(fetchDetailProduct(id));
  }, [dispatch, id, navigate]);

  const closeModal = useCallback(
    (modalType) => {
      setIsModalOpen({ ...isModalOpen, [modalType]: false });
    },
    [isModalOpen]
  );

  return (
    <>
      <div>
        <div className="card card-compact w-40 h-72 sm:w-48 sm:h-72 bg-base-100 shadow-xl ">
          <figure className="h-[200px]">
            <div onClick={toDetailProduct} className="cursor-pointer h-full">
              <img
                src={image}
                alt="product image"
                className="h-full  w-full object-cover"
                loading="lazy"
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

              <Modal
                isOpen={isModalOpen.cart}
                message="The product is already in the cart!"
                onClose={() => closeModal("cart")}
                onConfirm={() => navigate("/cart")}
                value="view cart"
              />
              <Modal
                isOpen={isModalOpen.login}
                message="Kamu belum login nih,login dulu yuk!"
                onClose={() => closeModal("login")}
                onConfirm={() => navigate("/login")}
                value="login"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
