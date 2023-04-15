import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const pageSlice = createSlice({
  name: "page",
  initialState: {
    page: 1,
    totalPage: 0,
    limit: 10,
    filterCount: 0,
    totalCount: 0,
    skipQuery: false,
    searchKey: "",
    searchKeyword: "",
    currentData: null,
  },
  reducers: {
    setQueryParams: (state, { payload }) => {
      return {
        ...state,
        ...payload,
      };
    },
    setPage: (state, { payload }) => {
      state.page = payload;
    },
    setLimit: (state, { payload }) => {
      state.page = 1;
      state.limit = payload;
    },
    setSkipQuery: (state, { payload }) => {
      state.skipQuery = payload;
    },
    setSearchKey: (state, { payload }) => {
      if (!payload) {
        state.searchKeyword = "";
      }
      state.searchKey = payload;
    },
    setSearchKeyword: (state, { payload }) => {
      state.searchKeyword = payload;
    },
    setCurrentData: (state, { payload }) => {
      state.currentData = payload;
    },
  },
});

export const usePageState = () => useSelector((state) => state.page);
export const {
  setLimit,
  setPage,
  setQueryParams,
  setSkipQuery,
  setSearchKey,
  setSearchKeyword,
  setCurrentData,
} = pageSlice.actions;
export default pageSlice.reducer;
