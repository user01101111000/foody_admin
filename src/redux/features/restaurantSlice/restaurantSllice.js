import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  filteredRestaurants: [],
  visibleRestaurants: [],
};

const restaurantSlice = createSlice({
  name: "restaurantData",
  initialState,
  reducers: {
    setAllRestaurantsData: (state, action) => {
      state.products = action.payload;
      state.filteredRestaurants = action.payload;
      state.visibleRestaurants = action.payload.slice(0, 10);
    },
    setRestaurantsData: (state, action) => {
      const start = action.payload.start;
      const end = action.payload.end;

      state.visibleRestaurants = state.filteredRestaurants.slice(start, end);
    },

    filterRestaurantsByCategory: (state, action) => {
      const filterName = action.payload.name;

      if (
        filterName === "All" ||
        filterName === "Hamısı" ||
        filterName === "Tous"
      ) {
        state.filteredRestaurants = state.products;

        state.visibleRestaurants = state.products.slice(
          0,
          action.payload.itemsPerPage
        );
      } else {
        const filteredRestaurants = state.products.filter((product) =>
          product.category.stringValue
            .toLocaleLowerCase()
            .includes(filterName.toLocaleLowerCase())
        );

        state.filteredRestaurants = filteredRestaurants;

        state.visibleRestaurants = filteredRestaurants.slice(
          0,
          action.payload.itemsPerPage
        );
      }
    },

    filterProductsByAlphabetic: (state, action) => {
      const filterName = action.payload.name;
      const itemsPerPgae = action.payload.itemsPerPage;

      if (filterName === "A-Z") {
        const filteredAlpabeticRestaurants = state.filteredRestaurants.sort(
          (a, b) => a.name.stringValue.localeCompare(b.name.stringValue)
        );
        state.filteredRestaurants = filteredAlpabeticRestaurants;

        state.visibleRestaurants = filteredAlpabeticRestaurants.slice(
          0,
          itemsPerPgae
        );
      } else {
        const filteredAlpabeticRestaurants = state.filteredRestaurants
          .sort((a, b) => a.name.stringValue.localeCompare(b.name.stringValue))
          .reverse();

        state.filteredRestaurants = filteredAlpabeticRestaurants;

        state.visibleRestaurants = filteredAlpabeticRestaurants.slice(
          0,
          itemsPerPgae
        );
      }
    },
  },
});

export const {
  setRestaurantsData,
  filterRestaurantsByCategory,
  filterProductsByAlphabetic,
  setAllRestaurantsData,
} = restaurantSlice.actions;

export default restaurantSlice.reducer;
