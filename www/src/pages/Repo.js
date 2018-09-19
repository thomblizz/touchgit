import React, { Component } from 'react';
import axios from 'axios';
import config from '../config'
class Repo extends Component {
  
  constructor(props){
    super(props);    
    console.log(props);
    this.state = { repo: {}, commits: [] };
    
    if (props.location.repo) {
      this.state = { repo: props.location.repo };
      axios.get(`${this.state.repo.commits_url.replace('{/sha}', '')}`)
      .then((res) => {
        console.log(res.data);
        this.setState({commits: res.data});
      });
    }
    else {
      const url = this.props.match.url.replace("/", "");
      axios.get(`${config.apiUrl}repo/?r=${url}`)
      .then((res) => {
        console.log(res.data);
        this.setState({repo: res.data});
        
        axios.get(`${res.data.commits_url.replace('{/sha}', '')}`)
        .then((res) => {
          console.log(res.data);
          this.setState({repo: this.state.repo, commits: res.data});
        });

      });

      
    }
  }
    
  render() {

    const repo = this.state.repo;
    

    return (
      <div>        
        
        {repo.name ? (
          <div>
            {/*name, description, number of stars, language and a link t*/}
            <div>{repo.name}</div>
            <div>{repo.description}</div>
            <div>{repo.stargazers_count}</div>
            <div>{repo.language}</div>
            <div><a target="_blank" href={repo.html_url}>link to github</a></div>
          </div>          
        ) : (
          <div>
            <h2>No repo found</h2>
          </div>
        )
      }

      <ul>
        {this.state.commits.map(c => {
          return (
          <li key={c.sha}>
            
            {c.commit.committer.date} - {c.author.login} - {c.commit.message} 
            
          </li>)
        })}
      </ul>
      </div>
    );
  }
}

export default Repo;
