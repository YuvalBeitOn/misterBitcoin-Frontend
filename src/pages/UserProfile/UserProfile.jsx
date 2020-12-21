import './UserProfile.scss'
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { loadUser } from '../../store/actions/userActions'
import { bitcoinService } from '../../services/BitcoinService'
import MoveList from '../../cmps/MovesList'
import UserInfo from '../../cmps/UserInfo'
import Chart from '../../cmps/Chart/Chart'
import moment from 'moment'
class UserProfile extends Component {
    state = {
        rate: null
    }

    async componentDidMount() {
        await this.props.loadUser();
        const rate = await bitcoinService.getRate();
        this.setState({ rate })
    }

    render() {
        const { user } = this.props
        const { rate } = this.state
        if (!user) return <div>Loading...</div>
        let userMovesCopy = JSON.parse(JSON.stringify(user.moves))
        userMovesCopy = userMovesCopy.map(move => {
            move.at = moment(move.at).format('MMM Do');
            move = { x: move.at, y: move.amount }
            return move;
        })
        const lastUserMoves = JSON.parse(JSON.stringify(user.moves)).slice(0, 3)
        return (
            <section className="user-profile flex column justify-center align-center">
                <div className="user-profile-container flex space-between">
                    <UserInfo user={user} rate={rate} />
                    <div className="move-list-container"><MoveList moves={lastUserMoves} isInContact={false} /></div>
                </div>
                <div className="chart-container">
                    <Chart className="user-chart" data={userMovesCopy} title="Bitcoin transfer" desc="My Bitcoin transfers in the last month" color="green" />
                </div>
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
    loadUser
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);


