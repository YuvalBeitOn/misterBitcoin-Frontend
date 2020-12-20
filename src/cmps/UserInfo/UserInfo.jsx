import React from 'react'
import './UserInfo.scss'
import usdImg from '../../assets/icons/coins.png'
import bitcoinImg from '../../assets/icons/bitcoin.png'


export default function UserInfo(props) {
    const { user, rate } = props;
    const userUsdRate = (1 / rate * user.coins).toFixed(2)
    return (
        <div className="user-info flex column">
            <img className="user-img" src={user.imgUrl} alt="user-img" />
            <span className="user-title">Hello {user.name}!</span>
            <span className="coins-txt"><img className="coins-img" src={usdImg} alt="usd-img"></img> <strong>USD: </strong> {userUsdRate}</span>
            <span className="coins-txt"><img className="coins-img" src={bitcoinImg} alt="bitcoin-img"></img> <strong>BTC: </strong> {user.coins}</span>
        </div>
    )
}
