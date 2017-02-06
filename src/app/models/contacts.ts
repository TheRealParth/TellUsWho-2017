import {Contact} from "./contact.model";
import {List} from "immutable";

export const CONTACTS = List<Contact>([
  {
    firstName: 'Scott',
    lastName: 'Stevens',
    email: 'scott.stevens@example.com',
    phone: '(870) 288-4149',
    imageUrl: 'http://api.randomuser.me/portraits/men/49.jpg',
    hasDropped: false,
    groups: []
  },
  {
    firstName: 'Seth',
    lastName: 'Frazier',
    email: 'seth.frazier@example.com',
    phone: '(560) 180-4143',
    imageUrl: 'http://api.randomuser.me/portraits/men/97.jpg',
    hasDropped: false,
    groups: []
  },
  {
    firstName: 'Jean',
    lastName: 'Myers',
    email: 'jean.myers@example.com',
    phone: '(477) 792-2822',
    imageUrl: 'http://api.randomuser.me/portraits/women/90.jpg',
    hasDropped: false,
    groups: []
  },
  {
    firstName: 'Todd',
    lastName: 'Shelton',
    email: 'todd.shelton@example.com',
    phone: '(522) 991-3367',
    imageUrl: 'http://api.randomuser.me/portraits/men/24.jpg',
    hasDropped: false,
    groups: []
  },
  {
    firstName: 'Rosemary',
    lastName: 'Porter',
    email: 'rosemary.porter@example.com',
    phone: '(497) 160-9776',
    imageUrl: 'http://api.randomuser.me/portraits/women/34.jpg',
    hasDropped: false,
    groups: []
  },
  {
    firstName: 'Debbie',
    lastName: 'Schmidt',
    email: 'debbie.schmidt@example.com',
    phone: '(867) 322-1852',
    imageUrl: 'http://api.randomuser.me/portraits/women/56.jpg',
    hasDropped: false,
    groups: []
  },
  {
    firstName: 'Glenda',
    lastName: 'Patterson',
    email: 'glenda.patterson@example.com',
    phone: '(538) 718-7548',
    imageUrl: 'http://api.randomuser.me/portraits/women/76.jpg',
    hasDropped: false,
    groups: []
  },
  {
    firstName: 'Todd',
    lastName: 'Shelton',
    email: 'todd.shelton@example.com',
    phone: '(522) 991-3367',
    imageUrl: 'http://api.randomuser.me/portraits/men/24.jpg',
    hasDropped: false,
    groups: []
  },
  {
    firstName: 'Rosemary',
    lastName: 'Porter',
    email: 'rosemary.porter@example.com',
    phone: '(497) 160-9776',
    imageUrl: 'http://api.randomuser.me/portraits/women/34.jpg',
    hasDropped: false
    groups: []
  },
  {
    firstName: 'Debbie',
    lastName: 'Schmidt',
    email: 'debbie.schmidt@example.com',
    phone: '(867) 322-1852',
    imageUrl: 'http://api.randomuser.me/portraits/women/56.jpg',
    hasDropped: false,
    groups: []
  },
  {
    firstName: 'Glenda',
    lastName: 'Patterson',
    email: 'glenda.patterson@example.com',
    phone: '(538) 718-7548',
    imageUrl: 'http://api.randomuser.me/portraits/women/76.jpg',
    hasDropped: false,
    groups: []
  },

]);
export const TAGS = List<TAG>([
  {
    name:'Close Friends',
    color:'green',
    active:false
  },
  {
    name:'Study Buddies',
    color:'purple',
    active:false
  },
  {
    name:'NJIT housemates',
    color:'red',
    active:false
  }
]);
