import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  datas: [],
  visibleOrders: [],
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setAllOrderData: (state, action) => {
      state.datas = action.payload;

      state.visibleOrders = action.payload.slice(0, 10);
    },

    setOrderData: (state, action) => {
      const start = action.payload.start;
      const end = action.payload.end;

      state.visibleOrders = state.datas.slice(start, end);
    },

    filterProductsByAlphabetic: (state, action) => {
      const filterName = action.payload.name;
      const itemsPerPgae = action.payload.itemsPerPage;

      if (filterName === "1 - 31 🡩") {
        const filteredAlpabeticProducts = state.datas.sort(
          (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime()
        );
        state.datas = filteredAlpabeticProducts;

        state.visibleOrders = filteredAlpabeticProducts.slice(0, itemsPerPgae);
      } else {
        const filteredAlpabeticProducts = state.datas.sort(
          (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
        );
        state.datas = filteredAlpabeticProducts;

        state.visibleOrders = filteredAlpabeticProducts.slice(0, itemsPerPgae);
      }
    },
  },
});

export const { setOrderData, filterProductsByAlphabetic, setAllOrderData } =
  orderSlice.actions;

export default orderSlice.reducer;
