import './HomePage.scss'
import React, { Component } from 'react'
import { withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadUser, addUser } from '../../store/actions/userActions'
import { bitcoinService } from '../../services/BitcoinService'
import { eventBus } from '../../services/eventBusService';
import Chart from '../../cmps/Chart'
import Converter from '../../cmps/Converter'
import moment from 'moment'
import img1 from '../../assets/img/img1.png'
import img2 from '../../assets/img/img2.png'
import img3 from '../../assets/img/img3.png'
import bgImg from '../../assets/img/bg-img.png'


class _HomePage extends Component {
    mounted = false;
    state = {
        marketPrices: [],
        name: ''
    }

    componentDidMount() {
        this.mounted = true;
        this.setChart()
        this.getUser()
    }

    async getUser() {
        const user = await this.props.loadUser();
        if (!user) {
            console.log('no user!');
            this.props.history.push('/signup');
            return;
        }
        if (this.mounted && user) {
            const {user} = this.props
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
        const { value } = ev.target;
        this.setState({ name: value });
    };

    async onSignUp() {
        await this.props.addUser({ name: this.state.name })
        // this.props.history.push('/userProfile')
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
                        <input placeholder="Enter Full Name" value={this.state.name} type="text" onChange={this.onChangeInput}></input>
                        <button type="submit">Get Started</button>
                    </form>
                </section>
                    <div className="home-page-chart flex justify-center align-center">
                        <Chart data={marketPrices} title="Market Price" color="rgb(22, 82, 240)" />
                    </div>
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
                <Converter></Converter>
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


const mapStateToProps = (state) => {
    return {
        user: state.userReducer.user
    };
};

const mapDispatchToProps = {
    loadUser,
    addUser
};

_HomePage = withRouter(_HomePage)

export default connect(mapStateToProps, mapDispatchToProps)(_HomePage);