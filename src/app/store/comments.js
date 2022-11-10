import { createSlice } from "@reduxjs/toolkit";
import commentService from "../services/comment.service";
import { nanoid } from "nanoid";

const commentsSlice = createSlice({
    name: "comments",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        commentsRequested: (state) => {
            state.isLoading = true;
        },
        commentsReceived: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        commentsRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        addCommentItem: (state, action) => {
            state.entities = action.payload;
        },
        removeCommentItem: (state, action) => {
             state.entities = action.payload;
        }
    }
});


const { reducer: commentsReducer, actions } = commentsSlice;
const { commentsRequested, commentsReceived, commentsRequestFailed, addCommentItem, removeCommentItem } = actions;

export const loadCommentsList = (userId) => async (dispatch) => {
    dispatch(commentsRequested());
    try {
        const { content } = await commentService.getComments(userId);
       
        dispatch(commentsReceived(content));
    } catch (error) {
        dispatch(commentsRequestFailed(error.message));
    }
};

export const removeComment = (id) => async (dispatch, getState) => {
    dispatch(commentsRequested());
    try {
        const comment = getState().comments.entities.filter(i => i._id !== id);
        await commentService.removeComment(id);
        dispatch(removeCommentItem(comment));
        dispatch(commentsRequestFailed());
    } catch (error) {
        dispatch(commentsRequestFailed(error.message));
    }
};

export const addComment = (data) => async (dispatch, getState) => {
    dispatch(commentsRequested());
    const currentCommetId = getState().users.auth.userId;
     const content = {
            ...data,
            _id: nanoid(),
            pageId: currentCommetId,
            created_at: Date.now(),
            userId: currentCommetId
        };
    try {
        const comments = [...getState().comments.entities, content];
        await commentService.createComment(content);
        dispatch(addCommentItem(comments));
        dispatch(commentsRequestFailed());
    } catch (error) {
        dispatch(commentsRequestFailed(error.message));
    }
};

export const getComments = () => (state) => state.comments.entities;
export const getCommentsLoadingStatus = () => (state) =>
    state.comments.isLoading;

export default commentsReducer;

