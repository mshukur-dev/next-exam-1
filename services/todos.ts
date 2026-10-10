// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const todosApi = createApi({
    reducerPath: "todosApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://to-dos-api.softclub.tj/api/",
    }),
    tagTypes: ["Post"],
    endpoints: (builder) => ({
        getTodos: builder.query({
            query: (search) => ({
                url: `to-dos`,
                params: { query: search },
            }),
            providesTags: ["Post"],
        }),
        getById: builder.query({
            query: (id) => `to-dos/${id}`,
            providesTags: ["Post"],
        }),

        deleteTodo: builder.mutation({
            query: (id) => ({
                url: `to-dos?id=${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Post"],
        }),
        deleteImg: builder.mutation({
            query: (id) => ({
                url: `to-dos/images/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Post"],
        }),
        addImg: builder.mutation({
            query: ({ id, formdata }) => ({
                url: `to-dos/${id}/images`,
                method: "POST",
                body: formdata,
            }),
            invalidatesTags: ["Post"],
        }),
        addTodo: builder.mutation({
            query: (newObj) => ({
                url: `to-dos`,
                method: "POST",
                body: newObj,
            }),
            invalidatesTags: ["Post"],
        }),
        editTodo: builder.mutation({
            query: (obj) => ({
                url: `to-dos`,
                method: "PUT",
                body: obj,
            }),
            invalidatesTags: ["Post"],
        }),
        toggleTodo: builder.mutation({
            query: (id) => ({
                url: `https://to-dos-api.softclub.tj/completed?id=${id}`,
                method: "PUT",
            }),
            invalidatesTags: ["Post"],
        }),
    }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
    useGetTodosQuery,
    useDeleteTodoMutation,
    useDeleteImgMutation,
    useAddImgMutation,
    useAddTodoMutation,
    useEditTodoMutation,
    useToggleTodoMutation,
    useGetByIdQuery,
} = todosApi;
