/// src/context/StoreContextProvider.jsx
import React, { useEffect, useState } from "react";
import { StoreContext } from "../StoreContext";
import axios from "axios";

const StoreContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});
  const url = import.meta.env.VITE_API_URL
  console.log("API URL:", url);
  const [token, setToken] = useState("")
  const [menuList, setMenuList] = useState([])
  if (!cartItems) setCartItems({});
  const addToCart = async (itemId) => {

    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1
    }));
    if (token) {
      await axios.post(url + "/api/v1/addtoCart", { itemId }, { headers: { token } })
    }

  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => {
      const newCart = { ...prev };
      if (newCart[itemId] > 1) {
        newCart[itemId] -= 1;
      } else {
        delete newCart[itemId]; // THIS IS THE KEY: DELETE WHEN 0
      }
      return newCart;

    });
    if (token) {
      await axios.post(url + "/api/v1/removeCart", { itemId }, { headers: { token } })
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      if (cartItems[items] > 0) {
        let itemInFo = menuList.find((product) => product._id === items);
        totalAmount += itemInFo.price * cartItems[items];
      }

    }
    return totalAmount;
  }
  const fetchFoodList = async () => {
    const response = await axios.get(url + "/api/v1/list")
    setMenuList(response.data.data)
  }

  const localCartData = async (token) => {
    const response = await axios.post(url + "/api/v1/get", {}, { headers: { token } })
    setCartItems(response.data.cartData)
  }

  useEffect(() => {

    async function loadData() {
      await fetchFoodList();
      const token = localStorage.getItem("token")

      if (token) {
        setToken(token)
        await localCartData(token)
      }

    }
    loadData()
  }, [])

  return (
    <StoreContext.Provider value={{
      menuList,
      cartItems,
      addToCart,
      removeFromCart,
      getTotalCartAmount,
      url,
      token,
      setToken
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;