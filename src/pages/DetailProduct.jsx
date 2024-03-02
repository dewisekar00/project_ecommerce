import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchAddCart } from "../config/redux/Slice/addCart";
import { fetchDetailProduct } from "../config/redux/Slice/detailProduct";
const DetailProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {id} = useParams();
  const detailProduct = useSelector(
    (state) => state.detailProduct.detailProduct
  );
  console.log('detailProduct test:', detailProduct)
  const products = useSelector((state) => state.addCart.addCart);
  const status = useSelector((state) => state.detailProduct.status);

useEffect(() => {
  dispatch(fetchDetailProduct(id))
}, [dispatch, id])
  const handleBack = () => {
    navigate("/");
  };
  const handleToCart = () => {
    navigate("/cart");
  };


  const handleAddToCart = () => {
    // Cek apakah produk sudah ada di keranjang belanja
    const isProductExist = products.some((product) => product.id === detailProduct.id);
    if (isProductExist) {
      document.getElementById("my_modal_2").showModal();
    } else {
      // Jika belum ada, tambahkan produk ke keranjang belanja
      dispatch(fetchAddCart(detailProduct.id));
      document.getElementById("my_modal_1").showModal();
    }
  };


  // Menampilkan loading saat status adalah "loading"
  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  // Menampilkan detail produk jika sudah tersedia
  return (
    <>
      <div className="p-8 ">
        <span
          className="material-symbols-outlined bg-green-300  text-white rounded-full p-2 cursor-pointer mb-8 "
          onClick={handleBack}
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

            <dialog id="my_modal_1" className="modal">
              <div className="modal-box">
                <h3 className="font-bold text-lg">succeed</h3>
                <p className="py-4">Product Successfully added!</p>
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
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailProduct;
