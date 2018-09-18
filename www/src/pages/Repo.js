import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Repo extends Component {
  
  constructor(props){
    super(props);    
    console.log(props);
    this.state = { repo: {} };
    
    if (props.location.repo) {
      this.state = { repo: props.location.repo };      
    }
    else {
      const url = this.props.match.url.replace("/", "");
      axios.get(`http://localhost:3000/repo/?r=${url}`)
      .then((res) => {
        console.log(res.data);
        this.setState({repo: res.data});
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
      </div>
    );
  }
}

export default Repo;
