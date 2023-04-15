import { apiSlice } from "../../api/apiSlice";

export const cashOutChargeAPI = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getCashOutCharges: build.query({
      query: ({ pkPower, price, page, limit }) => {
        let url = "/agency-category/all";
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
      providesTags: ["cash-out-charges"],
      transformResponse: (res) => {
        return res.data;
      },
      onQueryStarted: async (queryParams, { dispatch, queryFulfilled }) => {
        let { data } = await queryFulfilled;
        dispatch(setQueryParams(data.meta));
      },
    }),
    createCashOutCharge: build.mutation({
      query: (body) => {
        return {
          url: "/agency-category/create",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["cash-out-charges"],
    }),
    updateCashOutCharge: build.mutation({
      query: ({ id, data }) => {
        return {
          url: "/agency-category/update/" + id,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["cash-out-charges"],
    }),
    deleteCashOutCharge: build.mutation({
      query: (id) => {
        return {
          url: "/agency-category/delete/" + id,
          method: "DELETE",
        };
      },
      invalidatesTags: ["cash-out-charges"],
    }),
  }),
});

export const {
  useCreateCashOutChargeMutation,
  useDeleteCashOutChargeMutation,
  useGetCashOutChargesQuery,
  useUpdateCashOutChargeMutation,
} = cashOutChargeAPI;
