import { apiSlice } from "../../api/apiSlice";
import { setQueryParams } from "../page/pageSlice";

export const badgeCategoryAPI = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getBadgeCategories: build.query({
      query: ({ pkPower, price, page, limit }) => {
        let url = "/badge-category/all";
        let queries = [];
        // if (pkPower) {
        //   queries.push(`pkPower_like=${pkPower}`);
        // }
        // if (price) {
        //   queries.push(`price=${price}`);
        // }
        if (page) {
          queries.push(`page=${page}`);
        }
        if (limit) {
          queries.push(`limit=${limit}`);
        }
        url += queries.join("&");

        return {
          url,
          method: "GET",
        };
      },
      providesTags: ["badge-categories"],
      transformResponse: (res) => {
        return res.data.badgeCategories;
      },
      onQueryStarted: async (queryParams, { dispatch, queryFulfilled }) => {
        let { data } = await queryFulfilled;
        dispatch(setQueryParams(data.meta));
      },
    }),
    createBadgeCategory: build.mutation({
      query: (body) => {
        return {
          url: "/badge-category/create",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["badge-categories"],
    }),
    updateBadgeCategory: build.mutation({
      query: ({ id, data }) => {
        return {
          url: "/badge-category/update/" + id,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["badge-categories"],
    }),
    deleteBadgeCategory: build.mutation({
      query: (id) => {
        return {
          url: "/badge-category/delete/" + id,
          method: "DELETE",
        };
      },
      invalidatesTags: ["badge-categories"],
    }),
  }),
});

export const {
  useCreateBadgeCategoryMutation,
  useDeleteBadgeCategoryMutation,
  useGetBadgeCategoriesQuery,
  useUpdateBadgeCategoryMutation,
} = badgeCategoryAPI;
