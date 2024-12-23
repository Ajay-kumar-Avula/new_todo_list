import React, { Component } from 'react';
import TodoItem from './TodoItem';
import './index.css';

const initialTodosList = [
  { id: 1, title: 'Book the ticket for today evening', dueDate: '2024-12-23', isCompleted: false, priority: 'medium' },
  { id: 2, title: 'Rent the movie for tomorrow movie night', dueDate: '2024-12-24', isCompleted: false, priority: 'low' },
  { id: 3, title: 'Confirm the slot for the yoga session tomorrow morning', dueDate: '2024-12-23', isCompleted: false, priority: 'high' },
  // Add other todos here...
];

class SimpleTodos extends Component {
  state = {
    todosList: JSON.parse(localStorage.getItem('todosList')) || initialTodosList,
    newTodoTitle: '',
    newTodoDueDate: '',
    newTodoPriority: 'low',
    searchQuery: '',
    filter: 'all',
    darkMode: false,
  };

  componentDidUpdate() {
    localStorage.setItem('todosList', JSON.stringify(this.state.todosList));
  }

  deleteTodo = (id) => {
    const { todosList } = this.state;
    const updatedTodosList = todosList.filter((eachTodo) => eachTodo.id !== id);
    this.setState({ todosList: updatedTodosList });
  };

  addTodo = () => {
    const { todosList, newTodoTitle, newTodoDueDate, newTodoPriority } = this.state;
    if (newTodoTitle.trim() === '') return;

    const newTodo = {
      id: todosList.length + 1,
      title: newTodoTitle,
      dueDate: newTodoDueDate,
      isCompleted: false,
      priority: newTodoPriority,
    };

    this.setState({
      todosList: [...todosList, newTodo],
      newTodoTitle: '',
      newTodoDueDate: '',
      newTodoPriority: 'low',
    });
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  toggleCompletion = (id) => {
    const { todosList } = this.state;
    const updatedTodosList = todosList.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isCompleted: !todo.isCompleted };
      }
      return todo;
    });
    this.setState({ todosList: updatedTodosList });
  };

  updateTodo = (id, title, priority) => {
    const { todosList } = this.state;
    const updatedTodosList = todosList.map((todo) => {
      if (todo.id === id) {
        return { ...todo, title, priority };
      }
      return todo;
    });
    this.setState({ todosList: updatedTodosList });
  };

  handleSearchChange = (event) => {
    this.setState({ searchQuery: event.target.value });
  };

  handleFilterChange = (filter) => {
    this.setState({ filter });
  };

  toggleDarkMode = () => {
    this.setState({ darkMode: !this.state.darkMode });
  };

  render() {
    const { todosList, newTodoTitle, newTodoDueDate, newTodoPriority, searchQuery, filter, darkMode } = this.state;

    const filteredTodos = todosList.filter((todo) => {
      const matchesSearch = todo.title.toLowerCase().includes(searchQuery.toLowerCase());
      if (filter === 'completed') {
        return matchesSearch && todo.isCompleted;
      } else if (filter === 'incomplete') {
        return matchesSearch && !todo.isCompleted;
      }
      return matchesSearch;
    });

    return (
      <div className={`app-container ${darkMode ? 'dark-mode' : ''}`}>
        <div className="simple-todos-container">
          <h1 className="heading">Simple Todos</h1>
          <input
            type="text"
            name="newTodoTitle"
            value={newTodoTitle}
            onChange={this.handleChange}
            placeholder="Enter todo title"
            className="todo-input"
          />
          <input
            type="date"
            name="newTodoDueDate"
            value={newTodoDueDate}
            onChange={this.handleChange}
            className="todo-input"
          />
          <select
            name="newTodoPriority"
            value={newTodoPriority}
            onChange={this.handleChange}
            className="priority-select"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <button type="button" onClick={this.addTodo} className="add-btn">Add</button>

          <div className="filter-container">
            <input
              type="text"
              value={searchQuery}
              onChange={this.handleSearchChange}
              placeholder="Search todos"
              className="search-input"
            />
            <div className="filter-buttons">
              <button type="button" onClick={() => this.handleFilterChange('all')} className="filter-btn">All</button>
              <button type="button" onClick={() => this.handleFilterChange('completed')} className="filter-btn">Completed</button>
              <button type="button" onClick={() => this.handleFilterChange('incomplete')} className="filter-btn">Incomplete</button>
            </div>
          </div>

          <ul className="todos-list">
            {filteredTodos.map((eachTodo) => (
              <TodoItem
                key={eachTodo.id}
                todoDetails={eachTodo}
                deleteTodo={this.deleteTodo}
                toggleCompletion={this.toggleCompletion}
                updateTodo={this.updateTodo}
              />
            ))}
          </ul>

          <button type="button" onClick={this.toggleDarkMode} className="dark-mode-btn">
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      </div>
    );
  }
}

export default SimpleTodos;
