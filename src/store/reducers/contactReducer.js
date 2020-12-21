const INITIAL_STATE = {
    contacts: [],
    contact: null
}

export function contactReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'SET_CONTACTS':
            return { ...state, contacts: action.contacts }
        case 'SET_CONTACT':
            return { ...state, contact: action.contact }
        case 'UPDATE_CONTACT':
            return {
                ...state,
                contacts: state.contacts.map(contact => {
                    if (contact._id === action.contact._id) return action.contact;
                    return contact;
                })
            }
        default: return state
    }
}

