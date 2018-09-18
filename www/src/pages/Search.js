import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import config from '../config'

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: '', found: {}, users: []};
    this.refreshUsers();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  refreshUsers(){
    setTimeout(() => {
      axios.get(`${config.apiUrl}fetchUsers`)
      .then((res) => {
        this.setState({users: res.data});      
        console.log(this.state.users);
      });
    }, 1500);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {    
    event.preventDefault();    
    axios.get(`${config.apiUrl}user/?u=${this.state.value}`)
    .then((res) => {
      this.refreshUsers();
      this.setState({found: res.data});
    });

  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>

        <ul>        
          {this.state.found.login ? (
            <li>

              <Link to={{ pathname: `/${this.state.found.login}`, user: this.state.found }}>
                {this.state.found.login}
              </Link>
              
            </li>
          ) : (<li></li>)}        
        </ul>

        <h2>searched users</h2>
        <ul>        

          {this.state.users.map(u => {
            return (
            <li key={u.login}>
              <Link to={{ pathname: `/${u.login}` }}>
                {u.login}
              </Link>
            </li>)
          })}
          
          
        </ul>

      </div>

    );
  }
}



export default Search;
