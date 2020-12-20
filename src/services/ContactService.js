import userImg1 from '../assets/img/user1.png'
import userImg2 from '../assets/img/user2.png'
import userImg3 from '../assets/img/user3.png'
import userImg4 from '../assets/img/user4.png'
import userImg5 from '../assets/img/user5.png'

export const contactService = {
  getContacts,
  getContactById,
  deleteContact,
  saveContact,
  getEmptyContact
}

const contacts = [
  {
    "_id": "5a56640269f443a5d64b32ca",
    "name": "Ochoa Hyde",
    "email": "ochoahyde@renovize.com",
    "phone": "+1 (968) 593-3824"
  },
  {
    "_id": "5a5664025f6ae9aa24a99fde",
    "name": "Hallie Mclean",
    "email": "halliemclean@renovize.com",
    "phone": "+1 (948) 464-2888"
  },
  {
    "_id": "5a56640252d6acddd183d319",
    "name": "Parsons Norris",
    "email": "parsonsnorris@renovize.com",
    "phone": "+1 (958) 502-3495"
  },
  {
    "_id": "5a566402ed1cf349f0b47b4d",
    "name": "Rachel Lowe",
    "email": "rachellowe@renovize.com",
    "phone": "+1 (911) 475-2312"
  },
  {
    "_id": "5a566402abce24c6bfe4699d",
    "name": "Dominique Soto",
    "email": "dominiquesoto@renovize.com",
    "phone": "+1 (807) 551-3258"
  },
  {
    "_id": "5a566402a6499c1d4da9220a",
    "name": "Shana Pope",
    "email": "shanapope@renovize.com",
    "phone": "+1 (970) 527-3082"
  },
  {
    "_id": "5a566402f90ae30e97f990db",
    "name": "Faulkner Flores",
    "email": "faulknerflores@renovize.com",
    "phone": "+1 (952) 501-2678"
  },
  {
    "_id": "5a5664027bae84ef280ffbdf",
    "name": "Holder Bean",
    "email": "holderbean@renovize.com",
    "phone": "+1 (989) 503-2663"
  },
  {
    "_id": "5a566402e3b846c5f6aec652",
    "name": "Rosanne Shelton",
    "email": "rosanneshelton@renovize.com",
    "phone": "+1 (968) 454-3851"
  },
  {
    "_id": "5a56640272c7dcdf59c3d411",
    "name": "Pamela Nolan",
    "email": "pamelanolan@renovize.com",
    "phone": "+1 (986) 545-2166"
  },
  {
    "_id": "5a5664029a8dd82a6178b15f",
    "name": "Roy Cantu",
    "email": "roycantu@renovize.com",
    "phone": "+1 (929) 571-2295"
  },
  {
    "_id": "5a5664028c096d08eeb13a8a",
    "name": "Ollie Christian",
    "email": "olliechristian@renovize.com",
    "phone": "+1 (977) 419-3550"
  },
  {
    "_id": "5a5664026c53582bb9ebe9d1",
    "name": "Nguyen Walls",
    "email": "nguyenwalls@renovize.com",
    "phone": "+1 (963) 471-3181"
  },
  {
    "_id": "5a56640298ab77236845b82b",

    "name": "Glenna Santana",
    "email": "glennasantana@renovize.com",
    "phone": "+1 (860) 467-2376"
  },
  {
    "_id": "5a56640208fba3e8ecb97305",
    "name": "Malone Clark",
    "email": "maloneclark@renovize.com",
    "phone": "+1 (818) 565-2557"
  },
  {
    "_id": "5a566402abb3146207bc4ec5",
    "name": "Floyd Rutledge",
    "email": "floydrutledge@renovize.com",
    "phone": "+1 (807) 597-3629"
  },
  {
    "_id": "5a56640298500fead8cb1ee5",
    "name": "Grace James",
    "email": "gracejames@renovize.com",
    "phone": "+1 (959) 525-2529"
  },
  {
    "_id": "5a56640243427b8f8445231e",
    "name": "Tanner Gates",
    "email": "tannergates@renovize.com",
    "phone": "+1 (978) 591-2291"
  },
  {
    "_id": "5a5664025c3abdad6f5e098c",
    "name": "Lilly Conner",
    "email": "lillyconner@renovize.com",
    "phone": "+1 (842) 587-3812"
  }
];

const usersImg = [userImg1, userImg2, userImg3, userImg4, userImg5]

function addImgToContact() {
  contacts.forEach(contact => {
    contact.imgUrl = usersImg[Math.floor(Math.random() * 5)];
  });
}

addImgToContact()

function getContacts(filterBy = null) {
  return new Promise((resolve, reject) => {
    let contactsToReturn = JSON.parse(localStorage.getItem("contacts"));
    if (!contactsToReturn) {
      contactsToReturn = contacts;
      localStorage.setItem("contacts", JSON.stringify(contactsToReturn));
    }
    if (filterBy) {
      contactsToReturn = filter(filterBy.searchTerm, contactsToReturn);
    }
    resolve(sort(contactsToReturn));
  });
}

function filter(term, contacts) {
  term = term.toLocaleLowerCase();
  console.log(term);
  return contacts.filter((contact) => {
    return (
      contact.name.toLocaleLowerCase().includes(term) ||
      contact.phone.toLocaleLowerCase().includes(term) ||
      contact.email.toLocaleLowerCase().includes(term)
    );
  });
}


function sort(arr) {
  return arr.sort((a, b) => {
    if (a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase()) {
      return -1;
    }
    if (a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase()) {
      return 1;
    }

    return 0;
  });
} 



function getContactById(id) {
  return new Promise((resolve, reject) => {
    let contacts = JSON.parse(localStorage.getItem("contacts"));
    const contact = contacts.find((contact) => contact._id === id);
    contact ? resolve(contact) : reject(`Contact id ${id} not found!`);
  });
}

function deleteContact(id) {
  return new Promise((resolve, reject) => {
    let contacts = JSON.parse(localStorage.getItem("contacts"));
    const idx = contacts.findIndex((contact) => contact._id === id);
    if (idx !== -1) {
      contacts.splice(idx, 1);
    }
    localStorage.setItem("contacts", JSON.stringify(contacts));
    resolve(contacts);
  });
}

function _updateContact(contact) {
  return new Promise((resolve, reject) => {
    let contacts = JSON.parse(localStorage.getItem("contacts"));
    const idx = contacts.findIndex((c) => contact._id === c._id);
    if (idx !== -1) {
      contacts[idx] = contact;
    }
    localStorage.setItem("contacts", JSON.stringify(contacts));
    resolve(contact);
  });
}

function _addContact(contact) {
  return new Promise((resolve, reject) => {
    let contacts = JSON.parse(localStorage.getItem("contacts"));
    contact._id = _makeId();
    contact.imgUrl = usersImg[Math.floor(Math.random() * 5)];
    contacts.push(contact);
    localStorage.setItem("contacts", JSON.stringify(contacts));
    resolve(contact);
  });
}

function saveContact(contact) {
  return contact._id ? _updateContact(contact) : _addContact(contact);
}

function getEmptyContact() {
  return {
    name: "",
    email: "",
    phone: "",
  };
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
