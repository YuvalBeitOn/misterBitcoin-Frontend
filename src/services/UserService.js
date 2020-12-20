import userImg1 from '../assets/img/user1.png'
import userImg2 from '../assets/img/user2.png'
import userImg3 from '../assets/img/user3.png'
import userImg4 from '../assets/img/user4.png'
import userImg5 from '../assets/img/user5.png'

export const userService = {
    getUser,
    signup,
    addMove
}

const usersImg = [userImg1, userImg2, userImg3, userImg4, userImg5]

let gUsers = _getUsers()

function _getUsers() {
  let users = JSON.parse(localStorage.getItem('users'));
  if (!users || !users.length) {
    users = [];
    localStorage.setItem('users', JSON.stringify(users))
  }
  return users
}

// function getUser() {
//   return new Promise((resolve, reject) => {
//     if(!gUsers || !gUsers.length) reject('No Users are signed up'); 
//     const user = gUsers.find((user) => user);  
//     user ? resolve(JSON.parse(JSON.stringify(user))) : reject("No user was found");
//   });
// }

function getUser() {
    if(!gUsers || !gUsers.length) return
    const user = gUsers.find((user) => user);  
    if (user ) return user
    else return
}

function signup(user) {
  return new Promise((resolve, reject) => {
    user.coins = 100;
    user.moves = [];
    user._id = _makeId();
    user.imgUrl = usersImg[Math.floor(Math.random() * 5)];
    gUsers.unshift(user)
    localStorage.setItem('users', JSON.stringify(gUsers))
    resolve(user);
  });
}

async function addMove(move) {
  const user = await getUser()
  user.coins = user.coins - move.amount;
  user.moves.unshift(move);
  const userIdx = gUsers.findIndex(currUser => currUser._id === user._id)
  if(userIdx !== -1){
    gUsers.splice(userIdx, 1, user)
    localStorage.setItem('users', JSON.stringify(gUsers))
  }
  console.log('user after add move:', user);
  return user
}

function _makeId(length = 10) {
  let txt = "";
  let possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return txt;
}
