import { queryMaker } from "@/app/utils";
import { apiSlice } from "../../api/apiSlice";
import { setQueryParams } from "../page/pageSlice";

export const giftItemAPI = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getGiftItems: build.query({
      query: (payload) => {
        let url = `/gift-item/all${queryMaker(payload)}`;
        console.log(url, "url..");
        return {
          url,
          method: "GET",
        };
      },
      providesTags: ["gift-items"],
      transformResponse: (res) => {
        return res.data;
      },
      onQueryStarted: async (queryParams, { dispatch, queryFulfilled }) => {
        let { data } = await queryFulfilled;
        dispatch(setQueryParams(data.meta));
      },
    }),
    createGiftItem: build.mutation({
      query: (body) => {
        return {
          url: "/gift-item/create",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["gift-items"],
    }),
    updateGiftItem: build.mutation({
      query: ({ id, data }) => {
        console.log(id, data, "data..");
        return {
          url: "/gift-item/update/" + id,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["gift-items"],
    }),
    deleteGiftItem: build.mutation({
      query: (id) => {
        return {
          url: "/gift-item/delete/" + id,
          method: "DELETE",
        };
      },
      invalidatesTags: ["gift-items"],
    }),
  }),
});

export const {
  useGetGiftItemsQuery,
  useCreateGiftItemMutation,
  useUpdateGiftItemMutation,
  useDeleteGiftItemMutation,
} = giftItemAPI;
