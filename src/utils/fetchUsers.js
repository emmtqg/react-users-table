import { fetchUsersPending, fetchUsersSuccess, fetchUsersError } from '../actions/actionUsers';
import { apiUrl } from '../config/Users.json';

function fetchUsers() {
    return dispatch => {
        dispatch(fetchUsersPending());

        fetch(apiUrl)
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
