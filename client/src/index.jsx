import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
    }
  }

  componentDidMount() {
    this.getReposFromDB();
  }

  getReposFromDB() {
    fetch('http://127.0.0.1:1128/repos').then(response => {
      if (response.ok) {
        return response.json();
      } else {
        console.error('Error occurred while fetching (GET).')
      }
    }).then(json => {
      this.setState({repos: json});
    });
  }

  search (term) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var myInit = {
      method: 'POST',
      headers: myHeaders,
      mode: 'cors',
      body: JSON.stringify({username: term})
    };
    fetch('http://127.0.0.1:1128/repos', myInit).then(reponse => {
      if (reponse.ok) {
        this.getReposFromDB();
      } else {
        console.error('Error occurred while posting, that user\'s repos already in base.');
      }
    });
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <Search onSearch={this.search.bind(this)}/>
      <RepoList repos={this.state.repos}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));