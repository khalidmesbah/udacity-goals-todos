import { useEffect, useState } from "react";
import store, {
  handleToggleGoal,
  handleToggleTodo,
  handleDeleteGoal,
  handleDeleteTodo,
} from "../store";

const List = ({ type }) => {
  const [data, setData] = useState(store.getState()[type]);
  const [isLoading, setIsLoading] = useState(true);
  store.subscribe(() => {
    setData(store.getState()[type]);
    setIsLoading(false);
  });
  return (
    <>
      {isLoading ? (
        <h2>Loading...</h2>
      ) : data.length === 0 ? (
        <h2>No Data Found.</h2>
      ) : (
        <ul className="list-group" id="goals-list">
          {data.map(({ id, name, complete }) => (
            <li
              key={id}
              className={`list-group-item list-group-item-action list-group-item-${
                complete ? "success" : "secondary"
              } d-flex justify-content-between ps-4 pe-4`}
            >
              <span
                className={`flex-grow-1
          text-decoration-${complete ? "line-through" : "none"}`}
                onClick={() => {
                  if (type === "todos") {
                    store.dispatch(handleToggleTodo(id))
                    
                  } else {
                    store.dispatch(handleToggleGoal(id))
                  }
                }}
              >
                {name}
              </span>
              <span
                role="button"
                onClick={() => {
                  if (type === "todos") {
                    store.dispatch(handleDeleteTodo(id, name, complete));
                  } else {
                    store.dispatch(handleDeleteGoal(id, name, complete));
                  }
                }}
              >
                ❌
              </span>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default List;
