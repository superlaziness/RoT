import React, { Component } from "react";

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputs: {
        add: {
          placeholder: "add item",
          value: ""
        },      
      },      
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit(this.state.inputs);
  }

  handleChange = (event) => {
    console.log(event.target.value);
    let inputs = this.state.inputs;
    let name = event.target.name;
    console.log(name);
    inputs[name].value = event.target.value;
    console.log(inputs);
    this.setState({inputs: inputs});
  }

  render() {
    return(
          <form onSubmit={this.handleSubmit}>
            {Object.keys(this.state.inputs).map((key, index) => (
              <input key={index} name={key}  value={key.value} onChange={this.handleChange}/>
            ))}
            <button type="submit">add</button>
          </form>
      )
  }

}