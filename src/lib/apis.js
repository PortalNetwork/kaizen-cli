const axios = require('axios');

exports.apiUserLogin = (email, password) => {
  return axios.post('https://api.portal.network/user/v1/signIn', {
    email,
    password
  });
}

exports.apiUserLogout = (idToken) => {
  return axios.post('https://api.portal.network/user/v1/signOut', null, {
    headers: {
      Authorization: idToken
    }
  });
}

exports.apiUserRefresh = (refreshToken, email) => {
  return axios.post('https://api.portal.network/user/v1/refresh', {
    refreshToken,
    email
  });
}

exports.apiKaizenInstanceList = (idToken) => {
  return axios.get('https://api.portal.network/kaizen/v1/instance/list', {
    headers: {
      Authorization: idToken
    }
  });
}

exports.apiKaizenInstanceInfo = (idToken, instanceId, type) => {
  return axios.get('https://api.portal.network/kaizen/v1/instance/info', {
    headers: {
      Authorization: idToken
    },
    params: {
      id: instanceId,
      type: type
    }
  })
}

exports.apiKaizenCreateSharedInstance = (idToken, protocol, network) => {
  return axios.post('https://api.portal.network/kaizen/v1/instance/shared', {
    protocol: protocol,
    network: network
  }, {
    headers: {
      Authorization: idToken
    }
  })
}

exports.apiKaizenCreatePublicInstance = (idToken, name, protocol, network, region, provider) => {
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
  })
}

exports.apiKaizenCreatePrivateInstance = (idToken, name, protocol, region, provider) => {
  return axios.post('https://api.portal.network/kaizen/v1/instance/private', {
    name: name,
    protocol: protocol,
    region: region,
    provider: provider
  }, {
    headers: {
      Authorization: idToken
    }
  })
}
