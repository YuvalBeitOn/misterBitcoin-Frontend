import './ContactPage.scss'
import { React, Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { loadContacts } from '../../store/actions/contactActions'
import  ContactList  from '../../cmps/ContactList';
import  ContactFilter  from '../../cmps/ContactFilter';

class ContactPage extends Component {
    state = {
        filterBy: null
    }
    componentDidMount() {
        this.props.loadContacts()
    }

    loadContacts = async () => {
        this.props.loadContacts(this.state.filterBy)
    };

    onSetFilter = (filterBy) => {
        this.setState({ filterBy }, this.loadContacts)
    }

    render() {
        const { contacts } = this.props
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


const mapStateToProps = (state) => {
    return {
        contacts: state.contactReducer.contacts,
    };
}

const mapDispatchToProps = {
    loadContacts
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactPage);

