/* Contains all the rest api gateways */
import config from '../../app-config';

const route = [
  {
    id: 0, ip: '10.0.2.2:1080', market: '203.159.31.72:3000', name: 'หมู่บ้านแมว', name_i: 'Mock Server'
  },
  {
    id: 0, ip: '192.168.4.2', market: '203.159.31.72:3000', name: 'หมู่บ้านแมว', name_i: 'Cat Ville'
  },
  {
    id: 0, ip: 'smon1.vclass.in.th', market: '203.159.31.72:3000', name: 'หมู่บ้านแมว', name_i: 'Cat Ville'
  },
  {
    id: 1, ip: 'smon1.vclass.in.th', market: '203.159.31.74:3000', name: 'หมู่บ้านเพนกวิ้น', name_i: 'Penguin Hub'
  },
];

let routeIndex = 1;
if (config.mock) routeIndex = 0;

const REMOTE = {
  wrap: des => `http://${des}/`,
  route: `http://${route[routeIndex].ip}/`,
  market: `http://${route[routeIndex].market}/`,
};

const LOCAL_SMON = 'http://192.168.2.2/smon/';
const POST_KEY = 'atXl4BvzAatlK9dFj8fWqGqUtTUhGw69NPBWu8VyJEF9eF4UTmgz4SIkK3gJCYkOuLydsLR0WxYsCPIP3LPAWjkX6jnlFRo8ea9e';


const API = {
  /* Logs in
   * Params: email, password, pin
   * GET
   */
  loginApi: () => (`${REMOTE.route}api/login`), // POST
  registerEmailApi: () => (`${REMOTE.route}api/verify`), // POST
  registerApi: () => (`${REMOTE.route}api/register`), // POST
};

export {
  API,
  REMOTE,
  LOCAL_SMON,
  POST_KEY,
};
