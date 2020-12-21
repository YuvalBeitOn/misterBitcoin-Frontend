const INITIAL_STATE = {
  users: [],
  user: null,
};

export function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.user };
    case "SAVE_USER":
      return {
        ...state,
        users: [...state.users, action.newUser]
      };

    default: return state;
  }
}

