import { fetchUsersPending, fetchUsersSuccess, fetchUsersError } from '../actions/actionUsers';
import userConfig from '../config/userConfig';

function fetchUsers() {
    return dispatch => {
        dispatch(fetchUsersPending());

        fetch(userConfig.apiUrl)
        .then(res => res.json())
        .then(res => {
            if(!res.length) {
                throw(res.error);
            }

            dispatch(fetchUsersSuccess(res));
            return res;
        })
        .catch(error => {
            dispatch(fetchUsersError(error));
        })
    }
}

export default fetchUsers;
