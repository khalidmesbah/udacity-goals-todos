import { useState } from "react";
import List from "./List";
import { handleAddTodo } from "../store";

const Todos = () => {
  const [todo, setTodo] = useState("");

  return (
    <section className="flex-grow-1">
      <header>
        <h2 className="text-capitalize">todos list</h2>
      </header>
      <div className="input-group mb-3">
        <input
          className="form-control"
          type="text"
          value={todo}
          onChange={(e) => {
            setTodo(e.currentTarget.value);
          }}
          onKeyDown={(e) => {
            if (e.code !== "Enter") return;
            handleAddTodo(todo);
            setTodo("");
          }}
        />
        <button
          tabIndex="-1"
          className="btn btn-primary text-capitalize"
          onClick={() => {
            handleAddTodo(todo);
            setTodo("");
          }}
        >
          add todo
        </button>
      </div>
      <List type="todos" />
    </section>
  );
};

export default Todos;
