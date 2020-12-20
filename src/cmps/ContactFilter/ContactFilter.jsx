
import React, { Component } from 'react'
import './ContactFilter.scss'
export class ContactFilter extends Component {
    state = {
        searchTerm: ''
    }

    onChangeHandler = (ev) => {
        const value = ev.target.value
        this.setState({ [ev.target.name]: value }, () => {
            this.props.onSetFilter({ ...this.state })
        })
    }

    render() {
        // console.log(this.props);
        const { searchTerm } = this.state
        return (
            <form className="contact-filter">
                <input placeholder="Search..." name="searchTerm" value={searchTerm} type="text" onChange={this.onChangeHandler} />
            </form>
        )
    }
}

