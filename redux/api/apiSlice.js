import { devConfigs } from "@/app.config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: devConfigs.API_HOST,
  // mode: "no-cors",
  prepareHeaders: async (headers, { getState, endpoint }) => {
    let { auth, user } = getState();
    const deviceKey = auth?.bindInfo?.dhKey;
    if (deviceKey) {
      headers.set("device", deviceKey);
    }
    if (user) {
      headers.set("user", user?._id);
    }
    headers.set("Access-Control-Allow-Origin", "*");
    headers.set("source", "admin.lulu.com");
    headers.set("device", "64089706a9bf3ff7f82b8f11");
    headers.set("user", "6408b330f3c3f122108602c7");
    headers.set("session", "6408b330f3c3f122108602ca");
    //   const token = getState()?.auth?.accessToken
    //   if (token) {
    //     headers.set('Authorization', `Bearer ${token}`)
    //   }
    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result?.error?.status === 401) {
      // api.dispatch(userLoggedOut())
      // localStorage.clear()
    }
    return result;
  },
  tagTypes: [
    "user",
    "users",
    "streams",
    "gift-items",
    "agencies",
    "agency-categories",
    "badges",
    "badge-categories",
    "levels",
  ],
  endpoints: (builder) => ({}),
});
