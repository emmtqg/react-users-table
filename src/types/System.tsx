import UserType from './User';
import PostType from './User';

export default interface SystemState {
  items: Array<UserType> | null,
  itemsPosts: Array<PostType> | null,
  pending: boolean,
  error: boolean,
  pendingPosts: boolean,
  errorPosts: boolean
}
