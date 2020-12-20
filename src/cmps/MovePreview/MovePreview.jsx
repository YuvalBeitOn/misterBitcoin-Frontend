import React from 'react'
import moment from 'moment'
import './MovePreview.scss'

export default function MovePreview(props) {
    const move = props.move;
    const isInContact = props.isInContact
    // console.log(move);
    let toContact;
    if (!isInContact) {
        toContact = <span><strong>To: </strong> {move.to} </span>
    } else {
        toContact = null
    }
    return (
        <li className="move-preview flex column">
            {toContact}
            <span><strong>At:</strong> {moment(move.at).format('MMMM Do YYYY, h:mm:ss a')}</span>
            <span><strong>Amount:</strong> {move.amount} coins</span>
        </li>
    )
}
