const api = require('kaizen-cli/src/lib/apis');

describe('api test', async () => {
  it('Get instance list', async () => {
    let idToken = "";
    const instanceList = await api.apiKaizenInstanceList(idToken);
    console.log(instanceList);
  });
});
