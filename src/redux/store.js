import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./features/productsSlice/productsSlice";
import restaurantReducer from "./features/restaurantSlice/restaurantSllice";
import categoryReducer from "./features/categorySlice/categorySlice";
import orderReducer from "./features/orderSlice/orderSlice";
import orderHReducer from "./features/orderHSlice/orderHSlice";
import offerReducer from "./features/offerSlice/offerSlice";
import navMenuReducer from "./features/navMenuSlice/navMenuSlice";

const store = configureStore({
  reducer: {
    productsReducer,
    restaurantReducer,
    categoryReducer,
    orderReducer,
    orderHReducer,
    offerReducer,
    navMenuReducer,
  },
});

export default store;
