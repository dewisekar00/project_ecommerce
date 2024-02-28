import React from "react";
import { useDispatch } from "react-redux";
import { fetchAddCart } from "../config/redux/Slice/addCart";
import { useNavigate } from "react-router-dom";
import { fetchDetailProduct } from "../config/redux/Slice/detailProduct";

const ProductCard = (props) => {
  const { id, image, title, price } = props;

  const dispatch = useDispatch();
  const handleAddToCart = () => {
    dispatch(fetchAddCart(id));
  };

  const navigate = useNavigate();

  const toDetailProduct = () => {
    navigate("/detail-product");
    dispatch(fetchDetailProduct(id));
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
              className="btn bg-black text-white text-xs btn-sm"
              onClick={handleAddToCart}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
