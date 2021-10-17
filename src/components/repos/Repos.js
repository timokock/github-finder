import React, {useContext} from 'react'
import ReposItem from './ReposItem'
import GithubContext from '../../context/github/githubContext'

const Repos = () => {
  
  const { repos } = useContext(GithubContext)
 
  return repos.map(repo => <ReposItem key={repo.id} repo={repo} />)
}

export default Repos