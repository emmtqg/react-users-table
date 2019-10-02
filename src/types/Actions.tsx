import UserType from './User';

interface fetchUsersPending {
  type: string,
}

interface fetchUsersSuccess {
  type: string,
  items: Array<UserType>,
}

interface fetchUsersError {
  type: string,
  error: boolean,
}

export type ActionTypes = fetchUsersPending | fetchUsersSuccess | fetchUsersError;