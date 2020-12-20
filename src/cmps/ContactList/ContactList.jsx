import { Link } from 'react-router-dom';
import  ContactPreview  from '../ContactPreview/ContactPreview';
import './ContactList.scss'
export function ContactList({ contacts }) {
    return (
        <ul className="contact-list clean-list">
            {
                contacts.map(contact => <Link key={contact._id} to={`contact/${contact._id}`}><ContactPreview contact={contact} /></Link>)
            }
        </ul>
    )
}
