import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  visibleProducts: [],
  filteredProducts: [],
};

const productsSlice = createSlice({
  name: "productsData",
  initialState,
  reducers: {
    setAllProducts: (state, action) => {
      state.products = action.payload;
      state.filteredProducts = action.payload;
      state.visibleProducts = action.payload.slice(0, 10);
    },

    setProductsData: (state, action) => {
      const start = action.payload.start;
      const end = action.payload.end;

      state.visibleProducts = state.filteredProducts.slice(start, end);
    },

    filterProductsByRestaurant: (state, action) => {
      const filterName = action.payload.name;

      if (
        filterName === "All" ||
        filterName === "Hamısı" ||
        filterName === "Tous"
      ) {
        state.filteredProducts = state.products;

        state.visibleProducts = state.products.slice(
          0,
          action.payload.itemsPerPage
        );
      } else {
        console.log(state.products);
        const filteredProducts = state.products.filter((product) =>
          product.restaurant.stringValue
            .toLocaleLowerCase()
            .includes(filterName.toLocaleLowerCase())
        );

        state.filteredProducts = filteredProducts;

        state.visibleProducts = filteredProducts.slice(
          0,
          action.payload.itemsPerPage
        );
      }
    },

    filterProductsByAlphabetic: (state, action) => {
      const filterName = action.payload.name;
      const itemsPerPgae = action.payload.itemsPerPage;

      if (filterName === "A-Z") {
        const filteredAlpabeticProducts = state.filteredProducts.sort((a, b) =>
          a.name.stringValue.localeCompare(b.name.stringValue)
        );
        state.filteredProducts = filteredAlpabeticProducts;

        state.visibleProducts = filteredAlpabeticProducts.slice(
          0,
          itemsPerPgae
        );
      } else {
        const filteredAlpabeticProducts = state.filteredProducts
          .sort((a, b) => a.name.stringValue.localeCompare(b.name.stringValue))
          .reverse();

        state.filteredProducts = filteredAlpabeticProducts;

        state.visibleProducts = filteredAlpabeticProducts.slice(
          0,
          itemsPerPgae
        );
      }
    },
  },
});

export const {
  setProductsData,
  setAllProducts,
  filterProductsByRestaurant,
  filterProductsByAlphabetic,
} = productsSlice.actions;

export default productsSlice.reducer;
