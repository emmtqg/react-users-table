import React from 'react';
import { get } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import TableConfigType from '../../types/TableConfigType';
// import SystemState from '../../types/System.js';
import UserType from '../../types/User';
import PostType from '../../types/Post';
//import SystemState from '../../types/System';

interface UsersProps {
  pending: boolean
  items: Array<UserType> | Array<PostType>
  error: boolean
  tableConfig: TableConfigType
  onRowClick: CallableFunction
  captionText: string
}


const Users: React.FC<UsersProps> = (props) => {
  
  const { items, pending, error, onRowClick, tableConfig, captionText } = props;

  let displayItems: (UserType | PostType)[] = items;

  const noItems = items? (items.length <= 0) : true;
  const tableHeaders = tableConfig.headers;
  const alignments = tableConfig.alignments
  const cols = tableConfig.cols;
  const getFieldValue = (item: UserType | PostType, header:   any) => {
    return get(item, header.field);
  }

  return(
    <>
    {!error && !pending && !noItems &&
    (<table className="table table-responsive w-100 d-block d-md-table table-striped table-hover center">
      <thead className="thead">
        <tr className="row d-flex align-items-stretch">
        {!pending && !error && 
         tableHeaders.map( (header, i) => 
          <th
            className={`col-${cols[i]} text-center`}
            id={`${header.field}`}
            key={`${header.field}`}>{header.display}
          </th>
        )}
        </tr>
      </thead>
      <tbody>
      {!pending && !error && items &&      
        displayItems
        .map(item => (
          <tr
            className="row"
            id={`item.id`}
            key={item.id}
            onClick = {onRowClick ?
            ((e) => {onRowClick(e, item)}) : undefined}
          >
            {tableHeaders
            .map((header, i:number) => {
              return(
              <td 
              key={`${item.id}_h_${i}`} 
              className={`text-${alignments[i]} col-${cols[i]}`}  
              >{getFieldValue(item, header)}</td>)
            })}
          </tr>
        ))
      }
      </tbody>
    </table>
    )}
    <hr />
    {!error && !pending && (
        !noItems? (
        <h3 className="caption">{displayItems.length} {captionText}  </h3>) :
          (<h3 className="caption">No {captionText} found</h3>)
    )}
    {error && 
    <div className="container">
      <h2>Error message</h2>
    </div>}
    {pending && 
    <div className="container">
      <FontAwesomeIcon icon="spinner" size="3x" spin /></div>}
    </>
  );
};

export default Users;