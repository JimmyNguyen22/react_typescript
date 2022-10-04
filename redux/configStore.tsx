import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./reducers/productReducer";

export const store = configureStore({
  reducer: {
    productReducer: productReducer,
    navigate: (state = null, action) => {
      switch (action.type) {
        case "navigate": {
          state = action.payload;
          return state;
        }
        default:
          return state;
      }
    },
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
