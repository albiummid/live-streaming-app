import { apiSlice } from "../../api/apiSlice";
import { setIsAuthenticated, setSession, setUser } from "./authSlice";

export const AuthAPI = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    loginRegular: build.mutation({
      query: (data) => {
        return {
          url: "/auth/login/regular",
          method: "POST",
          body: data,
        };
      },

      onQueryStarted: async (queryParams, { dispatch, queryFulfilled }) => {
        try {
          let { data } = await queryFulfilled;
          dispatch(setIsAuthenticated(true));
          dispatch(setUser(data.data.user));
          dispatch(setSession(data.data.session));
        } catch (err) {}
      },
    }),
    registerRegular: build.mutation({
      query: (data) => {
        return {
          url: "/auth/register/regular",
          method: "POST",
          body: data,
        };
      },
    }),
    loginSocial: build.mutation({
      query: (body) => {
        return {
          url: "/auth/social-login",
          method: "POST",
          body,
        };
      },
      transformResponse: async (res) => {
        return res.data;
      },
      onQueryStarted: async (queryParams, { dispatch, queryFulfilled }) => {
        try {
          let { data } = await queryFulfilled;
          dispatch(setIsAuthenticated(true));
          dispatch(setUser(data.user));
          dispatch(setSession(data.session));
        } catch (err) {}
      },
    }),
  }),
});

export const {
  useLoginRegularMutation,
  useRegisterRegularMutation,
  useLoginSocialMutation,
} = AuthAPI;
