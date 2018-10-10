======
KAIZEN CLI
======

----------------
``kaizen new``
----------------

  To create the epic web3 integration project which is made by Portal Network**

**Parameters:**

  -n [project-name]: this parameter is required.
__
  -b [vue|react]: choose the front-end boilerplate you want, default is vue.

**Output:**

.. image:: https://user-images.githubusercontent.com/11625554/45541442-b42c7e80-b841-11e8-9c8a-218aff41ed45.png

--------------------------
``kaizen plugin:add noia``
--------------------------

  To install NOIA Network SDK plugin via kaizen in project, this project should be used `kaizen new` to created

**Parameters:**

  no parameter required

**Output:**

.. image:: https://user-images.githubusercontent.com/11625554/45541315-5dbf4000-b841-11e8-9f0c-35b1674aed99.png

------------------------------
``kaizen plugin:add bluzelle``
------------------------------

  To install Bluzelle SDK via kaizen in project, this project should be used `kaizen new` to created

**Parameters**

  -b [vue|react]: choose the front-end boilerplate you want, default is Vue.

**Usage**
  - React

    In React, Bluzelle's sdk will wrapped and pass down through component property.

    .. image:: https://user-images.githubusercontent.com/11625554/45680786-6fb91f80-bb6e-11e8-82f9-6dd4de9352fc.png

  - Vue

    In Vue, Vluzelle's sdk were wrapped into an object. Once you initialize Bluzelle, it will be returned.
    You can use object spread syntax to replace them into your components, or just use them like a normal object.

    .. image:: https://user-images.githubusercontent.com/11625554/45738864-17445980-bc24-11e8-912b-eedf4a97b3c6.png

--------------------------
``kaizen plugin:add nkn``
--------------------------

  To install NKN SDK plugin via kaizen in project, this project should be used `kaizen new` to created

----------------
``kaizen build``
----------------

  To build the KAIZEN's dapp, and the built code will be output into the build folder

---------------
``kaizen init``
---------------

  To setup the configuration you need, like IPFS provider.

----------------
``kaizen publish``
----------------

  To upload your dapp to the IPFS. You shall execute `kaizen build` before publish
