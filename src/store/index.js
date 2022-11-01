import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import API from "goals-todos-api";
import {
  ADD_TODO,
  ADD_GOAL,
  DELETE_TODO,
  DELETE_GOAL,
  TOGGLE_TODO,
  TOGGLE_GOAL,
  RECEIVE_DATA,
  forbiddenWords,
} from "./constants";

// action creators
const addTodo = (todo) => ({ type: ADD_TODO, todo });
const addGoal = (goal) => ({ type: ADD_GOAL, goal });
const deleteTodo = (id) => ({ type: DELETE_TODO, id });
const deleteGoal = (id) => ({ type: DELETE_GOAL, id });
const toggleTodo = (id) => ({ type: TOGGLE_TODO, id });
const toggleGoal = (id) => ({ type: TOGGLE_GOAL, id });
const receiveDataActions = (todos, goals) => {
  return {
    type: RECEIVE_DATA,
    todos,
    goals,
  };
};
const handleToggleTodo = (id) => {
  return (dispatch) => {
    dispatch(toggleTodo(id));
    return API.saveTodoToggle(id).catch(() => {
      dispatch(toggleTodo(id));
      alert("couldn't toggle this todo");
    });
  };
};
const handleToggleGoal = (id) => {
  return (dispatch) => {
    dispatch(toggleGoal(id));
    return API.saveTodoToggle(id).catch(() => {
      dispatch(toggleGoal(id));
      alert("couldn't toggle this goal");
    });
  };
};
const handleDeleteTodo = (id, name) => {
  return (dispatch) => {
    dispatch(deleteTodo(id));
    return API.deleteTodo(id).catch(() => {
      dispatch(addTodo({ name, id, complete: false }));
      alert("couldn't delete this todo");
    });
  };
};
const handleDeleteGoal = (id, name, complete) => {
  return (dispatch) => {
    dispatch(deleteGoal(id));
    return API.deleteGoal(id).catch(() => {
      dispatch(addGoal({ name, id, complete }));
      alert("couldn't delete this goal");
    });
  };
};
const handleInitialData = () => {
  Promise.all([API.fetchTodos(), API.fetchGoals()]).then(([todos, goals]) => {
    store.dispatch(receiveDataActions(todos, goals));
  });
};
// helper functions
const handleAddTodo = (todo) => {
  API.saveTodo(todo)
    .then((todo) => store.dispatch(addTodo(todo)))
    .catch(() => alert("sorry, there's an error"));
};
const handleAddGoal = (goal) => {
  API.saveGoal(goal)
    .then((goal) => store.dispatch(addGoal(goal)))
    .catch(() => alert("sorry, there's an error"));
};
// middleware
const checker = (store) => (next) => (action) => {
  if (
    action.type === ADD_TODO &&
    forbiddenWords.includes(action.todo.name.toLowerCase().trim())
  ) {
    alert(
      "this is a forbidden words, don't write any of the following :" +
        forbiddenWords.join(", ")
    );
  } else if (
    action.type === ADD_GOAL &&
    forbiddenWords.includes(action.goal.name.toLowerCase().trim())
  ) {
    alert(
      "this is a forbidden words, don't write any of the following :" +
        forbiddenWords.join(", ")
    );
  } else {
    return next(action);
  }
};
const logger = (store) => (next) => (action) => {
  console.group(action.type);
  console.log(`the action is: `, action);
  const res = next(action);
  console.log(`the new state is: `, store.getState());
  console.groupEnd();
  return res;
};
// reducers
function todos(state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      return [...state, action.todo];
    case DELETE_TODO:
      return state.filter((todo) => todo.id !== action.id);
    case TOGGLE_TODO:
      return state.map((todo) =>
        todo.id === action.id
          ? Object.assign({}, todo, { complete: !todo.complete })
          : todo
      );
    case RECEIVE_DATA:
      return action.todos;
    default:
      return state;
  }
}
function goals(state = [], action) {
  switch (action.type) {
    case ADD_GOAL:
      return [...state, action.goal];
    case DELETE_GOAL:
      return state.filter((goal) => goal.id !== action.id);
    case TOGGLE_GOAL:
      return state.map((goal) =>
        goal.id === action.id
          ? Object.assign({}, goal, { complete: !goal.complete })
          : goal
      );
    case RECEIVE_DATA:
      return action.goals;
    default:
      return state;
  }
}
// the store
const store = createStore(
  combineReducers({
    todos,
    goals,
  }),
  applyMiddleware(thunk, checker, logger)
);

export {
  addTodo,
  addGoal,
  deleteTodo,
  deleteGoal,
  toggleGoal,
  toggleTodo,
  handleAddGoal,
  handleAddTodo,
  handleDeleteGoal,
  handleDeleteTodo,
  receiveDataActions,
  handleToggleGoal,
  handleToggleTodo,
  handleInitialData,
};

export default store;
