import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import authSlice from "./features/auth/authSlice";
import pageSlice from "./features/page/pageSlice";
import uiSlice from "./features/ui/uiSlice";
import userManagementSlice from "./features/user/userManagementSlice";
const store = configureStore({
  reducer: {
    auth: authSlice,
    userManagement: userManagementSlice,
    ui: uiSlice,
    page: pageSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;
