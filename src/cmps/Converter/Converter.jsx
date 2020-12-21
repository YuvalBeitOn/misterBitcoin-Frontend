import './Converter.scss'
import React, { Component } from 'react'
import { bitcoinService } from '../../services/BitcoinService'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default class Converter extends Component {
    state = {
        bitcoin: '',
        toCurr: 'USD',
        res: null,
        errMsg: ''

    }

    onConvert = async (ev) => {
        ev.preventDefault()
        if (!this.state.bitcoin) {
            this.setState({errMsg: 'Amount is required'})
            setTimeout(() => {
                this.setState({ errMsg: null });
            }, 2000);
            return;
        }
        const { bitcoin, coin } = this.state
        const rate = await bitcoinService.getRate(coin)
        const res = (1 / +rate * +bitcoin).toFixed(5)
        this.setState({ res });
    }

    onChangeInput = (ev) => {
        const { value, name } = ev.target;
        this.setState({ [name]: +value });
    };

    onChangeSelect = (ev) => {
        const { value, name } = ev.target;
        this.setState({ [name]: value });
    };

    render() {
        const { res, bitcoin, toCurr } = this.state
        return (
            <section className="converter-container flex align-center justify-center">
                <form className="convert-form flex column space-between align-center" onSubmit={this.onConvert}>
                    <div>
                        <input
                            type="number"
                            onChange={this.onChangeInput}
                            value={bitcoin}
                            name="bitcoin"
                            placeholder="Enter amount"
                        />
                        <span className="from-currency">BTC</span>
                        <FontAwesomeIcon className="fa-icon" icon={faArrowRight} />
                        <select className="form-control" name="toCurr" onChange={this.onChangeSelect} required>
                            <option>USD</option>
                            <option>GBP</option>
                            <option>EUR</option>
                            <option>CAD</option>
                        </select>
                    </div>
                    <span className="validation-error">{ this.state.errMsg }</span>
                {res &&
                    <div className="result">
                        <span className="given-amount">{bitcoin}</span>
                        <span className="base-currency">BTC</span>
                        <FontAwesomeIcon className="fa-icon" icon={faArrowRight} />
                        <span className="final-result">{res}</span>
                        <span className="second-currency">{toCurr}</span>
                    </div>}
                    <button className="calculate-btn" type="submit">Convert</button>
                </form>
            </section>
        )
    }
}

