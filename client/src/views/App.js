import React from "react";


class Header extends React.Component {

  render() {
    return <h1 className="text-center">{this.props.title}</h1>;
  }
}

class Item extends React.Component {

  handleClick() {
    this.props.toggleItem(this.props.index);
  }

  render() {
    var itemClasses = ["item",];
    var content = null;

    if (this.props.open) {
      itemClasses.push("open");
      content = this.props.content;
    }

    return (
      <div className={itemClasses.join(" ")} onClick={(event) => this.handleClick(event)}>
        <h5 className="title">
          {this.props.title}
        </h5>
        <p className="content">{content}</p>
      </div>
    );
  }
}

class ItemList extends React.Component {

  toggleItem(index) {
    this.props.toggleItem(index);
  }

  render() {
    var rows = [];
    var itemList = this;

    this.props.items.forEach(function(item, key) {
      if (item.title.indexOf(itemList.props.searchTerm) === -1 && item.content.indexOf(itemList.props.searchTerm) === -1) {
        return;
      }

      rows.push(
        <Item
          key={key}
          index={key}
          title={item.title}
          content={item.content}
          open={item.open}
          toggleItem={(index) => itemList.toggleItem(index)}
        />
      );
    });
    return (
      <div className="item-area">
        {rows}
      </div>
    );
  }
}

class SearchBar extends React.Component {

  handleChange() {
    this.props.onUserSearch(
      this.refs.searchTerm.value
    );
  }

  render() {
    return <input
      placeholder="Search"
      value={this.props.searchTerm}
      ref="searchTerm"
      onChange={(event) => this.handleChange(event)}
    />;
  }
}

class ItemControls extends React.Component {

  handleDisplayChange(event, action) {
    this.props.onAllItemDisplay(action);
  }

  addItem() {
    var title = prompt("Title", "");
    var content = prompt("Content", "");
    this.props.addItem(title, content);
  }

  render() {
    return (
      <div className="item-controls">
        <div className="button-group">
          <button onClick={(event) => this.handleDisplayChange(event, "open")}>Open All</button>
          <button onClick={(event) => this.handleDisplayChange(event, "close")}>Close All</button>
          <button onClick={(event) => this.handleDisplayChange(event, "toggle")}>Toggle All</button>
        </div>
        <button onClick={(event) => this.addItem(event)} className="button-green">Add</button>
      </div>
    );
  }
}

class ItemListForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
      items: [
        {title: "Title1", content: "content1", open: false},
        {title: "Title2", content: "content2", open: true}
      ]
    };
  }

  handleUserSearch(searchTerm) {
    this.setState({searchTerm: searchTerm});
  }

  handleAllItemDisplay(action) {
    var items = this.state.items;

    items.forEach(function(item, index) {
      if (action === "open") {
        item.open = true;
      }
      else if (action === "close") {
        item.open = false;
      }
      else if (action === "toggle") {
        item.open = !item.open;
      }
    });
    this.setState({
      items: items
    });
  }

  toggleItem(index) {
    var items = this.state.items;

    items[index].open = !items[index].open;
    this.setState({
      items: items
    });
  }

  addItem(title, content) {
    var items = this.state.items;

    items.push({title: title, content: content, open: true});
    this.setState({
      items: items
    });
  }

  render() {
    return (
      <div>
        <SearchBar
          searchTerm={this.state.searchTerm}
          onUserSearch={(searchTerm) => this.handleUserSearch(searchTerm)}
        />
        <ItemList
          items={this.state.items}
          searchTerm={this.state.searchTerm}
          toggleItem={(key) => this.toggleItem(key)}
        />
        <ItemControls
          onAllItemDisplay={(action) => this.handleAllItemDisplay(action)}
          addItem={(title, content) => this.addItem(title, content)}
        />
      </div>
    );
  }
}

export default class App extends React.Component {

  render() {
    return (
      <div className="verbling-challenge">
        <Header title="Verbling Challenge"/>
        <ItemListForm/>
      </div>
    );
  }
}
