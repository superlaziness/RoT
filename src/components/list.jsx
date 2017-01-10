import React, { Component } from "react";
import ListItem from "components/listitem";

export default class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: ["one", "two"],      
    };
  }

  addItem = (e) => {
    console.log(this.refs);
    e.preventDefault();

    let listArray = this.state.list; 
    listArray.push(this.refs.input.value); // didn't understand why e.target.value isn't working
    this.setState({list: listArray});    
  }

  render() {
    return(
        <div>
          <ul>
            {this.state.list.map((item, index) => (
              <ListItem key={index} item={item}/>
            ))}
          </ul>
          <br/>
          <form onSubmit={this.addItem}>
            <input placeholder="new item" ref="input">
            </input>
            <button type="submit">add</button>
          </form>
        </div>
      )
  }

}