import { useContext, useEffect, Fragment } from 'react'
import { Link } from 'react-router-dom'
import Spinner from '../layout/Spinner'
import Repos from '../repos/Repos'
import GithubContext from '../../context/github/githubContext'

    const User = ({ match }) => {
    
    const { user: { name, company, avatar_url, location, bio, blog, login, html_url, followers, following, public_repos, public_gists, hireable }, getUser, loading, getUserRepos } = useContext(GithubContext)
    
    useEffect(() => {
        getUser(match.params.login)
        getUserRepos(match.params.login)
        //eslint-disable-next-line
    }, [])

    if (loading) return <Spinner />
    return (
        <Fragment>
            <Link to='/' className='btn btn-light'>Back to search</Link>
            Hireable: {" "}
            {hireable ? <i className='fas fa-check text-success' /> : <i className='fas fa-times-circle text-danger' />}
            <div className="card grid-2">
                <div className="all-center">
                    <img src={avatar_url} className='round-img' alt="" style={{ width: '150px' }}/>
                    <h1>{name}</h1>
                    <p>Location: {location}</p> 
                </div>
                <div>
                    {bio && 
                    <Fragment>
                        <h3>Bio</h3>
                        <p>{bio}</p>
                    </Fragment>
                    }
                    <a href={html_url} className='btn btn-dark my-1'>Visit Github profile</a>
                    <ul>
                        <li>
                            {login &&
                            <Fragment>
                                <strong>Username: </strong>{login}
                            </Fragment>}
                        </li>
                        <li>
                            {login &&
                            <Fragment>
                                <strong>Company: </strong>{company}
                            </Fragment>}
                        </li>
                        <li>
                            {login &&
                            <Fragment>
                                <strong>Webpage: </strong>{blog}
                            </Fragment>}
                        </li>
                    </ul>
                </div>
            </div>
            <div className="card text-center">
                <div className="badge badge-primary">Followers: {followers}</div>
                <div className="badge badge-success">Following: {following}</div>
                <div className="badge badge-light">Public Repos: {public_repos}</div>
                <div className="badge badge-dark">Public Gists: {public_gists}</div>
            </div>
            <Repos />
        </Fragment>
    )
}

export default User