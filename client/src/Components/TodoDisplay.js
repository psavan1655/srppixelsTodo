import axios from "axios";
import React, { useEffect, useState } from "react";

function TodoDisplay({ setreload = (f) => f, reload = undefined }) {
  const [tasks, settasks] = useState([]);
  let todoUpdateId;

  const handleChange = (data) => async (event) => {
    event.preventDefault();
    tasks.some((el, index) =>
      el._id === data._id ? (todoUpdateId = index) : ""
    );
    let newArr = [...tasks];
    newArr[todoUpdateId] = {
      ...newArr[todoUpdateId],
      isCompleted: event.target.checked,
    };
    settasks(newArr);
    await axios({
      method: "put",
      url: `http://localhost:8000/api/todo/${data._id}`,
      data: {
        isCompleted: !tasks[todoUpdateId].isCompleted,
      },
    })
      .then(function (data) {})
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleDelete = (id) => async (e) => {
    e.preventDefault();
    await axios({
      method: "delete",
      url: `http://localhost:8000/api/todo/${id}`,
    })
      .then(function (data) {
        window.location.reload(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:8000/api/getalltodo",
    })
      .then(async function (data) {
        await settasks(data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <div class="container">
      <div class="row">
        <table class="table table-hover table-responsive">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Completed</th>
            </tr>
          </thead>

          {tasks.map((e, index) => {
            return (
              <tbody>
                <tr id="d1">
                  <td>{index + 1}</td>
                  <td id="f1">{e.title}</td>
                  <td id="l1">{e.description}</td>
                  {e.isCompleted !== true ? (
                    <td id="m1">
                      <label htmlFor="isCompleted" className="p-1">
                        Completed
                      </label>
                      <input
                        type="checkbox"
                        name="completed"
                        id="isCompleted"
                        checked={e.isCompleted}
                        onChange={handleChange(e)}
                      />
                    </td>
                  ) : (
                    <td id="m1">
                      <button
                        type="button"
                        class="btn btn-danger"
                        onClick={handleDelete(e._id)}
                      >
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              </tbody>
            );
          })}
        </table>
      </div>
    </div>
  );
}

export default TodoDisplay;
