import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchAddCart } from "../config/redux/Slice/addCart";
import { fetchDetailProduct } from "../config/redux/Slice/detailProduct";
import Modal from "../components/Modal";

const DetailProduct = () => {
  const [isModalOpen, setIsModalOpen] = useState({ login: false, inCart: false, toCart: false });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {id} = useParams();
  const detailProduct = useSelector(
    (state) => state.detailProduct.detailProduct
  );
  // console.log('detailProduct test:', detailProduct)
  const products = useSelector((state) => state.addCart.addCart);
  const status = useSelector((state) => state.detailProduct.status);
 
   
useEffect(() => {
  dispatch(fetchDetailProduct(id))
}, [dispatch, id])


  const handleAddToCart = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsModalOpen({...isModalOpen, login: true})
    
    }else {
          // Cek apakah produk sudah ada di keranjang belanja
    const isProductExist = products.some((product) => product.id === detailProduct.id);
    if (isProductExist) {
     setIsModalOpen({...isModalOpen, inCart: true})
    } else {
      // Jika belum ada, tambahkan produk ke keranjang belanja
      dispatch(fetchAddCart(detailProduct.id));
      setIsModalOpen({...isModalOpen, toCart: true})
    }
    }
  };

  const closeModal = useCallback(
    (modalType) => {
      setIsModalOpen({ ...isModalOpen, [modalType]: false });
    },
    [isModalOpen]
  );


  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }



  return (
    <>
      <div className="p-8 ">
        <span
          className="material-symbols-outlined bg-green-300  text-white rounded-full p-2 cursor-pointer mb-8 "
          onClick={() =>  navigate("/")}
        >
          arrow_back
        </span>

        <div
          key={detailProduct.id}
          className="  sm:grid grid-cols-12 sm:gap-32 sm:mt-12 "
        >
          <div className="flex justify-center sm:col-span-5">
            <img
              src={detailProduct.image}
              alt={detailProduct.title}
              className="h-64 sm:mt-8"
            />
          </div>

          <div className="sm:col-span-5 ">
            <h1 className="text-3xl my-4 font-bold">{detailProduct.price} $</h1>
            <h2 className="my-4 text-xl font-semibold">
              {detailProduct.title}
            </h2>

            <p className="text-sm">{detailProduct.description}</p>

            <button
              className="bg-green-300 text-white w-full text-lg rounded-3xl py-3  my-8 hover:bg-slate-400"
              onClick={() => handleAddToCart(detailProduct.id)}
            >
              Add to cart
            </button>
            <Modal
                isOpen={isModalOpen.inCart}
                message="The product is already in the cart!"
                onClose={() => closeModal("inCart")}
                onConfirm={() => navigate("/cart")}
                value="view cart"
              />
            <Modal
                isOpen={isModalOpen.toCart}
                message="successed add product"
                onClose={() => closeModal("toCart")}
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
    </>
  );
};

export default DetailProduct;
