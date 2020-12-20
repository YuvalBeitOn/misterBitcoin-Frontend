import React, { Component } from 'react'
import './ContactPreview.scss'

export default class ContactPreview extends Component {
    
    render() {
        const { contact } = this.props
        return (
            <li className="contact-preview flex align-center space-between" >
                <img src={contact.imgUrl} alt="contact-img"></img>
                <h3>{contact.name}</h3>
                <span>{contact.email}</span>
                <span>{contact.phone}</span>
            </li>
        )
    }
}



