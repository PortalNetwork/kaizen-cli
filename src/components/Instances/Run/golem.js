const Log = require('../../../lib/Log');
const AWSService = require('../../../lib/aws/AWSService');
const path = require('path');
const fsx = require('fs-extra');

module.exports = async function(instance, type) {
  try {
    const kaizenrc = fsx.readJsonSync(path.resolve(__dirname, '../../../../.kaizenrc'));
    let region = 'us-east-1';
    if (!kaizenrc['accessKey']) {
      Log.NormalLog(`Please set AWS access key by 'kaizen config set --key accessKey --value [Access Key Value]'`);
    }
    if (!kaizenrc['secretKey']) {
      Log.NormalLog(`Please set AWS secret key by 'kaizen config set --key secretKey --value [Secret Key Value]'`);
    }
    if (kaizenrc['region']) {
      region = kaizenrc['region'];
    }

    const awsService = new AWSService(kaizenrc['accessKey'], kaizenrc['secretKey'], region);

    const isExists = await awsService.isKeyPairsExists('kaizen-cli');

    let keyPair = 'kaizen-cli';
    if (!isExists) {
      Log.NormalLog('Creating Key Pair:\n'.underline.yellow + 'kaizen-cli.pem'.yellow);
      keyPair = await awsService.createKeyPair();
    }

    const instance = await awsService.runInstance(instance, type);

    let instances = [];
    if (kaizenrc['instances']) {
      instances = kaizenrc['instances'];
    }
    instances.push(instance);
    
    const configuration = {
      ...kaizenrc,
      "keyPair": keyPair,
      "instances": instances
    }
    fsx.writeJsonSync(path.resolve(__dirname, '../../../../.kaizenrc'), configuration);
  } catch (error) {
    Log.ErrorLog('something went wrong!');
    console.error(error);
  }
}
