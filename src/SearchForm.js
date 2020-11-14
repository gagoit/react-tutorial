import React from 'react'

class SearchForm extends React.Component {
  handleChange = (event) => {
    console.log(event.target.value);
    this.props.filterUsers(event.target.value);
  };

  render() {
    return (
      <form>
        <div className="form-group">
          <label htmlFor="search">Search</label>
          <input
            type="text"
            name="search"
            id="search"
            className="form-control" 
            onChange={this.handleChange} />
        </div>
      </form>
    );
  }
}

export default SearchForm;
