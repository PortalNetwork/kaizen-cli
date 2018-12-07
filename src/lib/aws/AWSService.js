const AWS = require('aws-sdk');
const fs = require('fs');
const instance = require('ami.json');

class AWSService {

  constructor(accessKeyId, secretAccessKey, region) {
    this.keyPem = 'kaizen-cli';
    this.instanceType = 't2.micro';
    AWS.config.update({region: region});
    const credentials = new AWS.Credentials(accessKeyId, secretAccessKey, null);
    AWS.config.credentials = credentials;
  }

  async createKeyPair() {
    try {
      const ec2 = new AWS.EC2({apiVersion: '2016-11-15'});
      const params = {
        KeyName: this.keyPem
      };

      const keyPair = await ec2.createKeyPair(params).promise();
      console.log(JSON.stringify(keyPair));
      fs.writeFileSync(keyPair.KeyName + '.pem', keyPair.KeyMaterial, 'utf8');
    } catch (err) {
      console.log(err);
    }
  }

  async isKeyPairsExists(keyName) {
    try {
      const ec2 = new AWS.EC2({apiVersion: '2016-11-15'});
      const keyPairs = await ec2.describeKeyPairs().promise();
      let exists = false;
      keyPairs.KeyPairs.forEach(function(element) {
        if (element.KeyName === keyName) exists = true;
      })
      return exists;
    } catch (err) {
      console.log(err);
    }
  }
  
  async runInstance(node) {
    try {
      // TODO choose AMI_ID, generate Key
      let instanceParams = instance[node];
      instanceParams.KeyName = this.keyPem;
      instanceParams.instanceType = this.instanceType;

      const ec2 = new AWS.EC2({apiVersion: '2016-11-15'});
      const instance = await ec2.runInstances(instanceParams).promise();
      //console.log('instance', instance);
      const instanceId = instance.Instances[0].InstanceId;
      const instanceType = instance.Instances[0].InstanceType;
      const tagParams = {Resources: [instanceId], Tags: [
        {
           Key: 'Name',
           Value: node
        }
      ]};
      const tag = await ec2.createTags(tagParams).promise();

      return {instanceId, instanceType, name: node};
    } catch (err) {
      console.log(err);
    }
  }

  async getInstance(instanceId) {
    try {
      const ec2 = new AWS.EC2({apiVersion: '2016-11-15'});
      const params = {
        InstanceIds: [
          instanceId//"i-086408aa27c5e5042"
        ]
      };

      const instance = await ec2.describeInstances(params).promise();
      //console.log(instance.Reservations[0].Instances);
      return instance.Reservations[0].Instances;
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = AWSService
