======
KAIZEN CLI
======

--------------------------
``kaizen add <package>``
--------------------------

  To install KAIZEN package e.g. bluzelle, nkn or boilerplate

**Parameters:**
  
  **name** - optional, specify the project name when execute *kaizen add boilerplate*
  
  **library** - optional, specify the library want to include react or vue, when execute *kaizen add boilerplate.







--------------------------
``kaizen remove <package>``
--------------------------

  To uninstall KAIZEN package e.g. bluzelle, nkn or boilerplate

**Parameters:**
  
  **package** - require, bluzelle or nkn
  






----------------
``kaizen set-ipfs --host <host> --port <port> --protocol <protocol>``
----------------

  Setting IPFS configuration for IPFS API usage
  
**Parameters:**

  **host** - required, e.g. ipfs.infura.io
  
  **port** -  required, e.g. 5001
    
  **protocol** - required, e.g. https
  
  
  
  
  
  
  
----------------
``$ kaizen set-ethereum --network <network id> --port <port> --provider <provider>``
----------------

  Setting Ethereum configuration
  
**Parameters:**

  **network** - required, e.g. 3 which mean Ropsten testnet
  
  **port** - required, e.g. 8545
    
  **provider** - required, e.g. https://ropsten.infura.io/you-infura-key
  
  
  
  
  
  
  
  
  
  
  
----------------
``$ kaizen set-nkn --identifier <identifier> --private-key <private key> --rpc-server <seed RPC server address>``
----------------

  Setting NKN configuration
  
**Parameters:**

  **identifier** - required,
  
  **private-key** - required,
    
  **rpc-server** - required,
  
  
  
  
  
  

    
----------------
``$ kaizen ipfs upload <file|directory path>``
----------------

  User can specify the path and upload to IPFS.
  Should use 'kaizen set-ipfs' to setting IPFS configuration first
  
**Parameters:**

  **file|directory path** - optional, default is current terminal position
  
  
  
  
  
  
  
  
  
  
  
  
  

----------------
``$ kaizen test contracts``
----------------

  To execute truffle testing scripts
  
  
  


  
  

----------------
``$ kaizen compile contracts``
----------------

  To execute truffle testing scripts
  
  
  
  
  

----------------
``$ kaizen deploy contracts``
----------------

  To execute truffle testing scripts
