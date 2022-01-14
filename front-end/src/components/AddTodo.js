import React from "react";
import { connect } from "react-redux";
import { addTodo } from "../actions/todos";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";

class AddTodo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { input: "" };
  }

  updateInput = (input) => {
    this.setState({ input });
  };

  handleAddTodo = () => {
    this.props.addTodo(this.state.input);
    this.setState({ input: "" });
  };

  render() {
    return (
      <React.Fragment>
        <div style={{padding:"10px"}}>
        <TextField id="standard-basic"
            variant="standard"
            onChange={(e) => this.updateInput(e.target.value)}
            value={this.state.input}
            style={{padding:"5px"}}
        />
        <Button onClick={this.handleAddTodo} color="secondary" variant="outlined">
          Add Todo
        </Button>
        </div>
      </React.Fragment>
    );
  }
}

export default connect(null, { addTodo })(AddTodo);
// export default AddTodo;
