import * as tokenService from '../utils/tokenservice';
import tellMemifyto from './tellMemifyto';

const create = (data) => {
  console.log(data);
  return tellMemifyto.post('/users', data);
};

const login = (data) => {
  return tellMemifyto.post('/auth/login', data);
};

// const logout = (data)

function getUser() {
  let user = tokenService.getUserFromToken();
  console.log('DECODED USER FROM GET USER FUNCTION IN USER SERVICE: ', user);
  return user;
}

export { create, login, getUser };
