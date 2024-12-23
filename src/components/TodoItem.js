import { useState } from 'react';
import './index.css';

const TodoItem = ({ todoDetails, deleteTodo, toggleCompletion, updateTodo }) => {
  const { id, title, isCompleted, dueDate, priority } = todoDetails;

  const [isEditing, setIsEditing] = useState(false);
  const [todoTitle, setTodoTitle] = useState(title);
  const [todoPriority, setTodoPriority] = useState(priority);

  const onDeleteTodo = () => deleteTodo(id);

  const onEditTodo = () => setIsEditing(true);

  const onSaveTodo = () => {
    updateTodo(id, todoTitle, todoPriority);
    setIsEditing(false);
  };

  const handleChange = (event) => setTodoTitle(event.target.value);

  const handlePriorityChange = (event) => setTodoPriority(event.target.value);

  const handleCheckboxChange = () => toggleCompletion(id);

  return (
    <li className={`todo-item ${isCompleted ? 'completed' : ''}`}>
      <input type="checkbox" checked={isCompleted} onChange={handleCheckboxChange} className="complete-checkbox" />
      {isEditing ? (
        <>
          <input type="text" value={todoTitle} onChange={handleChange} className="edit-input" />
          <select value={todoPriority} onChange={handlePriorityChange} className="priority-select">
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <button type="button" className="save-btn" onClick={onSaveTodo}>Save</button>
        </>
      ) : (
        <>
          <p className="title">{todoTitle} ({priority})</p>
          <span className="due-date">{dueDate}</span>
          <button type="button" className="edit-btn" onClick={onEditTodo}>Edit</button>
        </>
      )}
      <button type="button" className="delete-btn" onClick={onDeleteTodo}>Delete</button>
    </li>
  );
};

export default TodoItem;
