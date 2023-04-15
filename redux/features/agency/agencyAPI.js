import { queryMaker } from "@/app/utils";
import { apiSlice } from "../../api/apiSlice";
import { setQueryParams } from "../page/pageSlice";

export const agencyAPI = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getAgencies: build.query({
      query: (payload) => {
        const queryStr = queryMaker(payload);
        let url = "/agency/all" + queryStr;
        console.log(queryStr, "el");

        return {
          url,
          method: "GET",
        };
      },
      providesTags: ["agencies"],
      transformResponse: (res) => {
        return res.data.agencies;
      },
      onQueryStarted: async (queryParams, { dispatch, queryFulfilled }) => {
        let { data } = await queryFulfilled;
        dispatch(setQueryParams(data.meta));
      },
    }),
    createAgency: build.mutation({
      query: (body) => {
        return {
          url: "/agency/create",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["agencies"],
    }),
    updateAgency: build.mutation({
      query: ({ id, data }) => {
        return {
          url: "/agency/update/" + id,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["agencies"],
    }),
    deleteAgency: build.mutation({
      query: (id) => {
        return {
          url: "/agency/delete/" + id,
          method: "DELETE",
        };
      },
      invalidatesTags: ["agencies"],
    }),
  }),
});

export const {
  useCreateAgencyMutation,
  useDeleteAgencyMutation,
  useGetAgenciesQuery,
  useUpdateAgencyMutation,
} = agencyAPI;
