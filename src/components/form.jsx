import React, { Component } from "react";

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputs: [
        {
          name: "add",
          placeholder: "add item",
          value: ""
        },
      ],      
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(this.state.inputs);
  }

  handleChange(event) {
    console.log(event.target.value);
    let inputs = this.state.inputs;
    inputs.forEach((input, i, arr) => {
      if(input.name === event.target.name) {
        input.value = event.targe.value;
      };
    });
    console.log(inputs);
    this.setState({inputs: inputs});
  }

  render() {
    return(
          <form onSubmit={this.handleSubmit}>
            {this.state.inputs.map((input, index) => (
              <input key={index} name={input.name}  value={input.value} onChange={this.handleChange}/>
            ))}
            <button type="submit">add</button>
          </form>
      )
  }

}