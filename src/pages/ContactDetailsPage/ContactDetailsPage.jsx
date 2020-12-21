import './ContactDetailsPage.scss'
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getContactById, deleteContact } from '../../store/actions/contactActions';
import { loadUser, addMove } from '../../store/actions/userActions'
import TransferFund from '../../cmps/TransferFund'
import MoveList from '../../cmps/MovesList'

class ContactDetailsPage extends Component {

    async componentDidMount() {
        const { contactId } = this.props.match.params
        if (contactId) {
            await this.props.getContactById(contactId);
        }
        await this.props.loadUser();
    }

    deleteContact = async () => {
        const { contactId } = this.props.match.params
        await this.props.deleteContact(contactId)
        this.props.history.push('/contacts');
    }

    transferFund = async (fund) => {
        const move = {
            toId: this.props.contact._id,
            to: this.props.contact.name,
            amount: fund,
            at: Date.now(),
        };
        await this.props.addMove(move);
        await this.props.loadUser();
    };

    render() {
        const { user } = this.props
        const { contact } = this.props
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
                        <NavLink to="/contacts">Back</NavLink>
                        <NavLink key={contact._id} to={`/contact/edit/${contact._id}`}>Edit</NavLink>
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


const mapStateToProps = (state) => {
    return {
        contact: state.contactReducer.contact,
        user: state.userReducer.user
    };
};

const mapDispatchToProps = {
    getContactById,
    deleteContact,
    loadUser,
    addMove
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactDetailsPage);