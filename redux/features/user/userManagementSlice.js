import { useSelector } from "react-redux";

const { createSlice } = require("@reduxjs/toolkit");

const userManagementSlice = createSlice({
  name: "userManagement",
  initialState: {
    isDrawerOpen: false,
    drawerStatus: "", //"CREATE"||"UPDATE"
    searchOption: "",
    searchStr: "",
    filterOption: "",
    currentUser: null,
  },
  reducers: {
    setIsDrawerOpen: (state, { payload }) => {
      state.isDrawerOpen = payload;
    },
    setDrawerStatus: (state, { payload }) => {
      state.drawerStatus = payload;
    },
    setSearchOption: (state, { payload }) => {
      state.searchOption = payload;
    },
    setSearchStr: (state, { payload }) => {
      state.searchStr = payload;
    },
    setFilterOption: (state, { payload }) => {
      state.filterOption = payload;
    },
    setCurrentUser: (state, { payload }) => {
      state.currentUser = payload;
    },
  },
});

export const DrawerStatusEnums = {
  CREATE: "CREATE",
  UPDATE: "UPDATE",
};
export const {
  setFilterOption,
  setIsDrawerOpen,
  setDrawerStatus,
  setSearchOption,
  setSearchStr,
  setCurrentUser,
} = userManagementSlice.actions;
export const useUserManagementState = () =>
  useSelector((state) => state.userManagement);

export default userManagementSlice.reducer;
