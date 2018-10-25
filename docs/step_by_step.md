# Create You DAPP With Kaizen-CLI Step By Step

Kaizen-CLI is the most powerful command line tool to help you building your own decentralize application.

## Install
```
  npm i -g kaizen-cli
```

## Create a new project
```
  kaizen new -n <project-name> -b <boilerplate:vue|react>
```

Once you create a kaizen project, you can use `kaizen plugin:add` to install kaizen's package or use `kaizen build` to build the project, and finally you can use `kaizen deploy` to deploy your project!


## Install plugin
```
  kaizen plugin:add <plugin-name:noia|bluzelle>
```

### Usage
```
import React from 'react';
import PNBluzelle from 'pn-react-bluzelle';

class MyComponent extends React.Component {
  insert = e => {
    this.props.create('key', 'value').then(function() {
      alert('DONE);
    });
  }

  read = e => {
    this.props.delete('key').then(function(value) {
      // ...
    });
  }

  update = e => {
    this.props.update('key', 'another value').then(function() {
      alert('DONE);
    });
  }

  delete = e => {
    this.props.delete('key').then(function() {
      alert('DONE);
    });
  }

  render() {
    <div>
      <button onClick={this.insert}>create</button>
      <button onClick={this.read}>read</button>
      <button onClick={this.update}>update</button>
      <button onClick={this.delete}>delete</button>
    </div>
  }
}
```

## Remove plugin
```
  kaizen plugin:remove <plugin-name:noia|bluzelle>
```

## Build the project
You can build your project via kaizen, execute below command.
```
  kaizen build
```

## Deploy project
```
kaizen deploy
```
kaizen will configure your kaizen.json to deploy your project.

