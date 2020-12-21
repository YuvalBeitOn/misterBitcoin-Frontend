import React, { Component } from "react";
import './TransferFund.scss'

export default class TransferFund extends Component {
    state = {
        fund: '',
        errMsg: '',
        successMsg: ''
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
        this.sendUserMsg("Successful transfer");
        this.setState({ fund: '' });
    };

    changeFund = (ev) => {
        const { value, name } = ev.target;
        this.setState({ [name]: +value });
    };

    sendUserMsg = (msg) => {
        if (msg !== "Successful transfer") this.setState({ errMsg: msg });
        else this.setState({ successMsg: msg });
        setTimeout(() => {
            this.setState({ errMsg: null, successMsg: null });
        }, 3000);
    };

    render() {
        const { errMsg, successMsg } = this.state
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
                {errMsg && <div className="user-msg err-msg">{errMsg}</div>}
                {successMsg && <div className="user-msg success-msg">{successMsg}</div>}
            </section>
        );
    }
}
