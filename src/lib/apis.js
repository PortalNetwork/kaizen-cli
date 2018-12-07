const axios = require('axios');

exports.apiLogin = function apiLogin(email, password) {
  return axios.post('https://api.portal.network/user/v1/signIn', {
    email,
    password
  });
}

exports.apiLogout = function apiLogout(idToken) {
  return axios.post('https://api.portal.network/user/v1/signOut', null, {
    headers: {
      Authorization: idToken
    }
  });
}

exports.apiRefreshToken = function (refreshToken, email) {
  return axios.post('https://api.portal.network/user/v1/refresh', {
    refreshToken,
    email
  })
}
