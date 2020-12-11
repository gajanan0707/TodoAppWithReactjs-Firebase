import { Button, FormControl, Input, InputLabel } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import "./App.css";
import Todo from "./Todo";
import db from "./firebase";
import firebase from "firebase";
import Snackbar from '@material-ui/core/Snackbar';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  

  //when the app loads, we need to listen to the database and fetch new todos as they get added/remove

  useEffect(() => {
    //this code here .. fires when the app.js loads
    db.collection("todos")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        console.log(snapshot.docs.map((doc) => doc.data().todo));
        setTodos(
          snapshot.docs.map((doc) => ({ id: doc.id, todo: doc.data().todo }))
        );
      });
  }, []);

  const addTodo = (event) => {
    //this will fire off when we click the button
    event.preventDefault(); //will stop refresh

    db.collection("todos").add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setInput(""); //clear up the input after hitting submit
  };

  return (
    <div className="App">
      <h2>Todo App Crud With Reactjs & Firebase</h2>
      <br />
      <form>
        <FormControl>
          <InputLabel>✅ Write a Todo..</InputLabel>
          <Input
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
        </FormControl>

        <Button
          type="submit"
          onClick={addTodo}
          variant="contained"
          color="primary"
          disabled={!input}
        >
          Add Todo
        </Button>
      </form>

      <ul>
        {todos.map((todo) => (
          <Todo todo={todo} />
        ))}
      </ul>
    </div>
  );
}

export default App;
