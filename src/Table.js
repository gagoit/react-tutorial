import React from 'react';

const TableHeader = () => {
  return (
    <thead>
      <tr>
        <th scope="col">ID</th>
        <th scope="col">Name</th>
        <th scope="col">Job</th>
        <th scope="col">Action</th>
      </tr>
    </thead>
  )
}

const TableBody = (props) => {
  const removeUser = (id) => {
    const user = props.users.find(user => id === user.id);

    if (user === undefined) {
      return;
    }

    const userName = user.name + ' (' + user.job + ')' ;

    if (window.confirm("Are you sure to detele the user: " + userName + " ?")) {
      props.removeUser(id);
    }
  }

  const rows = props.users.map((row, index) => {
    return (
      <tr key={row.id}>
        <th scope="row">{row.id}</th>
        <td>{row.name}</td>
        <td>{row.job}</td>
        <td>
          <button className="btn btn-danger" onClick={() => removeUser(row.id)}>Delete
            <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-trash ml-2" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
              <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
            </svg>
          </button>
        </td>
      </tr>
    )
  })

  return <tbody>{rows}</tbody>;
}

class Table extends React.Component {
  render() {
    const {users, removeUser} = this.props;

    return (
      <div className="table-responsive">
        <table className="table table-striped table-bordered table-hover">
          <TableHeader />
          <TableBody users={users} removeUser={removeUser}/>
        </table>
      </div>
    );
  }
}

export default Table
