import { apiSlice } from "../../api/apiSlice";
import { setQueryParams } from "../page/pageSlice";

export const badgeAPI = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getBadges: build.query({
      query: ({ pkPower, price, page, limit }) => {
        let url = "/badge/all";
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
      providesTags: ["badges"],
      transformResponse: (res) => {
        return res.data.badges;
      },
      onQueryStarted: async (queryParams, { dispatch, queryFulfilled }) => {
        let { data } = await queryFulfilled;
        dispatch(setQueryParams(data.meta));
      },
    }),
    createBadge: build.mutation({
      query: (body) => {
        return {
          url: "/badge/create",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["badges"],
    }),
    updateBadge: build.mutation({
      query: ({ id, data }) => {
        return {
          url: "/badge/update/" + id,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["badges"],
    }),
    deleteBadge: build.mutation({
      query: (id) => {
        return {
          url: "/badge/delete/" + id,
          method: "DELETE",
        };
      },
      invalidatesTags: ["badges"],
    }),
  }),
});

export const {
  useCreateBadgeMutation,
  useDeleteBadgeMutation,
  useGetBadgesQuery,
  useUpdateBadgeMutation,
} = badgeAPI;
