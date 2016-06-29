import React from 'react';


class ItemControls extends React.Component {

  render() {
    return (
      <div>
        <button>Open All</button>
        <button>Close All</button>
        <button>Toggle All</button>
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

class ItemArea extends React.Component {

  render() {
    return (
      <div>
        <Item title="Title1" content="content1"/>
        <Item title="Title2" content="content2"/>
      </div>
    );
  }

}

class SearchBar extends React.Component {

  render() {
    return <input placeholder="Search"/>;
  }

}

class Header extends React.Component {

  render() {
    return <h1>{this.props.title}</h1>;
  }

}

export default class App extends React.Component {

  render() {
    return (
      <div>
        <Header title="Verbling Challenge"/>
        <SearchBar/>
        <ItemArea/>
        <ItemControls/>
      </div>
    );
  }

}
