import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { contactService } from '../../services/ContactService'
import { userService } from '../../services/UserService'
import TransferFund from '../../cmps/TransferFund/TransferFund'
import MoveList from '../../cmps/MovesList/MovesList'


import './ContactDetailsPage.scss'
export default class ContactDetailsPage extends Component {

    state = {
        contact: null,
        user: null
    }

    async componentDidMount() {
        const { contactId } = this.props.match.params
        if (contactId) {
            const contact = await contactService.getContactById(contactId)
            this.setState({ contact })
        }
        const user = await userService.getUser();
        this.setState({ user })
    }

    deleteContact = () => {
        const { contactId } = this.props.match.params
        // console.log('contactId:', contactId);
        contactService.deleteContact(contactId)
        contactService.getContacts()
        this.props.history.push('/contacts');
    }

    transferFund = async (fund) => {
        const move = {
            toId: this.state.contact._id,
            to: this.state.contact.name,
            amount: fund,
            at: Date.now(),
        };
        await userService.addMove(move);
    };

    render() {
        const { contact, user } = this.state
        if (!user || !contact) return <div>Loading...</div>
        return (
            <section className="contact-details-page flex justify-center">
                <div className="contact-details-container flex space-between column">
                    <div className="contact-details flex column">
                        <img src={contact.imgUrl} alt="contact-img" />
                        <span>Id: {contact._id}</span>
                        <span>Name: {contact.name}</span>
                        <span>E-mail: {contact.email}</span>
                        <span>Phone: {contact.phone}</span>
                    </div>
                    <div className="btns-section">
                        <Link to="/contacts">Back</Link>
                        <Link key={contact._id} to={`/contact/edit/${contact._id}`}>Edit</Link>
                        <button onClick={this.deleteContact}>Delete</button>
                    </div>
                </div>
                <section className="transfer-section">
                    <TransferFund
                        maxCoins={user.coins}
                        transferFund={this.transferFund}
                        contactName={contact.name}
                    />
                    <MoveList moves={user.moves} contactId={contact._id} isInContact={true} />
                </section>
            </section>
        )
    }
}
