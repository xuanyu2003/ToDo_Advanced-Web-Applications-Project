import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  const url = 'http://localhost:3001'; 

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        alert(
          error.response && error.response.data && error.response.data.error
            ? error.response.data.error
            : 'Error fetching tasks'
        );
      });
  }, []);

  const addTask = () => {
    if (!task.trim()) {
      alert('Task cannot be empty');
      return;
    }

    axios
      .post(url + '/create', {
        description: task,
      })
      .then((response) => {
        setTasks([...tasks, { id: response.data.id, description: task }]);
        setTask('');
      })
      .catch((error) => {
        alert(
          error.response && error.response.data && error.response.data.error
            ? error.response.data.error
            : 'Error adding task'
        );
      });
  };

  const deleteTask = (id) => {
    axios
      .delete(url + '/delete/' + id)
      .then(() => {
        const withoutRemoved = tasks.filter((item) => item.id !== id);
        setTasks(withoutRemoved);
      })
      .catch((error) => {
        alert(
          error.response && error.response.data && error.response.data.error
            ? error.response.data.error
            : 'Error deleting task'
        );
      });
  };

  return (
    <div id="container">
      <h3>Todos</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addTask();
        }}
      >
        <input
          placeholder="Add new task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              addTask();
            }
          }}
        />
      </form>
      <ul>
        {tasks.map((item) => (
          <li key={item.id}>
            {item.description}
            <button
              className="delete-button"
              onClick={() => deleteTask(item.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;



