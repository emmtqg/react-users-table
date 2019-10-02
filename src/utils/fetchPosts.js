import { fetchPostsPending, fetchPostsSuccess, fetchPostsError } from '../actions/actionPosts';
import { apiUrl } from '../config/Posts.json';

function fetchPosts(id) {
    console.log(`Fetching url: ${apiUrl}${id}`);
    return dispatch => {
        dispatch(fetchPostsPending());

        fetch(`${apiUrl}${id}`)
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
