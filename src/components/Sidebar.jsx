import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { fetchProductsData } from '../config/redux/Slice/productsSlice';

const Sidebar = React.memo(() => {
 const dispatch = useDispatch();

 const handleClick = useCallback((category, categoryName) => {
    dispatch(fetchProductsData({ category, categoryName }));
 }, [dispatch]);

 const categories = [
    { name: "All Products", value: "" },
    { name: "Women Fashion", value: "women's clothing" },
    { name: "Men Fashion", value: "men's clothing" },
    { name: "Electronic", value: "electronics" },
    { name: "Jewelery", value: "jewelery" },
 ];

 return (
    <div className="ml-14 fixed">
      <h2 className="font-bold mb-4">Category</h2>
      <div>
        {categories.map((category, index) => (
          <div key={index} className="mb-4 cursor-pointer">
            <span className="label-text hover:text-slate-500" onClick={() => handleClick(category.value ? 'category' : '', category.value)}>
              {category.name}
            </span>
          </div>
        ))}
      </div>
    </div>
 );
});

export default Sidebar;
