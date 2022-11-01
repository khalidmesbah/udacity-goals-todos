import { useState } from "react";
import List from "./List";
import { handleAddGoal } from "../store";

const Goals = () => {
  const [goal, setGoal] = useState("");

  return (
    <section className="flex-grow-1">
      <header>
        <h2 className="text-capitalize">goals list</h2>
      </header>
      <div className="input-group mb-3">
        <input
          className="form-control"
          type="text"
          value={goal}
          onChange={(e) => {
            setGoal(e.currentTarget.value);
          }}
          onKeyDown={(e) => {
            if (e.code !== "Enter") return;
            handleAddGoal(goal);
            setGoal("");
          }}
        />
        <button
          tabIndex="-1"
          className="btn btn-primary text-capitalize"
          onClick={() => {
            handleAddGoal(goal);
            setGoal("");
          }}
        >
          add goal
        </button>
      </div>
      <List type="goals" />
    </section>
  );
};

export default Goals;
