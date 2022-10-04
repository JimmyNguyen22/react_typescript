import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { http } from "../../util/setting";
import { AppDispatch } from "../configStore";

export interface Product {
  id: number;
  name: string;
  alias: string;
  price: number;
  description: string;
  size: string;
  shortDescription: string;
  quantity: number;
  deleted: boolean;
  categories: string;
  relatedProducts: string;
  feature: boolean;
  image: string;
}

export interface ProductState {
  arrProduct: Product[];
}

const initialState: ProductState = {
  arrProduct: [],
};

const productReducer = createSlice({
  name: "productReducer",
  initialState,
  reducers: {
    getProductAction: (
      state: ProductState,
      action: PayloadAction<Product[]>
    ) => {
      state.arrProduct = action.payload;
    },
  },
});

export const { getProductAction } = productReducer.actions;

export default productReducer.reducer;

// api

export const getAllProductApi = () => {
  return async (dispatch: AppDispatch,getState:any) => {
    try {
      //Hiển thị loading
      const result = await http.get("/product");
      // sau khi lấy dữ liệu gửi từ api về => đưa lên redux
      const action = getProductAction(result.data.content);
      dispatch(action);
      //Tắt loading
      //không sử dụng được history (6.4)
      console.log(getState());
    } catch (err) {
      console.log({ err });
    }
  };
};
