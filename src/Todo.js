import { List, ListItem, ListItemText, Button,Divider } from "@material-ui/core";
import React, { useState } from "react";
import "./Todo.css";
import db from "./firebase";
import DeleteIcon from "@material-ui/icons/Delete";
import Modal from "@material-ui/core/Modal";
import EditIcon from "@material-ui/icons/Edit";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

//calculate ScreenSize
function rand() {
  return Math.round(Math.random() * 20) - 10;
}

//modal open Center
function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

//modal open size and Content
const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "34ch",
    },
  },
}));

function Todo(props) {
  const classes = useStyles(); //custome class for modal open
  const [modalStyle] = useState(getModalStyle); //custome class for modal position
  const [open, setOpen] = useState(false); //modal status
  const [input, setInput] = useState(""); //input feild status

  const updateTodo = () => {
    //update todo with the new input text

    db.collection("todos").doc(props.todo.id).set(
      {
        todo: input,
      },
      { merge: true }
    );
    setOpen(false);
  };
  return (
    <>
      <Modal open={open} onClose={(e) => setOpen(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className={classes.root} noValidate autoComplete="off">
            <TextField
              id="outlined-basic"
              label={props.todo.todo}
              variant="outlined"
              value={input}
              onChange={(event) => setInput(event.target.value)}
            />
          </form>
          <Button variant="contained" color="secondary" onClick={updateTodo}>
              Update Todo
            </Button>
        </div>
      </Modal>
      <List className="todo_list">
        <ListItem>
          <ListItemText
            primary={props.todo.todo}
            secondary="Dummy Textline 🎸"
          />
        </ListItem>
        <EditIcon onClick={(e) => setOpen(true)} />
        <DeleteIcon
          onClick={(event) =>
            db.collection("todos").doc(props.todo.id).delete()
          }
        ></DeleteIcon>
      </List>
      <Divider />
    </>
  );
}

export default Todo;
