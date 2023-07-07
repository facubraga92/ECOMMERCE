import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { setProductsRedux } from "../state/products";
import { useDispatch } from "react-redux";
import axios from "axios";
const Search = () => {
  const [filteredSearch, setFilteredSeacrh] = useState(null);
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const fetchSearch = async () => {
    try {
      let url = "http://localhost:3000/api/products/";

      if (filteredSearch) {
        url = `http://localhost:3000/api/products/search/${filteredSearch}`;
      }

      const response = await axios.get(url);
      const sortedProducts = response.data.sort((a, b) => a.id - b.id);

      dispatch(setProductsRedux(sortedProducts));
    } catch (error) {
      console.log("Error al obtener los productos:", error);
    }
  };

  useEffect(() => {
    const sortedProducts = [...products].sort((a, b) => a.id - b.id);
    dispatch(setProductsRedux(sortedProducts));
  }, []);

  const handleFilter = (e) => {
    setFilteredSeacrh(e.target.value);
  };

  useEffect(() => {
    fetchSearch();
  }, [filteredSearch]);

  return (
    <>
    <div className="relative mb-2 flex w-64">
      <input
        type="search"
        className="relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
        placeholder="Buscar"
        aria-label="Search"
        aria-describedby="button-addon1"
        onChange={handleFilter}
      />
    </div>
  </>
  
  );
};

export default Search;
