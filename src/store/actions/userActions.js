import { userService } from '../../services/UserService';


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
 
export function addUser(user) {
    return async (dispatch) => {
        const newUser = await userService.signup(user);
        dispatch({ type: "SAVE_USER", newUser })
    }
}
 
export function addMove(move) {
    return async (dispatch) => {
        const newUser = await userService.addMove(move);
        dispatch({ type: "SAVE_USER", newUser })
    }
}