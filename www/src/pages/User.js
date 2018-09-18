  import React, { Component } from 'react';
  import { Link } from 'react-router-dom';
  import axios from 'axios';
  import config from '../config'
  class User extends Component {
    
    constructor(props){
      super(props);    
      this.state = { user: {}, repos: [] };
      
      if (props.location.user) {
        this.getRepos();
        this.state = { user: props.location.user };      
      }
      else axios.get(`${config.apiUrl}user/?u=${this.props.match.params.user}`)
        .then((res) => {
          console.log(res.data);
          this.getRepos();
          this.setState({user: res.data});
        });
    }

    getRepos () {
      axios.get(`${config.apiUrl}repo/?u=${this.props.match.params.user}`)
      .then((res) => {
        const repos = res.data.sort((a, b) => {return b.stargazers_count - a.stargazers_count});
        console.log(repos);
        this.setState({user: this.state.user, repos: repos});
      });
    };

    swap(a, from, to){      
      a[from] = a.splice(to, 1, a[from])[0];      
      this.setState({user: this.state.user, repos: a});
    }

    repoUp(i){
      if (i < 1) return;
      this.swap(this.state.repos, i, i-1);
      
    }

    repoDown(i){
      if (i >= this.state.repos.length-1) return;
      this.swap(this.state.repos, i, i+1);
    }
    

    repoTable(repos){

      const trs = repos.map((r, i) => {      
        return (
          <tr key={i}>
            <td>
              {r.name}
            </td>
            <td>{r.language}</td>        
            <td>{r.stargazers_count}</td>
            <td><button onClick={() => this.repoUp(i)}>up</button></td>
            <td><button onClick={() => this.repoDown(i)}>down</button></td>
            <td>
              <Link to={{ pathname: `/${this.state.user.login}/${r.name}`, repo: r }}>
                details
              </Link>
            </td>
          </tr>
        );
      });

      return (trs);      
    }
    
    render() {
      const user = this.state.user;
      const repos = this.state.repos;
      

      return (
        <div>        
          
          {user.login ? (
            <div>            
              <div><img alt="" width="100" height="100" src={user.avatar_url}></img></div>
              <div>Followed by {user.followers}</div>
              <div>Following {user.following}</div>
              <div>{user.email}</div>
              <div>{user.bio}</div>

              <table>
                <tbody>
                {repos ? this.repoTable(repos) : (<tr></tr>)}
                </tbody>
              </table>


            </div>          
          ) : (
            <div>
              <h2>No user found</h2>
            </div>
          )
        }
        </div>
      );
    }
  }

  export default User;
