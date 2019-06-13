import API from "../classes/API";
import {LOAD_CATEGORIES, LOAD_GOALS, SHOW_ALERT, FILTER_GOALS} from "./types";
import {Mixpanel as mixpanel} from "../mixpanel";


export const loadGoals = (id, status) => async (dispatch, getState) => {

    /*
    load both short term and long term goals from a specific goal status
    if id = 0 it will load all goals from a specific user
     status available are:

    - all (all status below)
    - standby
    - ongoing
    - completed
    */
    return API.request(`/boards/show/${id}/${status}`, 'GET', null, 'auth').then((response) => {
        dispatch({type: LOAD_GOALS, payload: response.data})
    });
};


export const deleteGoal = (id) => async (dispatch) => {

    mixpanel.track('short_term_goal_delete');

    // await auth_axios.delete(`/goals/delete/${id}`); //send request to server
    return API.request(`/goals/delete/${id}/`, 'DELETE', null, 'auth')
};

export const deleteLongTermGoal = (id) => async (dispatch) => {


    mixpanel.track('long_term_goal_delete');

    // await auth_axios.delete(`/goals/delete/${id}`); //send request to server
    return API.request(`/columns/delete/${id}/`, 'DELETE', null, 'auth')
};

export const loadUserGoalsCategories = () => async (dispatch) => {

    return API.request(`/boards/`, 'GET', null, 'auth').then((response) => {

        dispatch({type: LOAD_CATEGORIES, payload: response.data})

    });

};

export const goalChangeStatus = (goalId, status) => async (dispatch) => {


    mixpanel.track('goal_change_status');


    return API.request(`/goals/update-status/${goalId}/${status}`, 'PATCH', null, 'auth').then((response) => {

        console.log(response);

    });


};

export const goalSetPriority = (goalId, newPriority) => async (dispatch) => {


    mixpanel.track('goal_set_priority');

    return API.request(`/goals/update-priority/${goalId}/${newPriority}`, 'PATCH', null, 'auth').then((response) => {

        console.log(response);

    });


};


export const createGoal = (data) => async (dispatch) => {


    return API.request('/goals/create/', 'POST', data, 'auth').then((response) => {

        const {status, message} = response.data;

        if (status === 'success') {
            mixpanel.track('short_goal_create');
        } else {
            mixpanel.track('short_goal_create_error');
        }

        dispatch({
            type: SHOW_ALERT, payload: {
                type: (status === 'success' ? 'positive' : 'negative'),
                title: (status === 'success' ? 'Your goal was created!' : 'Oops!'),
                content: message
            }
        });

        return response;
    });

};

export const createLongTermGoal = (data) => async (dispatch) => {

    console.log('Action: createLongTermGoal');

    return API.request('/columns/create/', 'POST', data, 'auth').then((response) => {

        const {status, message} = response.data;

        if (status === 'success') {
            mixpanel.track('long_goal_create');
        } else {
            mixpanel.track('long_goal_create_error');
        }


        dispatch({
            type: SHOW_ALERT, payload: {
                type: (status === 'success' ? 'positive' : 'negative'),
                title: (status === 'success' ? 'Your long term goal was created!' : 'Oops!'),
                content: message
            }
        });

        return response;
    });

};

export const filterGoals = (category) => (dispatch) => {

    dispatch({
        type: FILTER_GOALS, payload: {category}
    });


};

export const editGoals = (goal) => (dispatch) => {
    return API.request(`/goals/update/${goal.goal_id}/`, 'PUT', goal.goal_data, 'auth').then((response) => {

        const {status, message} = response.data;

        if (status === 'success') {
            mixpanel.track('short_goal_edit');
        } else {
            mixpanel.track('short_goal_edit_error');
        }


        dispatch({
            type: SHOW_ALERT, payload: {
                type: (status === 'success' ? 'positive' : 'negative'),
                title: (status === 'success' ? 'Your short term goal was modified!' : 'Oops!'),
                content: message
            }
        });

        return response;
    });
};

export const editColumns = (column) => (dispatch) => {
    return API.request(`/columns/update/${column.column_id}/`, 'PUT', column.column_data, 'auth').then((response) => {

        const {status, message} = response.data;


        if (status === 'success') {
            mixpanel.track('long_goal_edit');
        } else {
            mixpanel.track('long_goal_edit_error');
        }


        dispatch({
            type: SHOW_ALERT, payload: {
                type: (status === 'success' ? 'positive' : 'negative'),
                title: (status === 'success' ? 'Your long term goal was modified!' : 'Oops!'),
                content: message
            }
        });


        return response;
    });
};

// The following API will create the new category, 'category' is 'boards' in backend
export const createNewCategory = (value) => async (dispatch) => {

    console.log('CREATING NEW CATEGORY');
    console.log(value);
    
    
    // const response = await guest_axios.post('/user/register', userInfo);
    return API.request('/boards/create/', 'POST', {name: value, description: "1"}).then((response) => {
        // Need to figure out the response as the server is giving 500 error,
        // https://hackachieve.slack.com/messages/DK2GCP79R/
        // data is being returned when the name parameter is sent with an empty string
        console.log("Create board response", response);
        return response;

    })

};


// The following API will delete the new category
export const deleteNewCategory = (value) => async (dispatch) => {

    // const response = await guest_axios.post('/user/register', userInfo);
    return API.request('boards/delete/' + value, 'DELETE', null,'auth').then((response) => {
        console.log("Delete board response", response);
        return response;

    })

};