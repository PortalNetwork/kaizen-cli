"use strict";

var axios = require('axios');

exports.apiUserLogin = function (email, password) {
  return axios.post('https://api.portal.network/user/v1/signIn', {
    email: email,
    password: password
  });
};

exports.apiUserLogout = function (idToken) {
  return axios.post('https://api.portal.network/user/v1/signOut', null, {
    headers: {
      Authorization: idToken
    }
  });
};

exports.apiUserRefresh = function (refreshToken, email) {
  return axios.post('https://api.portal.network/user/v1/refresh', {
    refreshToken: refreshToken,
    email: email
  });
};

exports.apiKaizenInstanceList = function (idToken) {
  return axios.get('https://api.portal.network/kaizen/v1/instance/list', {
    headers: {
      Authorization: idToken
    }
  });
};

exports.apiKaizenInstanceInfo = function (idToken, instanceId, type) {
  return axios.get('https://api.portal.network/kaizen/v1/instance/info', {
    headers: {
      Authorization: idToken
    },
    params: {
      id: instanceId,
      type: type
    }
  });
};

exports.apiKaizenCreateSharedInstance = function (idToken, protocol, network) {
  return axios.post('https://api.portal.network/kaizen/v1/instance/shared', {
    protocol: protocol,
    network: network
  }, {
    headers: {
      Authorization: idToken
    }
  });
};

exports.apiKaizenCreatePublicInstance = function (idToken, name, protocol, network, region, provider) {
  return axios.post('https://api.portal.network/kaizen/v1/instance/public', {
    name: name,
    protocol: protocol,
    network: network,
    region: region,
    provider: provider
  }, {
    headers: {
      Authorization: idToken
    }
  });
};

exports.apiKaizenCreatePrivateInstance = function (idToken, name, protocol, region, provider) {
  return axios.post('https://api.portal.network/kaizen/v1/instance/private', {
    name: name,
    protocol: protocol,
    region: region,
    provider: provider
  }, {
    headers: {
      Authorization: idToken
    }
  });
};