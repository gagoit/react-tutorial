import React from 'react'

class Form extends React.Component {
  initialState = {
    name: '',
    job: '',
  };

  state = this.initialState;

  handleChange = (event) => {
    const {name, value} = event.target;

    this.setState({
      [name]: value,
    })
  };

  submitForm = () => {
    this.props.handleSubmit(this.state)
    this.setState(this.initialState)
  };

  render() {
    const { name, job } = this.state;

    return (
      <form>
        <p>Add new User:</p>

        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            className="form-control" 
            value={name}
            onChange={this.handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="job">Job</label>
          <input
            type="text"
            name="job"
            id="job"
            className="form-control"
            value={job}
            onChange={this.handleChange} />
        </div>
        <input type="button" className="btn btn-primary" value="Submit" onClick={this.submitForm} />
      </form>
    );
  }
}

export default Form;
