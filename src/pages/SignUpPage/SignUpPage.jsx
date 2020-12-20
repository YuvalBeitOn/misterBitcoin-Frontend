import React, { Component } from 'react'
import { userService } from "../../services/UserService";
import './SignUpPage.scss'
import bitcoinImg from '../../assets/img/bitcoin.png'

export default class SignUpPage extends Component {
    state = {
        name: '',
    }

    onChangeInput = (ev) => {
        console.log(ev);
        const { value } = ev.target;
        this.setState({ name: value });
    };

    onSignUp = async (ev) => {
        ev.preventDefault();
        await userService.signup({ ...this.state })
        this.props.history.push('/')
    }


    render() {
        return (
            <section className="signup-page flex column align-center">
                <img className="bitcoin-img" src={bitcoinImg} alt="bitcoin-img"></img>
                <form onSubmit={this.onSignUp} className="flex column align-center">
                    <div className="signup-form flex column align-center" >
                        <label htmlFor="name">Please enter your name:</label>
                        <input
                            type="text"
                            value={this.state.name}
                            onChange={this.onChangeInput} />
                        <span className="validation-error">Name is required</span>
                    </div>
                    <button type="submit" className="save-btn btn">Save</button>
                </form>
            </section>

        )
    }
}

