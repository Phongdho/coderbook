import * as types from "../constants/comment.constant";
import api from "../api";

const createComment = (postId, body) => async (dispatch) => {
    dispatch({type: types.CREATE_COMMENT, payload: null});
    try {
        const res = await api.post(`/posts/${postId}/comments`, {
            body,
     });
     dispatch({
         type: types.CREATE_COMMENT_SUCCESS,
         payload: res.data.data,
     });
    } catch (err) {
        dispatch({type: types.CREATE_COMMENT_FAILURE, payload: err})
    }
};
export const commentActions = {
    createComment,
  };