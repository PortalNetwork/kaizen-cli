const HelloWorld = artifacts.require('../HelloWorld.sol');

contract('HelloWorld', function (accounts) {
  let hw;
  beforeEach('setup contract for each test', async function () {
    hw = await HelloWorld.new()
  })

  it('should say Hello World', async function () {
    assert.equal(await hw.sayHelloWorld(), "Hello World")
  })
})