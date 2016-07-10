import React from 'react';


class ItemControls extends React.Component {

  handleClick(event, action) {
    this.props.onAllItemDisplay(action);
  }

  render() {
    return (
      <div className="item-controls">
        <div>
          <button onClick={(event) => this.handleClick(event, "open")}>Open All</button>
          <button onClick={(event) => this.handleClick(event, "close")}>Close All</button>
          <button onClick={(event) => this.handleClick(event, "toggle")}>Toggle All</button>
        </div>
        <button>Add</button>
      </div>
    );
  }
}

class Item extends React.Component {

  handleClick() {
    this.props.toggleItem(this.props.index);
  }

  render() {
    var arrow = (<span>▸</span>);
    var content = null;

    if (this.props.open) {
      arrow = (<span>▾</span>);
      content = this.props.content;
    }
    return (
      <div className="item" onClick={(event) => this.handleClick(event)}>
        <h5>
          {arrow} {this.props.title}
        </h5>
        <p>{content}</p>
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

      if (itemList.props.display == "open") {
        item.open = true;
      }
      else if (itemList.props.display == "close") {
        item.open = false;
      }
      else if (itemList.props.display == "toggle") {
        item.open = !item.open;
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

  handleChange(event) {
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

class Header extends React.Component {

  render() {
    return <h1 className="text-center">{this.props.title}</h1>;
  }
}

class ItemListForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
      display: "",
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
    this.setState({display: action});
  }

  toggleItem(index) {
    var items = this.state.items;

    items[index].open = !items[index].open;
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
          display={this.state.display}
          toggleItem={(key) => this.toggleItem(key)}
        />
        <ItemControls onAllItemDisplay={(action) => this.handleAllItemDisplay(action)}/>
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
