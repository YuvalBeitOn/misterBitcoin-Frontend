import { React, Component } from 'react'
import { Link } from 'react-router-dom';

import { ContactList } from '../../cmps/ContactList/ContactList';
import './ContactPage.scss'
import { contactService } from '../../services/ContactService';
import { ContactFilter } from '../../cmps/ContactFilter/ContactFilter';

export default class ContactPage extends Component {
    state = {
        contacts: null,
        filterBy: null
    }
    componentDidMount() {
        this.loadContacts()
    }
    async loadContacts() {
        const contacts = await contactService.getContacts(this.state.filterBy)
        this.setState({ contacts })
    }

    onSetFilter = (filterBy) => {
        this.setState({ filterBy }, this.loadContacts)
    }

    render() {
        const { contacts } = this.state
        return (
            <div className="contact-page flex column align-center">
                <div className="contacts-control flex">
                    <ContactFilter match={this.props.match} onSetFilter={this.onSetFilter} />
                    <Link className="add-contact" to="contact/edit">Add Contact</Link>
                </div>
                {contacts && <ContactList contacts={contacts} />}
            </div>
        )
    }
}

