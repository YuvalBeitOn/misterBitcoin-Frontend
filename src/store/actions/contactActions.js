import {contactService} from "../../services/ContactService";

export function loadContacts(filterBy) {
    return async (dispatch) => {
        const contacts = await contactService.getContacts(filterBy);
        dispatch({ type: "SET_CONTACTS", contacts });
    };
}


export function getContactById(id) {
    return async (dispatch) => {
        const contact = await contactService.getContactById(id);
        dispatch({ type: "SET_CONTACT", contact });
    };
}


export function saveContact(contact) {
    return async dispatch => {
        const isEdit = contact._id ? true : false;
        contact = await contactService.saveContact(contact);
        if (isEdit) dispatch({ type: 'UPDATE_CONTACT', contact })
        else dispatch({ type: 'ADD_CONTACT', contact })
        return contact;
    }
}


export function deleteContact(id) {
    return async dispatch => {
        await contactService.deleteContact(id);
        dispatch({ type: 'DELETE_CONTACT', id })
    }
}