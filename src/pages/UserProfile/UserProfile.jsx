import React from 'react'
import './UserProfile.scss'
import { userService } from '../../services/UserService'
import { bitcoinService } from '../../services/BitcoinService'
import MoveList from '../../cmps/MovesList/MovesList'
import UserInfo from '../../cmps/UserInfo/UserInfo'
import Chart from '../../cmps/Chart/Chart'
import moment from 'moment'



export default class UserProfile extends React.Component {
    mounted = false;
    state = {
        user: null,
        rate: null
    }

    async getRate() {
        const rate = await bitcoinService.getRate();
        this.setState({ rate })
    }

    async componentDidMount() {
        this.mounted = true;
        const user = await userService.getUser();
        if (user && this.mounted) this.setState({ user })
        this.getRate()
    }

    render() {
        const { user, rate } = this.state
        if (!user) return <div>Loading...</div>
        console.log(user, rate);
        let userMovesCopy = JSON.parse(JSON.stringify(user.moves))
        userMovesCopy = userMovesCopy.map(move => {
            move.at = moment(move.at).format('MMM Do');
            move = { x: move.at, y: move.amount }
            return move;
        })
        console.log('userMovesCopy:', userMovesCopy);
        return (
            <section className="user-profile flex column justify-center align-center">
                <div className="user-profile-container flex space-between">
                    <UserInfo user={user} rate={rate} />
                    <div className="move-list-container"><MoveList moves={user.moves} isInContact={false} /></div>
                </div>
                <div className="chart-container">
                    <Chart className="user-chart" data={userMovesCopy} title="Bitcoin transfer" desc="My Bitcoin transfers in the last month" color="green" />
                </div>
            </section>
        )
    }
}



