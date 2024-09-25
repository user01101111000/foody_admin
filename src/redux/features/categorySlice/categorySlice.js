import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  datas: [],
  visibleCategory: [],
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setAllCategoryData: (state, action) => {
      state.datas = action.payload;

      state.visibleCategory = action.payload.slice(0, 5);
    },

    setCategoryData: (state, action) => {
      const start = action.payload.start;
      const end = action.payload.end;

      state.visibleCategory = state.datas.slice(start, end);
    },
    filterProductsByAlphabetic: (state, action) => {
      const filterName = action.payload.name;
      const itemsPerPgae = action.payload.itemsPerPage;

      if (filterName === "A-Z") {
        const filteredAlpabeticProducts = state.datas.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        state.datas = filteredAlpabeticProducts;

        state.visibleCategory = filteredAlpabeticProducts.slice(
          0,
          itemsPerPgae
        );
      } else {
        const filteredAlpabeticProducts = state.datas
          .sort((a, b) => a.name.localeCompare(b.name))
          .reverse();

        state.datas = filteredAlpabeticProducts;

        state.visibleCategory = filteredAlpabeticProducts.slice(
          0,
          itemsPerPgae
        );
      }
    },
  },
});

export const {
  setCategoryData,
  filterProductsByAlphabetic,
  setAllCategoryData,
} = categorySlice.actions;

export default categorySlice.reducer;
