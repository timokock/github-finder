import { useContext } from 'react'
import PropTypes from 'prop-types'
import GithubContext from '../../context/github/githubContext'

const Search = ({  setAlert }) => {

    const { users, searchText, searchUsers, resetUsers, setSearchText } = useContext(GithubContext)

    const onChange = e => {
        setSearchText(e.target.value)
    }

    const onSubmit = e => {
        e.preventDefault()
        if(searchText === '') {
            setAlert('Please enter something!', 'light')
        } else {
            searchUsers(searchText)
            setSearchText('')            
        }
    }

    return (
        <div>
            <form onSubmit={onSubmit} className="form">
                <input 
                    type="text" 
                    name="text" 
                    placeholder="Search users..." 
                    value={searchText} 
                    onChange={onChange} />
                <input 
                    type="submit" 
                    value="Search" 
                    className="btn btn-dark btn-block" />
            </form>
            {users.length > 0 && 
                <button 
                    className="btn btn-light btn-block"
                    onClick={resetUsers}>
                    Reset
                </button>
            }
        </div>
    )
}

Search.propTypes = {
    setAlert: PropTypes.func.isRequired,
}


export default Search
