import { queryMaker } from "@/app/utils";
import { apiSlice } from "../../api/apiSlice";
import { setQueryParams } from "../page/pageSlice";

export const agencyCategoryAPI = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getAgencyCategories: build.query({
      query: (payload) => {
        const queryStr = queryMaker(payload);
        let url = "/agency-category/all" + queryStr;
        return {
          url,
          method: "GET",
        };
      },
      providesTags: ["agency-categories"],
      transformResponse: (res) => {
        return res.data.agencyCategories;
      },
      onQueryStarted: async (queryParams, { dispatch, queryFulfilled }) => {
        let { data } = await queryFulfilled;
        dispatch(setQueryParams(data.meta));
      },
    }),
    createAgencyCategory: build.mutation({
      query: (body) => {
        return {
          url: "/agency-category/create",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["agency-categories"],
    }),
    updateAgencyCategory: build.mutation({
      query: ({ id, data }) => {
        return {
          url: "/agency-category/update/" + id,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["agency-categories"],
    }),
    deleteAgencyCategory: build.mutation({
      query: (id) => {
        return {
          url: "/agency-category/delete/" + id,
          method: "DELETE",
        };
      },
      invalidatesTags: ["agency-categories"],
    }),
  }),
});

export const {
  useCreateAgencyCategoryMutation,
  useDeleteAgencyCategoryMutation,
  useGetAgencyCategoriesQuery,
  useUpdateAgencyCategoryMutation,
} = agencyCategoryAPI;
