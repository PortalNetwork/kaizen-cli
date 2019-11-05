const AWS = require('aws-sdk');
const fs = require('fs');
const ami = require('./ami.js');

/**
 * DOCS: https://docs.aws.amazon.com/zh_tw/AWSEC2/latest/UserGuide/user-data.html
 */
class AWSService {

  constructor(accessKeyId, secretAccessKey, region) {
    this.keyPem = 'kaizen-cli';
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
      //console.log(JSON.stringify(keyPair));
      fs.writeFileSync(keyPair.KeyName + '.pem', keyPair.KeyMaterial, 'utf8');
      return keyPair;
    } catch (err) {
      console.log(err);
    }
  }

  async deleteKeyPair(keyName) {
    try {
      const ec2 = new AWS.EC2({apiVersion: '2016-11-15'});
      const params = {
        KeyName: keyName
      };
      const result = await ec2.deleteKeyPair(params).promise();
      console.log(result);
      return true;
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
      let instanceParams = ami.ami[node];
      instanceParams.KeyName = this.keyPem;

      const ec2 = new AWS.EC2({apiVersion: '2016-11-15'});
      const instance = await ec2.runInstances(instanceParams).promise();
      const instanceId = instance.Instances[0].InstanceId;
      const instanceType = instance.Instances[0].InstanceType;
      const tagParams = {Resources: [instanceId], Tags: [
        {
           Key: 'Name',
           Value: node
        }
      ]};
      await ec2.createTags(tagParams).promise();

      return {instanceId, instanceType, publicDNS: instance.PublicDnsName, name: node, template: node};
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
