import { createSlice } from "@reduxjs/toolkit";
import { ProductProps } from "../../type";

interface StoreState {
  productData: ProductProps[];
}

const initialState: StoreState = {
  // an array of product data
  productData: [],
};

// exporting this page with createSlice from redux toolkit to use its functionalities
export const orebiSlice = createSlice({
  name: "orebi",
  // accesing the upward created initialState
  initialState,
  reducers: {
    addToCart: (state, action) => {
      //If existing product exits in cart it increases its quantity otherwise adds it in the cart in else condition
      const existingProduct = state?.productData.find((item: ProductProps) => {
        item?._id === action?.payload?._id;
      });
      if (existingProduct) {
        existingProduct.quantity += action.payload.quantity;
      } else {
        state.productData.push(action.payload);
      }
    },

    // HERE I INCREASE PRODUCT QUANTITY
    increaseQuantity: (state, action) => {
      const existingProduct = state.productData.find(
        (item: ProductProps) => item._id === action.payload._id
      );
      existingProduct && existingProduct.quantity++;
    },

    // HERE I DECREASE PRODUCT QUANTITY
    decreaseQuantity: (state, action) => {
      const existingProduct = state.productData.find(
        (item: ProductProps) => item._id === action.payload._id
      );
      if (existingProduct?.quantity === 1) {
        existingProduct.quantity === 1;
      } else {
        existingProduct && existingProduct.quantity--;
      }
    },

    // HERE I DELETE A PRODUCT
    deleteProduct: (state, action) => {
      state.productData = state.productData.filter(
        (item) => item._id !== action.payload
      );
    },

    // HERE I RESET THE WHOLE CART
    resetCart: (state) => {
      state.productData = [];
    },
  },
});

// here i export all the created actions
export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  deleteProduct,
  resetCart,
} = orebiSlice.actions;
export default orebiSlice.reducer;
