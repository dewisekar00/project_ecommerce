import React from "react";
import { useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

const DetailPost = () => {
  const navigate = useNavigate();

  const detailProduct = useSelector(
    (state) => state.detailProduct.detailProduct
  );
  const status = useSelector((state) => state.detailProduct.status);
  console.log(status);
  console.log(detailProduct);
  const handleBack = () => {
    navigate("/");
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
          className="material-symbols-outlined bg-black text-white rounded-full p-2 cursor-pointer mb-8 "
          onClick={handleBack}
        >
          arrow_back
        </span>

        {detailProduct.map((product) => (
          <div key={product.id} className="  sm:grid grid-cols-12 sm:gap-32 sm:mt-12 ">
            <div className="flex justify-center sm:col-span-5">
              <img src={product.image} alt={product.title} className="h-64 sm:mt-8" />
            </div>

            <div className="sm:col-span-5 ">
              <h1 className="text-3xl my-4 font-bold">{product.price} $</h1>
              <h2 className="my-4 text-2xl font-semibold">{product.title}</h2>
              <p>{product.description}</p>

              <button className="bg-black text-white px-28 text-xl rounded-xl py-2  my-8">
                Add to cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default DetailPost;
