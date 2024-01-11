import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [description, setDescription] = useState("");
  const [updateDescription, setUpdateDescription] = useState("");
  const [allTodos, setAllTodos] = useState([]);

  const getToods = async () => {
    const allTodos = await axios.get("http://localhost:5000/todos");
    console.log(allTodos.data);
    setAllTodos(allTodos.data);
  };

  useEffect(() => {
    getToods();
  }, []);

  const onSubmitForm = async (e) => {
    e.preventDefault();
    console.log("FORM SUBMITTED");
    try {
      const body = { description };
      const json = await axios.post("http://localhost:5000/todos", body);
      console.log(json.data);

      window.location = "/";
    } catch (error) {
      console.log(error);
    }
  };

  const onEditButtonClick = async (todo_id) => {
    const newTodo = prompt("ENTER NEW TODO");
    // console.log(newTodo);
    if (newTodo) {
      setUpdateDescription(newTodo);
      const updatedTodo = await axios.put(
        "http://localhost:5000/todos/" + todo_id,
        { description: newTodo }
      );
      window.location = "/";
    }
  };

  const onDeleteButtonClick = async (todo_id) => {
    const deleteTodo = await axios.delete(
      "http://localhost:5000/todos/" + todo_id
    );
    window.location = "/";
  };

  return (
    <div className="App">
      <h1>TODO APP</h1>

      <form className="Form" onSubmit={onSubmitForm}>
        <input
          type="text"
          placeholder="Enter Task"
          className="todoInput"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></input>
        <button className="addButton">ADD</button>
      </form>

      <div className="todoContainer">
        <table>
          <tr>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
          {allTodos &&
            allTodos.map((todo) => (
              <tr>
                <td className="" key={todo.todo_id}>
                  {todo.description}
                </td>
                <td>
                  <button
                    className="editButton"
                    onClick={() => onEditButtonClick(todo.todo_id)}
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    className="deleteButton"
                    onClick={() => onDeleteButtonClick(todo.todo_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </table>
      </div>
    </div>
  );
}

export default App;
