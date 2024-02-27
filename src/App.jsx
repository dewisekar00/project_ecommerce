import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Navbar from "./components/Navbar";
import ProductCard from "./components/ProductCard";
import Sidebar from "./components/Sidebar";
import { fetchProductsData } from "./config/redux/Slice/productsSlice";
import { useEffect } from "react";
import { fetchAddCart } from "./config/redux/Slice/addCart";
import NavMobile from "./components/NavMobile";

function App() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const status = useSelector((state) => state.products.status);
  console.log(status);
  const searchResult = useSelector((state) => state.searchResultSlice);

  useEffect(() => {
    dispatch(fetchProductsData({ category: "", categoryName: "" }));
  }, [dispatch]);

  const handleAddToCart = (id) => {
    dispatch(fetchAddCart(id));
  };

  return (
    <>
      <Navbar />
      <div className="grid grid-cols-12 mt-8 ">
        <div className="sm:col-span-3 col-span-12 mb-20   ">
          <div className="hidden lg:block">
            <Sidebar />
          </div>
          <div className="block lg:hidden text-center ">
            <NavMobile />
          </div>
        </div>

        <div className="sm:col-span-9 col-span-12 ">
          {status === "loading" && (
            <div className="flex justify-center items-center">
              <span className="loading loading-spinner loading-lg  "></span>
            </div>
          )}
          <div className="flex justify-center gap-4 flex-wrap">
            {/* kalo data hasil dari searchResult dari redux itu lebih dari 0  maka tampilkan tapi kalo datanya itu 0 maka tidak ditampilkan hasil resultnya*/}
            {searchResult && searchResult.length > 0
              ? searchResult.map((product) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    image={product.image}
                    title={product.title}
                    price={product.price}
                    handleAddToCart={handleAddToCart}
                  />
                ))
              : products.map((product) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    image={product.image}
                    title={product.title}
                    price={product.price}
                    handleAddToCart={handleAddToCart}
                  />
                ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
