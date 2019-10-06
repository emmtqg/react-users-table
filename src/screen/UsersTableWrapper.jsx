import React, { Component } from 'react';
import { get } from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import fetchUsersAction from '../utils/fetchUsers';
import {getUsersError, getUsers, getUsersPending} from '../reducers/reducer';
import Users from '../components/GeneralTable/GeneralTable';
import { userConfig as tableConfig } from '../config/userConfig';

class UsersTableWrapper extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      filterStr: '',
      filter: false,
      searchCaseSensitive: tableConfig.searchCaseSensitive,
      displayedUsers: [],
    }

    this.tableHeaders = tableConfig.headers;
    
    this.onChangeFilterStr = this.onChangeFilterStr.bind(this);
    this.hasFilterString = this.hasFilterString.bind(this);
    this.onCaseChange = this.onCaseChange.bind(this);
    this.onRowClick = this.onRowClick.bind(this);
  }

  componentDidMount() {
    const {fetchUsers} = this.props;
    fetchUsers();
  }

  componentDidUpdate(prevProps, prevState) {   
    // run the filter on new pending, new items, new case sensitvity
    if ((prevProps.pending !== this.props.pending) ||
        (prevProps.items !== this.props.items) ||
        (prevState.searchCaseSensitive !== this.state.searchCaseSensitive) ) {
      
      this.onChangeFilterStr(null, this.state.filterStr);
    } 
  }

  // Indexing through the applied column headers,
  // check for the filter string
  hasFilterString(user, filterStr) {
    if (!filterStr && !filterStr.trim()) return user;

    if (!this.state.searchCaseSensitive) {
      filterStr = filterStr.toLowerCase();
    }

    let testValue;
    for (let i = 0; i < this.tableHeaders.length; ++i) {

      testValue = get(user, this.tableHeaders[i].field);

      if (testValue) {
        if (!this.state.searchCaseSensitive) {
          testValue = testValue.toLowerCase();
        }

        if (testValue.includes(filterStr)) {
          return true;
        }
      }     
    }

    return false;
  }

  //* apply the updated filter to the user list
  onChangeFilterStr(event, filterStr) {
    // if not in table init (called from componentDidUpdate)
    if (event !== null) {
      event.preventDefault();
    }

    this.setState((prevState, props) => {
      const nextDisplayUsers = props.items
      .filter(user => this.hasFilterString(user, filterStr));

      return {
          filterStr: filterStr,
          filter: !(filterStr.trim() === ""),
          displayedUsers: nextDisplayUsers,
      }
    });
  }

  onCaseChange(event) {
    const checked = event.target.checked;
    if (checked !== this.state.searchCaseSensitive) {
      this.setState({ searchCaseSensitive: checked });
    } 
  }

  onRowClick(event, user) {
    event.preventDefault();
    this.props.history.push(`/posts/${user.id}`, { name: user.name } );
  }

  render() {
    return (
      <>
      {/* Title (from config file) */}
      <h1 className="display-5 text-center">{tableConfig.title}</h1>
      {/* Search Bar */}
        <div className="header-area row d-flex align-items-center">
          <div className="col-6">
            <label className="sr-only" htmlFor="inlineFormInputGroup">Search</label>
            <div className="input-group mb-2 align-middle">
              <div className="input-group-prepend">
                <div className="input-group-text"><FontAwesomeIcon icon="search" /></div>
              </div>
              <input type="text" className="form-control" id="inlineFormInputGroup"
              onChange={(e) => this.onChangeFilterStr(e, e.target.value)}
              placeholder="Search for..." />
            </div>
          </div>
          <div className="col-3">
            <div className="check-case form-check mb-2 align-middle">
              <input className="form-check-input" type="checkbox"
              checked={this.state.caseSensitive}
              onChange={(e) => this.onCaseChange(e) } id="caseSensitive" />
              <label className="form-check-label" htmlFor="caseSensitive">
                Case sensitive
              </label>
            </div>
          </div>
        </div>
        

      {/* Filtered User Table */}
        <Users 
          items={this.state.displayedUsers}
          pending={this.props.pending}
          error={this.props.error}
          tableConfig={tableConfig}
          onRowClick={this.onRowClick}
          captionText="Users"
        />
      </>
    );
  }
}

// export default UsersWrapper;

const mapStateToProps = (state) => ({
  error: getUsersError(state),
  items: getUsers(state),
  pending: getUsersPending(state)
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchUsers: fetchUsersAction
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersTableWrapper);
