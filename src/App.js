import React from "react";
import "./App.css";

class App extends React.Component {
  state = {
    todoList: [],
    todoText: "",
    editIndex: -1,
    editText: ""
  };
  _addTodo = (todoList, todoText, event) => {
    event.preventDefault();
    let getValue = [...todoList];
    getValue.push(todoText);
    this.setState({ todoList: getValue, todoText: "" });
  };
  _edit = (todoList, index) => {
    this.setState({ editText: todoList[index], editIndex: index });
  };
  _delete = (todoList, index) => {
    let getValue = [...todoList];
    getValue.splice(index, 1);
    this.setState({ todoList: getValue });
  };
  _done = (todoList, index, editText) => {
    let getValue = [...todoList];
    getValue[index] = editText;
    this.setState({ todoList: getValue, editIndex: -1, editText: "" });
  };
  render() {
    const { todoList, todoText, editIndex, editText } = this.state;
    return (
      <div className="App">
        <form onSubmit={event => this._addTodo(todoList, todoText, event)}>
          <input
            type="text"
            value={todoText}
            onChange={text => this.setState({ todoText: text.target.value })}
            placeholder="What you need to done?"
          />
          <button type="submit">Add</button>
        </form>
        {/* show todo list */}
        {todoList.map((todo, index) => (
          <div className="todoListView" key={todo + index}>
            {editIndex == index ? (
              <input
                type="text"
                value={this.state.editText}
                onChange={text =>
                  this.setState({ editText: text.target.value })
                }
              />
            ) : (
              <div className="todoItem">{todo}</div>
            )}
            {editIndex == index ? (
              <button onClick={() => this._done(todoList, index, editText)}>
                Done
              </button>
            ) : (
              <button onClick={() => this._edit(todoList, index)}>Edit</button>
            )}
            {editIndex != index && (
              <button onClick={() => this._delete(todoList, index)}>
                Delete
              </button>
            )}
          </div>
        ))}
      </div>
    );
  }
}

export default App;
