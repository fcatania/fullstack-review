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
    fetch('http://127.0.0.1:1128/repos').then(response => {
      if (response.ok) {
        return response.json();
      } else {
        console.error('Error occurred while fetching (GET).')
      }
    }).then(json => {
      console.log(json);
    });
  }

  search (term) {
    console.log(`${term} was searched`);
    fetch('http://127.0.0.1:1128/repos', {method: 'POST', body: term, mode: 'cors'}).then(reponse => {
      console.log(reponse);
      if (reponse.ok) {
        console.log('OK!');
      } else {
        console.error('Error occurred while fetching (POST).');
      }
    });
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));