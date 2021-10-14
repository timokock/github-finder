import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class Search extends Component {
    state = {
       text: '' 
    }

    static propTypes = {
        searchUsers: PropTypes.func.isRequired,
        resetUsers: PropTypes.func.isRequired,
        showReset: PropTypes.bool.isRequired,
        setAlert: PropTypes.func.isRequired,
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit = e => {
        e.preventDefault()
        if(this.state.text === '') {
            this.props.setAlert('Please enter something!', 'light')
        } else {
            this.props.searchUsers(this.state.text)
            this.setState({ text: '' })            
        }
    }

    render() {
        const { resetUsers, showReset } = this.props
        return (
            <div>
                <form onSubmit={this.onSubmit} className="form">
                    <input 
                        type="text" 
                        name="text" 
                        placeholder="Search users..." 
                        value={this.state.text} 
                        onChange={this.onChange} />
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
}



export default Search
