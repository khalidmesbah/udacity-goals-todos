import Todos from "./components/Todos";
import Goals from "./components/Goals";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { handleInitialData } from "./store/index";
import { useEffect } from "react";
let isMountedAgain = false;
// handleInitialData();

const App = () => {
  useEffect(() => {
    if (isMountedAgain) return;
    handleInitialData();
    return () => {
      isMountedAgain = true;
    };
  }, []);

  return (
    <>
      <Todos />
      <Goals />
    </>
  );
};

export default App;
