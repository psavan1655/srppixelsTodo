import React from "react";
import CreateTodo from "./Components/CreateTodo";
import Header from "./Components/Header";
import TodoDisplay from "./Components/TodoDisplay";

function App() {
  return (
    <React.Fragment>
      <Header />
      <CreateTodo />
      <TodoDisplay />
    </React.Fragment>
  );
}

export default App;
