// src/App.js
import React, { useState, useEffect } from 'react';
// Importar os ícones desejados do react-icons (neste caso, do set Font Awesome 'fa')
import { FaPlus, FaTrashAlt } from 'react-icons/fa';
import './App.css'; // Seus estilos

function App() {
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem('tasks');
    try {
      return storedTasks ? JSON.parse(storedTasks) : [];
    } catch (error) {
      console.error("Erro ao carregar tarefas do localStorage:", error);
      return [];
    }
  });

  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (event) => {
    event.preventDefault();
    if (inputValue.trim() === '') return;

    const newTask = {
      id: Date.now(),
      text: inputValue,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setInputValue('');
  };

  const handleToggleComplete = (taskId) => {
    setTasks(
      tasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleRemoveTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  return (
    <div className="app-container">
      <h1>💻 FlowTask: Gerenciador de Tarefas Interativo 🎯</h1>

      <form onSubmit={handleAddTask} className="task-form">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Adicionar nova tarefa..."
        />
        {/* Botão Adicionar com ícone */}
        <button type="submit" aria-label="Adicionar Tarefa"> {/* Aria-label opcional se o texto for claro */}
          <FaPlus/> {/* Ícone adicionado */}
          <span>Adicionar</span> {/* Mantemos o texto por clareza */}
        </button>
      </form>

      <ol className="task-list">
        {tasks.map(task => (
          <li key={task.id} className={task.completed ? 'completed' : ''}>
              {/* <<< INÍCIO DA DIV INTERNA >>> */}
            <div className="list-item-content"> 

            <span onClick={() => handleToggleComplete(task.id)}>
              {task.text}
            </span>
            {/* Botão Remover com ícone */}
            <button
              onClick={() => handleRemoveTask(task.id)}
              className="remove-btn"
              aria-label="Remover Tarefa" /* ESSENCIAL para acessibilidade */>
              <FaTrashAlt /> {/* Ícone adicionado */}
            </button>
              </div>
              {/* <<< FIM DA DIV INTERNA >>> */}
          </li>
        ))}
      </ol>
       {tasks.length === 0 && <p>Nenhuma tarefa na lista!</p>}
    </div>
  );
}

export default App;
