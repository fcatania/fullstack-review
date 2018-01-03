import React from 'react';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    {props.repos.map((repo, index) => (<div key={repo.id}>{`#${index + 1} ${repo.name} has ${repo.stargazers_count} stars.`}</div>))}
  </div>
)

export default RepoList;