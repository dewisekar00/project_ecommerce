import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchResults } from "../config/redux/Slice/searchResultSlice";

const SearchingProduct = () => {
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);

  // ini akan dijalankan secara otomatis ketika input value kosong
  useEffect(() => {
    // Periksa apakah nilai input kosong
    if (searchValue.trim() === "") {
      dispatch(setSearchResults(null)); // Jika ya, kirim null ke Redux
    }
  }, [searchValue, dispatch]);

  const handleSearch = (event) => {
    event.preventDefault();

    // Tambahkan kondisi untuk menangani searchValue kosong
    if (searchValue.trim() !== "") {
      let filteredProducts = products.filter(
        (product) =>
          product.title.toLowerCase().includes(searchValue.toLowerCase()) ||
          product.category.toLowerCase().includes(searchValue.toLowerCase())
      );
      dispatch(setSearchResults(filteredProducts));
    }
  };

  const handleChange = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <form onSubmit={handleSearch}>
      <label className="input input-bordered flex items-center gap-2">
        <input
          type="text"
          className="grow"
          placeholder="Search"
          value={searchValue}
          onChange={handleChange}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="w-4 h-4 opacity-70"
        >
          <path
            fillRule="evenodd"
            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            clipRule="evenodd"
          />
        </svg>
      </label>
    </form>
  );
};

export default SearchingProduct;

// buat kondisi if(searchValue === " ") --> kirim data null ke redux
