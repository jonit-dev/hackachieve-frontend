import API from "../classes/API";
import { USER_INFO_REFRESH } from "./types";
import Analytics from "../analytics/Analytics";

export const loadComments = id => async (dispatch, getState) => {
  /*
    short term comments from a specific goal id
    */
  return API.request(`goals/comment/?goal=${id}`, "GET", null, "auth").then(
    response => {
      return response.data;
    }
  );
};

export const createComment = data => async dispatch => {
  return API.request("goals/comment/", "POST", data, "auth").then(response => {
    const { status } = response.data;
    if (status === "error") {
      console.log("you have no permition to comment here..");
    }
    if (status === "success") {
      Analytics.track("create_comment", {
        eventCategory: "comment_in_goals",
        eventAction: "short_goal_comment"
      });
    } else {
      Analytics.track("create_comment_error", {
        eventCategory: "comment_in_goals",
        eventAction: "short_goal_comment"
      });
    }

    return response;
  });
};

export const DeleteComments = id => async (dispatch, getState) => {
  /*
    Delete short term comments from a specific Comment id
    */
  //    console.log(id);
  return API.request(`goals/comment/${id}`, "DELETE", null, "auth").then(
    response => {
      return response.data;
    }
  );
};

export const UpdateComments = (id, updatedcomment) => async (
  dispatch,
  getState
) => {
  /*
    Update short term comments from a specific Comment id
    */
  return API.request(`goals/comment/${id}`, "PUT", updatedcomment, "auth").then(
    response => {
      return response.data;
    }
  );
};

export const CommentsVote = commentvote => async (dispatch, getState) => {
  /*
    voting short term comments from a specific Comment id
    */
  //    console.log(commentvote);
  return API.request(`goals/comment-vote/`, "POST", commentvote, "auth").then(
    response => {
      return response.data;
      // console.log(response);
    }
  );
};

export const userInfo = () => async dispatch => {
  return API.request("/user/info/", "GET", null, "auth").then(response => {
    dispatch({ type: USER_INFO_REFRESH, payload: response.data });
    // console.log(response.data);
    return response.data;
  });
};
