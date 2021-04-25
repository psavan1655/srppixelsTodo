import React, { useState } from "react";
const axios = require("axios");

function CreateTodo() {
  const [todoData, settodoData] = useState({
    title: "",
    description: "",
    isCompleted: false,
  });

  const handleChange = (name) => (event) => {
    settodoData({ ...todoData, [name]: event.target.value });
  };

  const handleSumbit = (event) => {
    event.preventDefault();
    axios({
      method: "post",
      url: "http://localhost:8000/api/todo",
      data: todoData,
    })
      .then(function (response) {
        settodoData({
          title: "",
          description: "",
        });
        window.location.reload(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div>
      <div
        className="h1 d-flex justify-content-center p-5"
        style={{ color: "#3500D3" }}
      >
        Create Todo
      </div>
      <form className="container" onSubmit={handleSumbit}>
        <div className="form-group pt-2 pb-4">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={todoData.title}
            onChange={handleChange("title")}
          />
        </div>
        <div className="form-group pt-2 pb-4">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            value={todoData.description}
            onChange={handleChange("description")}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          style={{ backgroundColor: "#3500D3" }}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default CreateTodo;
