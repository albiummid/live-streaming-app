import { apiSlice } from "../../api/apiSlice";
import { setQueryParams } from "../page/pageSlice";

export const levelAPI = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getLevels: build.query({
      query: ({ pkPower, price, page, limit }) => {
        let url = "/level/all";
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
      providesTags: ["levels"],
      transformResponse: (res) => {
        return res.data;
      },
      onQueryStarted: async (queryParams, { dispatch, queryFulfilled }) => {
        let { data } = await queryFulfilled;
        dispatch(setQueryParams(data.meta));
      },
    }),
    createLevel: build.mutation({
      query: (body) => {
        return {
          url: "/level/create",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["levels"],
    }),
    updateLevel: build.mutation({
      query: ({ id, data }) => {
        return {
          url: "/level/update/" + id,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["levels"],
    }),
    deleteLevel: build.mutation({
      query: (id) => {
        return {
          url: "/level/delete/" + id,
          method: "DELETE",
        };
      },
      invalidatesTags: ["levels"],
    }),
  }),
});

export const {
  useCreateLevelMutation,
  useDeleteLevelMutation,
  useGetLevelsQuery,
  useUpdateLevelMutation,
} = levelAPI;
