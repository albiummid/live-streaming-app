import { apiSlice } from "../../api/apiSlice";
import { setQueryParams } from "../page/pageSlice";
export const streamAPI = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getStreams: build.query({
      query: (payload) => {
        let queries = [];
        if (payload.streamType) {
          queries.push(`streamType_like=${payload.streamType}`);
        }
        if (payload.roomType) {
          queries.push(`roomType_like=${payload.roomType}`);
        }
        if (payload.seats) {
          queries.push(`seats=${payload.seats}`);
        }
        let queryStr = queries.length > 0 ? `?${queries.join("&")}` : "";
        const url =
          `/stream-room/all${queryStr}` + `?_limit=${payload?.limit ?? 20}`;
        return {
          url,
          method: "GET",
        };
      },
      providesTags: ["streams"],
      transformResponse: (res) => {
        return res.data;
      },
      onQueryStarted: async (queryParams, { dispatch, queryFulfilled }) => {
        let { data } = await queryFulfilled;
        dispatch(setQueryParams(data.meta));
      },
    }),
    getStream: build.query({
      query: (id) => {
        return {
          url: "/stream-room/getById/" + id,
          method: "GET",
        };
      },
      transformResponse: (res) => {
        return res.data.streamRoom;
      },
    }),
    updateStream: build.mutation({
      query: ({ id, data }) => {
        return {
          url: "/stream/update/" + id,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["streams"],
    }),
    createStream: build.mutation({
      query: (payload) => {
        return {
          url: "/stream-room/create",
          method: "POST",
          body: payload,
        };
      },
    }),
  }),
});

export const {
  useGetStreamsQuery,
  useUpdateStreamMutation,
  useCreateStreamMutation,
  useGetStreamQuery,
} = streamAPI;
