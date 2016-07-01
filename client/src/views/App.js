import React from 'react';


class ItemControls extends React.Component {

  render() {
    return (
      <div className="item-controls">
        <div>
          <button>Open All</button>
          <button>Close All</button>
          <button>Toggle All</button>
        </div>
        <button>Add</button>
      </div>
    );
  }

}

class Item extends React.Component {

  render() {
    return (
      <details>
        <summary>{this.props.title}</summary>
        <p>{this.props.content}</p>
      </details>
    );
  }

}

class ItemList extends React.Component {

  render() {
    var rows = [];
    var searchTerm = this.props.searchTerm;

    this.props.items.forEach(function(item) {
      if (item.title.indexOf(searchTerm) === -1 && item.content.indexOf(searchTerm) === -1) {
        return;
      }
      rows.push(<Item title={item.title} content={item.content} />);
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
    this.props.onUserInput(
      this.refs.searchTerm.value
    );
  }

  render() {
    return <input
      placeholder="Search"
      value={this.props.searchTerm}
      ref="searchTerm"
      onChange={(e) => this.handleChange(e)}
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
    };
  }

  handleUserInput(searchTerm) {
    this.setState({
      searchTerm: searchTerm
    });
  }

  render() {
    return (
      <div>
        <SearchBar searchTerm={this.state.searchTerm} onUserInput={(e) => this.handleUserInput(e)}/>
        <ItemList items={ITEMS} searchTerm={this.state.searchTerm}/>
        <ItemControls searchTerm={this.state.searchTerm}/>
      </div>
    );
  }
}

var ITEMS = [
  {title: "Title1", content: "content1"},
  {title: "Title2", content: "content2"}
];

export default class App extends React.Component {

  render() {
    return (
      <div className="verbling-challenge">
        <Header title="Verbling Challenge"/>
        <ItemListForm items={ITEMS}/>
      </div>
    );
  }

}
