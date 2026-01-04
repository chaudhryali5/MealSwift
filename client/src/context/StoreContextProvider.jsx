/// src/context/StoreContextProvider.jsx
import React, { useEffect, useState } from "react";
import { StoreContext } from "../StoreContext";
import axios from "axios";

const StoreContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem("cartItems");
      return saved ? JSON.parse(saved) : {};
    } catch (error) {
      console.error("Error parsing cartItems from localStorage", error);
      return {};
    }
  });
  const url = import.meta.env.VITE_API_URL
  const [token, setToken] = useState("")
  const [menuList, setMenuList] = useState([])



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
        delete newCart[itemId];
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
        if (itemInFo) {
          totalAmount += itemInFo.price * cartItems[items];
        }
      }

    }
    return totalAmount;
  }
  const fetchFoodList = async () => {
    const response = await axios.get(url + "/api/v1/list")
    // console.log(response.data.data)
    setMenuList(response.data.data || [])
  }

  const localCartData = async (token) => {
    const response = await axios.post(url + "/api/v1/get", {}, { headers: { token } })
    setCartItems(response.data.cartData || {})
  }

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      const token = localStorage.getItem("token")
      if (token) {
        setToken(token)
        await localCartData(token)
      } else {
        const savedCart = localStorage.getItem("cartItems");
        if (savedCart) {
          setCartItems(JSON.parse(savedCart));
        }
      }
    }
    loadData()
  }, [])

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems])

  return (
    <StoreContext.Provider value={{
      menuList: menuList || [],
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