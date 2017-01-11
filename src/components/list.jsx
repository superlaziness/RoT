import React, { Component } from "react";
import ListItem from "components/listitem";
import Form from "components/form";

export default class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: ["one", "two"],      
    };
  }

  addItem = (inputs) => {
    let listArray = this.state.list; 
    inputs.forEach((item, i, arr) => {
      listArray.push(item.value);
    });
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
          <Form onSubmit={this.addItem} />
        </div>
      )
  }

}