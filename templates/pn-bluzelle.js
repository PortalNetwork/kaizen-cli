module.exports = function (ws, uuid, wrappedComponent) {
  const PNBluzelle = require('bluzelle').connect(ws, uuid);

  return class extends React.Component {
    handleCreate = (key, value) => {
      return PNBluzelle.create(key, value);
    }

    handleRead = (key) => {
      return PNBluzelle.read(key);
    }

    handleUpdate = (key, value) => {
      return PNBluzelle.update(key, value);
    }

    handleDelete = (key) => {
      return PNBluzelle.remove(key);
    }

    render() {
      return (
        <wrappedComponent
          read={this.handleRead}
          create={this.handleCreate}
          update={this.handleUpdate}
          delete={this.handleDelete}
        />
      );
    }
  };
}