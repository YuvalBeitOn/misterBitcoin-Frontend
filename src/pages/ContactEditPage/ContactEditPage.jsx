import React, { Component } from "react";
import { Link } from 'react-router-dom';
import './ContactEditPage.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { contactService } from "../../services/ContactService.js";

export default class ContactEdit extends Component {
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
        let contact;
        if (id) {
            contact = await contactService.getContactById(id)
            this.setState({ isEditMode: true });
        } else {
            contact = contactService.getEmptyContact()
        }
        this.setState({ ...contact });
    }

    validateForm = () => {
        let validateName = '';
        let validateEmail = '';

        if (!this.state.name) {
            validateName = 'Name is required'
        }
        if (!this.state.email || !this.state.email.includes('@') || !this.state.email.includes('.')) {
            validateEmail = 'Email is invalide'
        }
        if (validateName || validateEmail) {
            this.setState({ validateName, validateEmail })
            return false
        }
        return true
    }

    handleChange = (ev) => {
        const { value, name } = ev.target;
        this.setState({ [name]: value });
    };

    saveContact = async (ev) => {
        ev.preventDefault();
        const isValid = this.validateForm();
        if (isValid) {
            const contact = await contactService.saveContact({ ...this.state });
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
                <form onSubmit={this.saveContact} className="contact-edit-form flex column align-center">
                    {img}
                    <div className="contact-form flex align-center">
                        <FontAwesomeIcon className="fa-icon" icon={faUser} />
                        <input
                            type="text"
                            onChange={this.handleChange}
                            value={name}
                            name="name"
                            placeholder="Enter Full Name"
                        />
                    </div>
                    <span className="validation-error">{this.state.validateName}</span>
                    <div className="contact-form flex align-center">
                        <FontAwesomeIcon className="fa-icon" icon={faPhone} />
                        <input
                            type="text"
                            onChange={this.handleChange}
                            value={phone}
                            name="phone"
                            placeholder="Enter Phone Number"
                        />
                    </div>
                    <div className="contact-form flex align-center">
                        <FontAwesomeIcon className="fa-icon" icon={faEnvelope} />
                        <input
                            type="email"
                            onChange={this.handleChange}
                            value={email}
                            name="email"
                            placeholder="Entar Email"
                        />
                    </div>
                    <span className="validation-error">{this.state.validateEmail}</span>
                    <div className="action-btns flex space-between">
                        <button formNoValidate type="submit" className="save-btn">Save</button>
                        <Link to={`/contacts`}>Cancel</Link>
                    </div>
                </form>
            </section>
        );
    }
}

