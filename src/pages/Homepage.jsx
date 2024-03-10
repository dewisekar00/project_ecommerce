import React, { useCallback, useEffect, useMemo } from "react";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import Sidebar from "../components/Sidebar";
import { fetchProductsData } from "../config/redux/Slice/productsSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchAddCart } from "../config/redux/Slice/addCart";
import NavMobile from "../components/NavMobile";
import { fetchDetailProduct } from "../config/redux/Slice/detailProduct";
import { loadDataFromCache } from "../config/redux/Slice/productsSlice";

const Homepage = () => {
 const dispatch = useDispatch();
 const products = useSelector((state) => state.products.products);
 const status = useSelector((state) => state.products.status);
 const searchResult = useSelector((state) => state.searchResultSlice);

 useEffect(() => {
    const cachedData = loadDataFromCache();
    if (!cachedData) {
      dispatch(fetchProductsData({ category: "", categoryName: "" }));
    }
 }, [dispatch]);

 const handleAddToCart = useCallback((id) => {
    dispatch(fetchAddCart(id));
 }, [dispatch]);

 const handleDetailProduct = useCallback((id) => {
    dispatch(fetchDetailProduct(id));
 }, [dispatch]);

 const renderProducts = useMemo(() => {
    const dataToRender = searchResult && searchResult.length > 0 ? searchResult : products;
    return dataToRender.map((product) => (
      <ProductCard
        key={product.id}
        id={product.id}
        image={product.image}
        title={product.title}
        price={product.price}
        handleAddToCart={handleAddToCart}
        handleDetailProduct={handleDetailProduct}
      />
    ));
 }, [products, searchResult, handleAddToCart, handleDetailProduct]);

 return (
    <>
      <Navbar />
      <div className="grid grid-cols-12 mt-8 ">
        <div className="sm:col-span-3 col-span-12 mb-16">
          <div className="hidden lg:block">
            <Sidebar />
          </div>
          <div className="block lg:hidden text-center">
            <NavMobile />
          </div>
        </div>

        <div className="sm:col-span-9 col-span-12">
          {status === "loading" && (
            <div className="flex justify-center items-center">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          )}
          <div className="flex justify-center gap-4 flex-wrap">
            {renderProducts}
          </div>
        </div>
      </div>
    </>
 );
};

export default Homepage;
