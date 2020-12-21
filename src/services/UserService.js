export const userService = {
    getUser,
    signup,
    addMove
}

let gUsers = _getUsers()

function _getUsers() {
    let users = JSON.parse(localStorage.getItem('users'));
    if (!users || !users.length) {
        users = [];
        localStorage.setItem('users', JSON.stringify(users))
    }
    return users
}

function getUser() {
    return new Promise((resolve, reject) => {
        if (!gUsers || !gUsers.length) reject('No Users are signed up');
        const user = gUsers[0];
        user ? resolve(JSON.parse(JSON.stringify(user))) : reject('User not found');
    });
}

function signup(user) {
    return new Promise( async (resolve, reject) =>  {
        user.coins = 100;
        user.moves = [];
        user._id = _makeId();
        user.imgUrl = `https://robohash.org/${user.name}?set=set5`;
        gUsers.unshift(user)
        localStorage.setItem('users', JSON.stringify(gUsers))
        resolve(user);
    });
}

async function addMove(move) {
    const user = await getUser()
    user.coins = user.coins - move.amount;
    user.moves.unshift(move);
    _updateUser(user)
    return user
}

function _updateUser(user) {
    const userIdx = gUsers.findIndex(currUser => currUser._id === user._id)
    if (userIdx !== -1) {
        gUsers.splice(userIdx, 1, user)
        localStorage.setItem('users', JSON.stringify(gUsers))
    }
}

function _makeId(length = 10) {
    let txt = '';
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

