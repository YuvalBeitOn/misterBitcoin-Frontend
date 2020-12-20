import React, { Component } from "react";
import './TransferFund.scss'

export default class TransferFund extends Component {
    state = {
        fund: '',
        userMsg: '',
    };

    onTransferFund = (ev) => {
        ev.preventDefault()
        const { fund } = this.state;
        if (!fund) {
            this.sendUserMsg("Amount is required");
            return;
        }
        if (fund > this.props.maxCoins) {
            this.sendUserMsg("Unapproved transfer");
            return;
        }
        this.props.transferFund(fund);
        this.sendUserMsg(`Successful transfer`);
        this.setState({ fund: '' });
    };

    changeFund = (ev) => {
        const { value, name } = ev.target;
        this.setState({ [name]: +value });
    };

    sendUserMsg = (msg) => {
        this.setState({ userMsg: msg });
        setTimeout(() => {
            this.setState({ userMsg: null });
        }, 3000);
    };

    render() {
        const {userMsg} = this.state
        let msg;
        if (userMsg) msg = <div className="user-msg">{this.state.userMsg}</div>
        else msg = null
        return (
            <section className="transfer-fund flex column">
                <span className="transfer-title">Transfer coins to {this.props.contactName}: </span>
                <form className="transfer-form" onSubmit={this.onTransferFund}>
                    <input
                        name="fund"
                        type="number"
                        onChange={this.changeFund}
                        value={this.state.fund}
                        placeholder="Amount to transfer"
                    />
                    <button type="submit" className="transfer-btn">Transfer</button>
                </form>
                {msg}
            </section>
        );
    }
}
