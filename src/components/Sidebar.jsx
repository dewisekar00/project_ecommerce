import React from 'react';
import { useDispatch } from 'react-redux';
import { fetchProductsData } from '../config/redux/Slice/productsSlice';

const Sidebar = () => {
  const dispatch = useDispatch();
// filter product
  const handleClick = (category, categoryName) => {
    // call reducer
    dispatch(fetchProductsData({ category, categoryName }));
  };

  return (
    <div className=" ml-14 fixed">
      <h2 className="font-bold mb-4">category</h2>
      <div>
        <div className=" mb-4 cursor-pointer ">
          <span className="label-text hover:text-slate-500" onClick={() => handleClick('', " ")}>
         All Products
          </span>
        </div>
        <div className=" mb-4 cursor-pointer">
          <span className="label-text hover:text-slate-500 " onClick={() => handleClick('category', "women's clothing")}>
            Women Fashion
          </span>
        </div>
        <div className=" mb-4 cursor-pointer">
          <span className="label-text hover:text-slate-500" onClick={() => handleClick('category', "men's clothing")}>
            Men Fashion
          </span>
        </div>
        <div className=" mb-4 cursor-pointer">
          <span className="label-text hover:text-slate-500" onClick={() => handleClick('category', 'electronics')}>
            Electronic
          </span>
        </div>
        <div className=" mb-4 cursor-pointer">
          <span className="label-text hover:text-slate-500" onClick={() => handleClick('category', 'jewelery')}>
            Jewelery
          </span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
