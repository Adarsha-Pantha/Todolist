import React, { useState } from 'react';
import './App.css';

function Background() {
  return <div className="background"></div>;
}

function Task({ index, text, time, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(text);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onEdit(index, editedText);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setEditedText(e.target.value);
  };

  return (
    <li>
      <div className={`task-content ${isEditing ? 'editing' : ''}`}>
        <div className="task-details">
          <div className="task-text">{text}</div>
          <div className="task-time">{time}</div>
        </div>
        <div className="task-actions">
          <button onClick={handleEdit}>Edit</button>
          <button onClick={() => onDelete(index)}>Delete</button>
        </div>
      </div>
      {isEditing && (
        <div className="edit-task">
          <input type="text" value={editedText} onChange={handleChange} />
          <button onClick={handleSave}>Save</button>
        </div>
      )}
    </li>
  );
}

function App() {
  const [todos, setTodos] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = e.target.elements.todo.value.trim();
    if (text !== '') {
      const time = new Date().toLocaleString(); // Get current date and time
      setTodos([...todos, { text, time }]);
      e.target.reset();
    }
  };

  const handleDelete = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const handleEdit = (index, newText) => {
    const newTodos = [...todos];
    newTodos[index].text = newText;
    setTodos(newTodos);
  };

  return (
    <div className="container">
      <Background />
      <div className="App">
        <h1>Todo List</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" name="todo" placeholder="Add a new todo" />
          <button type="submit">Add</button>
        </form>
        <ul>
          {todos.map((todo, index) => (
            <Task
              key={index}
              index={index}
              text={todo.text}
              time={todo.time}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
