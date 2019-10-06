import { fetchPostsPending, fetchPostsSuccess, fetchPostsError } from '../actions/actionPosts';
import { postConfig } from '../config/postConfig';

function fetchPosts(id) {
    console.log(`Fetching url: ${postConfig.apiUrl}${id}`);
    return dispatch => {
        dispatch(fetchPostsPending());

        fetch(`${postConfig.apiUrl}${id}`)
        .then(res => res.json())
        .then(res => {
            if(!res.length) {
                throw(res.error);
            }

            dispatch(fetchPostsSuccess(res));
            return res;
        })
        .catch(error => {
            dispatch(fetchPostsError(error));
        })
    }
}

export default fetchPosts;
