import { useState } from 'react';
import './App.css';

function makeCopy(anObject) {
  return JSON.parse(JSON.stringify(anObject));
}

const headerStyle = {
  border: '1px solid #ddd',
  padding: '8px',
  backgroundColor: '#f4f4f4',
  textAlign: 'left',
};

const cellStyle = {
  border: '1px solid #ddd',
  padding: '8px',
};

const rowStyle = (completed) => ({
  backgroundColor: completed ? '#d4edda' : '#f8d7da',
});

const buttonStyle = {
  padding: '5px 10px',
  fontSize: '14px',
  cursor: 'pointer',
  borderRadius: '4px',
  border: 'none',
  backgroundColor: '#007bff',
  color: 'white',
  marginBottom: '4px',
};

function App() {
  const tasks = useTasks();

  return (
    <>
      <h1 style={{ color: 'grey'}}>Todo List</h1>
      <table
        style={{ borderCollapse: 'collapse', width: '100%', marginTop: '20px' }}
      >
        <thead>
          <tr>
            <th style={headerStyle}>Task</th>
            <th style={headerStyle}>Priority</th>
            <th style={headerStyle}>Completed</th>
            <th style={headerStyle}>Created At</th>
            <th style={headerStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.data.map((task, index) => (
            <tr key={index} style={rowStyle(task.completed)}>
              <td style={cellStyle}>{task.task}</td>
              <td style={cellStyle}>{task.priority}</td>
              <td style={cellStyle}>{task.completed ? 'Yes' : 'No'}</td>
              <td style={cellStyle}>{task.createdAt?.toDateString}</td>
              <td style={cellStyle}>
                <button
                  onClick={() => tasks.completeTask(index)}
                  style={buttonStyle}
                >
                  Mark as Completed
                </button>
                <button
                  onClick={() => tasks.deleteTask(index)}
                  style={{ ...buttonStyle, marginLeft: '10px' }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

function useTasks() {
  const [data, setData] = useState([
    {
      task: 'Write project documentation',
      priority: 'High',
      completed: false,
      createdAt: new Date(),
    },

    {
      task: 'Fix bug in login form',
      priority: 'Medium',
      completed: false,
      createdAt: new Date(),
    },

    {
      task: 'Plan team meeting agenda',
      priority: 'Low',
      completed: false,
      createdAt: new Date(),
    },

    {
      task: 'Update dependency versions',
      priority: 'Medium',
      completed: false,
      createdAt: new Date(),
    },
  ]);

  // Function to add a new task
  function addTask(task, priority = 'medium') {
    setData([
      ...data,
      {
        task,
        priority,
        completed: false,
        createdAt: new Date(),
      },
    ]);
  }

  // Function to complete a task
  function completeTask(index) {
    if (data[index]) {
      const copy = makeCopy(data);
      copy[index].completed = true;

      setData(copy);
    } else {
      console.error('Task not found.');
    }
  }

  // Function to filter tasks by completion status
  function filterTasks(showCompleted) {
    return data.filter((task) => task.completed === showCompleted);
  }

  // Function to filter tasks by priority
  function filterTasksByPriority(priority) {
    return data.filter((task) => task.priority === priority);
  }

  // Function to show all tasks
  function showTasks() {
    console.log('Task List:');
    data.forEach((t, i) => {
      console.log(
        `${i}: ${t.task} [Priority: ${t.priority}] [${
          t.completed ? 'Completed' : 'Incomplete'
        }] [Created: ${t.createdAt}]`
      );
    });
  }

  // Function to save tasks to local storage
  function saveTasks() {
    try {
      localStorage.setItem('tasks', JSON.stringify(data));
      console.log('Tasks saved.');
    } catch (err) {
      console.error('Error saving tasks:', err);
    }
  }

  function deleteTask(index) {
    const copy = makeCopy(data);
    copy.splice(index, 1);
    setData(copy);
  }

  // Function to load tasks from local storage
  function loadTasks() {
    try {
      const storedTasks = localStorage.getItem('tasks');
      if (storedTasks) {
        const parsedTasks = JSON.parse(storedTasks);
        parsedTasks.forEach((task) => {
          task.createdAt = new Date(task.createdAt); // Restore date object
          data.push(task);
        });
        console.log('Tasks loaded.');
      }
    } catch (err) {
      console.error('Error loading tasks:', err);
    }
  }

  return {
    data,
    completeTask,
    filterTasks,
    filterTasksByPriority,
    showTasks,
    saveTasks,
    loadTasks,
    deleteTask,
  };
}

export default App;
