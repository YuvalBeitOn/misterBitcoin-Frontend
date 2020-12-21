import './ContactEditPage.scss'
import React, { Component } from "react";
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { contactService } from "../../services/ContactService.js";
import { getContactById, saveContact } from '../../store/actions/contactActions';


class ContactEdit extends Component {
    state = {
        name: '',
        phone: '',
        email: '',
        imgUrl: '',
        validateName: '',
        validatePhone: '',
        validateEmail: ''
    };

    async componentDidMount() {
        const id = this.props.match.params.id;
        if (id) {
            await this.props.getContactById(id);
            const { contact } = this.props
            this.setState({ ...contact });
            this.setState({ isEditMode: true });
        } else {
            let contact = contactService.getEmptyContact()
            this.setState({ ...contact });
        }
    }

    validateForm = () => {
        if (!this.state.phone) {
            this.setState({ validatePhone: 'Phone is required' })
            return false
        }
        if (!this.state.name) {
            this.setState({ validateName: 'Name is required' })
            return false
        }
        if (!this.state.email || !this.state.email.includes('@') || !this.state.email.includes('.')) {
            this.setState({ validateEmail: 'Email is invalide' })
            return false
        }
        return true
    }

    onChangeInput = (ev) => {
        const { value, name } = ev.target;
        this.setState({ [name]: value });
    };

    onSaveContact = async (ev) => {
        ev.preventDefault();
        const isValid = this.validateForm();
        if (isValid) {
            const contact = await this.props.saveContact({ ...this.state });
            this.props.history.push(`/contact/${contact._id}`);
        }
    };

    render() {
        const { name, phone, email, imgUrl, isEditMode } = this.state;
        let img;
        if (isEditMode) {
            img = <img className="contact-img" src={imgUrl} alt="contact-img"></img>
        } else {
            img = null
        }
        return (
            <section className="contact-edit-page">
                <form onSubmit={this.onSaveContact} className="contact-edit-form flex column align-center">
                    {img}
                    <div className="contact-form flex align-center">
                        <FontAwesomeIcon className="fa-icon" icon={faUser} />
                        <input
                            type="text"
                            onChange={this.onChangeInput}
                            value={name}
                            name="name"
                            placeholder="Enter Full Name"
                        />
                    </div>
                    <span className="validation-error ">{this.state.validateName}</span>
                    <div className="contact-form flex align-center">
                        <FontAwesomeIcon className="fa-icon" icon={faPhone} />
                        <input
                            type="text"
                            onChange={this.onChangeInput}
                            value={phone}
                            name="phone"
                            placeholder="Enter Phone Number"
                        />
                    </div>
                    <span className="validation-error ">{this.state.validatePhone}</span>
                    <div className="contact-form flex align-center">
                        <FontAwesomeIcon className="fa-icon" icon={faEnvelope} />
                        <input
                            type="email"
                            onChange={this.onChangeInput}
                            value={email}
                            name="email"
                            placeholder="Entar Email"
                        />
                    </div>
                    <span className="validation-error">{this.state.validateEmail}</span>
                    <div className="action-btns flex space-between">
                        <button formNoValidate type="submit" className="save-btn">Save</button>
                        <NavLink to={`/contacts`}>Cancel</NavLink>
                    </div>
                </form>
            </section>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        contact: state.contactReducer.contact,
     };
};

const mapDispatchToProps = {
    getContactById,
    saveContact
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactEdit);

