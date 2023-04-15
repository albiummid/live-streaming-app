import { queryMaker } from "@/app/utils";
import { apiSlice } from "../../api/apiSlice";
import { setQueryParams } from "../page/pageSlice";

export const userAPI = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query({
      query: (payload) => {
        const queryStr = queryMaker(payload);
        console.log(queryStr, "l");
        let URL = `/user/all` + queryStr;
        return {
          url: URL,
          method: "GET",
        };
      },
      providesTags: ["users"],
      transformResponse: (res) => {
        return res.data;
      },
      onQueryStarted: async (queryParams, { dispatch, queryFulfilled }) => {
        let { data } = await queryFulfilled;
        dispatch(setQueryParams(data.meta));
      },
    }),
    createUser: build.mutation({
      query: (body) => {
        return {
          url: "/auth/register/regular",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["users"],
    }),
    updateUser: build.mutation({
      query: ({ id, data }) => {
        return {
          url: "/user/update/" + id,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["users"],
    }),
    deleteUser: build.mutation({
      query: (id) => {
        return {
          url: "/user/delete/" + id,
          method: "DELETE",
        };
      },
      invalidatesTags: ["users"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userAPI;
