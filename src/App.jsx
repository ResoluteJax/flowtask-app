// src/App.js
import React, { useState, useEffect } from 'react';
// Importar os ícones desejados do react-icons (neste caso, do set Font Awesome 'fa')
import { FaPlus, FaTrashAlt, FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa';
// Importar componentes Recharts
import{PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer} from 'recharts';
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

 // --- Calcular dados para o gráfico ---
 const completedTasks = tasks.filter(task => task.completed).length;
 const pendingTasks = tasks.length - completedTasks;

 // Formato de dados que Recharts PieChart espera: array de objetos
 const chartData = [
   { name: 'Concluídas', value: completedTasks },
   { name: 'Pendentes', value: pendingTasks },
 ];

 // Cores para as fatias do gráfico
 const COLORS = ['#34ab24', '#FF8042']; // Verde para concluídas, Laranja para pendentes



  return (
    
    <div className="app-container">
      <h1>💻 FlowTask: Gerenciador de Tarefas Interativo 🎯</h1>

{/* ========== INÍCIO DA SEÇÃO DO GRÁFICO ========== */}
{tasks.length > 0 && ( // Só mostra o gráfico se houver tarefas
        <div className="chart-container">
          <h2>Progresso das Tarefas</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%" // Posição horizontal do centro
                cy="50%" // Posição vertical do centro
                outerRadius={80} // Raio externo da pizza
                fill="#8884d8" // Cor padrão (será sobrescrita pelas Cells)
                dataKey="value" // Chave do objeto de dados que contém o valor numérico
                nameKey="name" // Chave do objeto de dados que contém o nome da fatia
                labelLine={false} // Não mostrar linhas para labels externos
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} // Customiza o label na fatia
              >
                {/* Mapeia os dados para aplicar cores diferentes a cada fatia (Cell) */}
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value, name) => [`${value} tarefas`, name]} /> {/* Tooltip ao passar o mouse */}
              {/* <Legend /> */} {/* Descomente se quiser uma legenda separada */}
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
      {/* ========== FIM DA SEÇÃO DO GRÁFICO ========== */}

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
    


{/* inicio do rodapé */}
<footer className='app-footer'>
<p>
  © {new Date().getFullYear()} Flowtask by Otávio Henrique
</p>
<div className="social-links">
<a href="mailto:otavio-henrique10@hotmail.com" 
aria-label="Enviar email para Otávio Henrique">

<FaEnvelope/>
<span>Email</span>
</a>

<a href="https://github.com/ResoluteJax"
target='_blank'
rel="noopener noreferrer"
aria-label='Github de Otávio Henrique'>

  <FaGithub/>
  <span>GitHub</span>
</a>

<a href="https://www.linkedin.com/in/otavio-henrique-filgueiras-dos-santos-2746a120a/"
target='_blank'
rel="noopener noreferrer"
aria-label='Perfil no Linkedin de Otávio Henrique'>
  <FaLinkedin/>
  <span>Linkedin</span>
</a>
</div>
</footer>
</div>
  );
}
{/* fim do rodapé */}



export default App;
