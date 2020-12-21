import { userService } from '../../services/UserService';

// READ
export function loadUser() {
    return async (dispatch) => {
        try {
            const user = await userService.getUser();
            dispatch({ type: "SET_USER", user });
            return user
        } catch {
            return
        }
    };
}

// CREATE 
export function addUser(user) {
    return async (dispatch) => {
        const newUser = await userService.signup(user);
        dispatch({ type: "SAVE_USER", newUser })
    }
}

// UPDATE 
export function addMove(move) {
    return async (dispatch) => {
        const newUser = await userService.addMove(move);
        dispatch({ type: "SAVE_USER", newUser })
    }
}