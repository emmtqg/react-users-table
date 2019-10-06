import React, { Component } from 'react';
import { get, find } from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import fetchPostsAction from '../utils/fetchPosts';
import { getPostsError, getPostsPending, getPosts, getUsers } from '../reducers/reducer';
import Users from '../components/GeneralTable/GeneralTable';
import { postConfig as tableConfig } from '../config/postConfig';

class PostsTableWrapper extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: 0
    }

    this.tableHeaders = tableConfig.headers;
  }

  componentDidMount() {
    const { fetchPosts, match } = this.props;

    // using get to catch any errors
    const userId = get(match, 'params.userId');
  
    this.setState({ userId: userId });
    if (userId > 0) {
      fetchPosts(userId);
    }
  }

  getUserName(users, userId) {
    let user;
    if (userId > 0) {
      user = find(users, function(u) { 
        console.log(`user ${u.id} == ${userId}?`)  
        return `${u.id}` === userId;
      });

      return get(user, 'name');
    }

    return null;
  }

  render() {
    // const userId = this.state.userId;
    let userName = '';
    if (this.props.location &&
        this.props.location.state && this.props.location.state.name) { 
          userName = this.props.location.state.name;
    }
    return (
      <>
      {/* Title (from config file) */}
      <h1 className="display-5 text-center">{tableConfig.title}</h1>
      {/* Header */}
      <div className="d-flex header-area row">
        <div className="col-1 align-self-start">
          <Link to="/">
            <button type="button" className="btn btn-lg  btn-outline-info">Home
            </button>
          </Link>
        </div>
        {((this.state.userId > 0) &&
          (this.props.itemsPosts) &&
          (this.props.itemsPosts.length > 0)) &&
          <div className="post-title col-11 mb-2 align-self-end">
            {(userName !== '') ? userName : null}
            &nbsp;({this.props.itemsPosts.length} posts)</div>
        }
      </div>
      {/* Filtered User Table */}
        <Users 
          items={this.props.itemsPosts}
          pending={this.props.pendingPosts}
          error={this.props.errorPosts}
          tableConfig={tableConfig}
          captionText="Posts"
        />
      </>
    );
  }
}

// export default PostsWrapper;

const mapStateToProps = (state) => ({
  itemsPosts: getPosts(state),
  errorPosts: getPostsError(state),
  pendingPosts: getPostsPending(state),
  getUsers: getUsers(state)
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchPosts: fetchPostsAction
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostsTableWrapper);
