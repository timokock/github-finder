import { useState } from 'react'
import PropTypes from 'prop-types'

const Search = ({ searchUsers, resetUsers, showReset, setAlert }) => {
    const [text, setText] = useState('')

    const onChange = e => {
        setText(e.target.value)
    }

    const onSubmit = e => {
        e.preventDefault()
        if(text === '') {
            setAlert('Please enter something!', 'light')
        } else {
            searchUsers(text)
            setText('')            
        }
    }

    return (
        <div>
            <form onSubmit={onSubmit} className="form">
                <input 
                    type="text" 
                    name="text" 
                    placeholder="Search users..." 
                    value={text} 
                    onChange={onChange} />
                <input 
                    type="submit" 
                    value="Search" 
                    className="btn btn-dark btn-block" />
            </form>
            {showReset && 
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
    searchUsers: PropTypes.func.isRequired,
    resetUsers: PropTypes.func.isRequired,
    showReset: PropTypes.bool.isRequired,
    setAlert: PropTypes.func.isRequired,
}


export default Search
