import React from 'react'
import { withRouter, NavLink } from 'react-router-dom';
import { userService } from '../../services/UserService'
import { bitcoinService } from '../../services/BitcoinService'
import { eventBus } from '../../services/eventBusService';
import Chart from '../../cmps/Chart'
import moment from 'moment'
import img1 from '../../assets/img/img1.png'
import img2 from '../../assets/img/img2.png'
import img3 from '../../assets/img/img3.png'
import bgImg from '../../assets/img/bg-img.png'

import './HomePage.scss'

class _HomePage extends React.Component {
    mounted = false;
    state = {
        marketPrices: [],
        user: null,
        name: ''
    }

    componentDidMount() {
        this.mounted = true;
        this.setChart()
        this.getUser()
    }

    async getUser() {
        const user = await userService.getUser();
        if (!user) {
            console.log('no user!');
            this.props.history.push('/signup');
            return;
        }
        if (this.mounted && user) {
            this.setState({ user })
            eventBus.emit('user loggedIn', user)
        }
    }


    async setChart() {
        let marketPrices = JSON.parse(localStorage.getItem("marketPrices"))
        if (!marketPrices) {
            marketPrices = await bitcoinService.getmarketPrices()
            localStorage.setItem("marketPrices", JSON.stringify(marketPrices));
        }
        marketPrices = marketPrices.values.map(value => {
            value.x = value.x * 1000;
            value.x = moment(value.x).format('MMM Do');
            return value
        })
        if (this.mounted) this.setState({ marketPrices })
    }

    componentWillUnmount() {
        this.mounted = false
    }

    onChangeInput = (ev) => {
        console.log(ev);
        const { value } = ev.target;
        this.setState({ name: value });
    };

    async onSignUp() {
        await userService.signup({ ...this.state })
        this.props.history.push('/')
    }

    getStarted = (ev) => {
        ev.preventDefault();
        this.onSignUp()
        this.setState({ name: '' });
    }

    render() {
        const { marketPrices } = this.state
        if (!marketPrices) return <div>Loading...</div>
        return (
            <section className="home-page-conatiner">
                <section className="home-page flex column align-center justify-center">
                    <h2 className="title">Buy and sell Bitcoins</h2>
                    <div className="desc">Mr Bitcoin is the easiest place to buy, sell, and manage your Bitcoins.</div>
                    <form onSubmit={this.getStarted}>
                        <input placeholder="Email Full Name" value={this.state.name} type="text" onChange={this.onChangeInput}></input>
                        <button type="submit">Get Started</button>
                    </form>
                    <div className="home-page-chart">
                        <Chart data={marketPrices} title="Market Price" color="rgb(22, 82, 240)" />
                    </div>

                </section>
                <div className="imgs-section flex space-around align-center container">
                    <div className="img-container flex column align-center">
                        <img src={img1} alt="" />
                        <div className="desc">Create an account</div>
                    </div>
                    <div className="img-container flex column align-center">
                        <img src={img2} alt="" />
                        <div className="desc">Connect your coins</div>
                    </div>
                    <div className="img-container flex column align-center">
                        <img src={img3} alt="" />
                        <div className="desc">Start buying & selling</div>
                    </div>
                </div>
                <section className="bg-img-section">
                    <img className="bg-img" src={bgImg} alt="bg-img" />
                    <div className="bg-img-txt">
                        <p className="par1">Earn up to $200 worth of Bitcoins</p>
                        <p className="par2">Discover how specific bitcoins work — and get a bit of each bitcoin to try out for yourself.</p>
                        <NavLink to="/signup" className="start-btn">Start earning</NavLink>
                    </div>
                </section>
            </section>
        )
    }
}

export const HomePage = withRouter(_HomePage)
