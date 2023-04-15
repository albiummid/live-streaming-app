import { useSelector } from "react-redux";

const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  modalOpened: false,
  modalType: "",
  drawerOpened: false,
  drawerType: "",
  drawerFor: "",
  searchKey: "",
  searchKeyword: "",
  currData: null,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setModalOpened: (state, { payload }) => {
      state.modalOpened = payload;
    },
    setModalType: (state, { payload }) => {
      state.modalType = payload;
    },
    setDrawerOpened: (state, { payload }) => {
      state.drawerOpened = payload;
    },
    setDrawerType: (state, { payload }) => {
      state.drawerType = payload;
    },
    setDrawerFor: (state, { payload }) => {
      state.drawerFor = payload;
    },
    setSearchKey: (state, { payload }) => {
      state.searchKey = payload;
    },
    setSearchKeyword: (state, { payload }) => {
      state.searchKeyword = payload;
    },
    setCurrData: (state, { payload }) => {
      state.currData = payload;
    },
    resetUIState: (state) => {
      return initialState;
    },
  },
});
export const drawerTypes = {
  CREATE: "CREATE",
  UPDATE: "UPDATE",
};
export const useUIState = () => useSelector((state) => state.ui);
export const {
  setDrawerOpened,
  setDrawerType,
  setDrawerFor,
  setModalOpened,
  setModalType,
  setSearchKey,
  setCurrData,
  setSearchKeyword,
  resetUIState,
} = uiSlice.actions;
export default uiSlice.reducer;
