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
            this.setState({ errMsg: 'Amount is required' })
            setTimeout(() => {
                this.setState({ errMsg: null });
            }, 2000);
            return;
        }
        const { bitcoin, toCurr } = this.state
        console.log('bitcoin, toCurr:', bitcoin, toCurr);
        let rate;
        if (navigator.onLine) rate = await bitcoinService.getRate(toCurr)
        else rate = JSON.parse(localStorage.getItem('rate'));
        console.log('rate:', rate);
        const res = (1 / +rate * +bitcoin).toFixed(5)
        console.log('res:', res);
        this.setState({ res });

    }

    handleChange = (ev) => {
        const { value, name, type } = ev.target;
        this.setState({ [name]: type === 'number' ? +value : value });
    };

    render() {
        const { res, bitcoin, toCurr } = this.state
        return (
            <section className="converter-container flex align-center justify-center">
                <form className="convert-form flex column space-between align-center" onSubmit={this.onConvert}>
                    <div>
                        <input
                            type="number"
                            onChange={this.handleChange}
                            value={bitcoin}
                            name="bitcoin"
                            placeholder="Enter amount"
                        />
                        <span className="from-currency">BTC</span>
                        <FontAwesomeIcon className="fa-icon" icon={faArrowRight} />
                        <select className="form-control" type="text" name="toCurr" onChange={this.handleChange} required>
                            <option>USD</option>
                            <option>GBP</option>
                            <option>EUR</option>
                            <option>CAD</option>
                        </select>
                    </div>
                    <span className="validation-error">{this.state.errMsg}</span>
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

