import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  datas: [],
  visibleOffers: [],
};

const offerSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setAllOfferData: (state, action) => {
      state.datas = action.payload;

      state.visibleOffers = action.payload.slice(0, 6);
    },
    setOfferData: (state, action) => {
      const start = action.payload.start;
      const end = action.payload.end;

      state.visibleOffers = state.datas.slice(start, end);
    },
    filterProductsByAlphabetic: (state, action) => {
      const filterName = action.payload.name;
      const itemsPerPgae = action.payload.itemsPerPage;

      if (filterName === "A-Z") {
        const filteredAlpabeticProducts = state.datas.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        state.datas = filteredAlpabeticProducts;

        state.visibleOffers = filteredAlpabeticProducts.slice(0, itemsPerPgae);
      } else {
        const filteredAlpabeticProducts = state.datas
          .sort((a, b) => a.name.localeCompare(b.name))
          .reverse();

        state.datas = filteredAlpabeticProducts;

        state.visibleOffers = filteredAlpabeticProducts.slice(0, itemsPerPgae);
      }
    },
  },
});

export const { setOfferData, filterProductsByAlphabetic, setAllOfferData } =
  offerSlice.actions;

export default offerSlice.reducer;
