import { SESSION, USER } from "@/constants/variables";
import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { LocalDB_ClearAll, LocalDB_SaveData } from "../../../utils/LocalDB";

const initialState = {
  isAuthenticated: false,
  user: null,
  session: null,
  error: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.user = payload;
      LocalDB_SaveData(USER, payload);
    },
    setSession: (state, { payload }) => {
      LocalDB_SaveData(SESSION, payload);
      state.session = payload;
    },
    setIsAuthenticated: (state, { payload }) => {
      state.isAuthenticated = payload;
    },
    logout: (state) => {
      LocalDB_ClearAll();
      return initialState;
    },
  },
});

export default authSlice.reducer;
export const { setUser, setSession, logout, setIsAuthenticated } =
  authSlice.actions;
export const useAuthState = () => useSelector((state) => state.auth);
