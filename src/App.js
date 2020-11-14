import React from 'react';
import Table from './Table';
import Form from './Form';
import SearchForm from './SearchForm';
import ReactPaginate from 'react-paginate';

class App extends React.Component {
  state = {
    users: [],
    viewableUsers: [],
    paginatedUsers: [],
    perPage: 2,
    pageCount: 1,
    currentPage: 1
  };

  getUsersOnPage = () => {
    if (this.state.currentPage > this.state.pageCount) {
      return [];
    }

    let offset = (this.state.currentPage - 1) * this.state.perPage;
    let usersInPage = this.state.viewableUsers.slice(offset, offset + this.state.perPage);

    return usersInPage;
  };

  componentDidMount() {
    const url = "https://5f60d84490cf8d00165586ea.mockapi.io/users";

    fetch(url)
      .then(result => result.json())
      .then(result => {
        this.setState({
          users: result,
          viewableUsers: result,
          pageCount: Math.ceil(result.length / this.state.perPage),
        }, () => {
          this.setState({paginatedUsers: this.getUsersOnPage()});
        });
      });
  };

  handlePageClick = (data) => {
    this.setState({currentPage: (data.selected + 1)}, () => {
      this.setState({paginatedUsers: this.getUsersOnPage()});
    });
  };

  removeUser = (id) => {
    const {users} = this.state;
    const url = "https://5f60d84490cf8d00165586ea.mockapi.io/users/";

    fetch(url + id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => response.json())
    .then(data => {
      let remainUsers = users.filter((character, i) => {
        return data.id !== character.id
      });

      this.setState({
        users: remainUsers,
        viewableUsers: remainUsers,
        currentPage: 1,
        pageCount: Math.ceil(remainUsers.length / this.state.perPage),
      }, () => {
        this.setState({paginatedUsers: this.getUsersOnPage()});
      })
    })
    .catch((error) => {
      alert('Error: ' + error);
    });
  };

  addUser = (character) => {
    const url = "https://5f60d84490cf8d00165586ea.mockapi.io/users";

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(character),
    })
    .then(response => response.json())
    .then(data => {
      let newUsers = [...this.state.users, data];

      this.setState({
        users: newUsers,
        viewableUsers: newUsers,
        currentPage: 1,
        pageCount: Math.ceil(newUsers.length / this.state.perPage),
      }, () => {
        this.setState({paginatedUsers: this.getUsersOnPage()});
      });
    })
    .catch((error) => {
      alert('Error: ' + error);
    });
  };

  filterUsers = (filterStr) => {
    if (filterStr.length === 0) {
      this.setState({
        viewableUsers: this.state.users,
        pageCount: Math.ceil(this.state.users.length / this.state.perPage),
        currentPage: 1,
      }, () => {
        this.setState({paginatedUsers: this.getUsersOnPage()});
      });
    } else {
      let filteredUsers = this.state.users.filter((user) => {
        let isSame = (user.name && user.name.toLowerCase().includes(filterStr.toLowerCase())) ||
          (user.job && user.job.toLowerCase().includes(filterStr.toLowerCase()));

        return isSame;
      });

      this.setState({
        viewableUsers: filteredUsers,
        pageCount: Math.ceil(filteredUsers.length / this.state.perPage),
        currentPage: 1,
      }, () => {
        this.setState({paginatedUsers: this.getUsersOnPage()});
      });
    }
  };

  render() {
    return (
      <div className="container">
        <h1>React Tutorial</h1>
        <p>Add a user with a name and a job to the table.</p>

        <SearchForm filterUsers={this.filterUsers}/>

        <br></br>
        <Table users={this.state.paginatedUsers} removeUser={this.removeUser}/>

        <ReactPaginate
          previousLabel={'previous'}
          nextLabel={'next'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={this.state.pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.handlePageClick}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          pageClassName={'page-item'}
          pageLinkClassName={'page-link'}
          previousClassName={'page-item'}
          previousLinkClassName={'page-link'}
          nextClassName={'page-item'}
          nextLinkClassName={'page-link'}
          activeClassName={'active'}
        />

        <br></br>
        <Form handleSubmit={this.addUser}/>
      </div>
    );
  }
}

export default App
