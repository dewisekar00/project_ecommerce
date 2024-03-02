import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProductCart = () => {
  const products = useSelector((state) => state.addCart.addCart);
  const navigate = useNavigate();
  const [counts, setCounts] = useState(() => products.map(() => 1));
  const [isChecked, setIsChecked] = useState(() => products.map(() => false));
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  const handleBack = () => {
    navigate("/");
  };

  const handleCheckboxChange = (index) => {
    const newIsChecked = [...isChecked];
    newIsChecked[index] = !newIsChecked[index];
    setIsChecked(newIsChecked);
    updateTotalPrice();
  };

  const increment = (index) => {
    const newCounts = [...counts];
    newCounts[index] += 1;
    setCounts(newCounts);
    updateTotalPrice();
  };

  const decrement = (index) => {
    const newCounts = [...counts];
    if (newCounts[index] > 1) {
      newCounts[index] -= 1;
      setCounts(newCounts);
      updateTotalPrice();
    }
  };

  const updateTotalPrice = () => {
    let total = 0;
    let items = 0;
    products.forEach((product, index) => {
      if (isChecked[index]) {
        total += product.price * counts[index];
        items += counts[index];
      }
    });
    setTotalPrice(total.toFixed(2));
    setTotalItems(items);
  };

  useEffect(() => {
    updateTotalPrice();
  }, [products, counts, isChecked]);

  return (
    <>
      <span
        className="material-symbols-outlined bg-green-300 text-white rounded-full p-2 cursor-pointer m-4"
        onClick={handleBack}
      >
        arrow_back
      </span>
      <div className="mb-24">
        {products.length === 0 ? (
          <p className="text-green-400 font-semibold text-center pt-32 ">
            Cart is empty,lets go shopping!
          </p>
        ) : (
          products.map((product, index) => (
            <div key={index} className="py-2 px-4 ">
              <div className="border border-gray-200 w-full md:w-4/12 h-28 p-2  grid grid-cols-12 rounded-lg">
                <div className="flex col-span-5">
                  <div className="flex items-center mr-2">
                    <input
                      type="checkbox"
                      checked={isChecked[index]}
                      onChange={() => handleCheckboxChange(index)}
                      className="checkbox"
                    />
                  </div>
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-20 h-24 object-cover rounded-xl"
                  />
                </div>
                <div className="col-span-7 pl-4 flex flex-col justify-between">
                  <h1 className="font-semibold text-sm ">
                    {product.title.length > 40
                      ? `${product.title.slice(0, 40)}...`
                      : product.title}
                  </h1>
                  <div className="flex items-end justify-between">
                    <p className="text-xl text-green-400">
                      {(product.price * counts[index]).toFixed(2)} $
                    </p>
                    <div className="flex text-xl gap-4 cursor-pointer">
                      <p onClick={() => decrement(index)}>-</p>
                      <p>{counts[index]}</p>
                      <p onClick={() => increment(index)}>+</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {products.length > 0 && (
        <div className="bg-green-300  w-full h-24 fixed bottom-0 inset-x-0 grid grid-cols-12 flex items-center ">
          <div className="col-span-7 pl-4">
            <p className="text-sm">Total Price for {totalItems} items</p>
            <p className="text-xl text-green-600 font-bold mt-2 ">
              {totalPrice} $
            </p>
          </div>
          <button className="btn bg-green-600 border-none text-white font-bold  col-span-4">
            Checkout
          </button>
        </div>
      )}
    </>
  );
};

export default ProductCart;

// ketika action berjalan maka data akan tersimpan di redux baru digunakan disiini
