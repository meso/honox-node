import { useState } from 'hono/jsx'
import type { Todo } from '../db'

export default function TodoList({ initialTodos }: { initialTodos: Todo[] }) {
  const [todos, setTodos] = useState(initialTodos)
  const [newTodo, setNewTodo] = useState('')
  const [loading, setLoading] = useState(false)

  const addTodo = async (e: Event) => {
    e.preventDefault()
    if (!newTodo.trim() || loading) return

    setLoading(true)
    try {
      const response = await fetch('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTodo })
      })
      
      if (response.ok) {
        const todo = await response.json()
        setTodos([todo, ...todos])
        setNewTodo('')
      }
    } catch (error) {
      console.error('Error adding todo:', error)
    } finally {
      setLoading(false)
    }
  }

  const toggleTodo = async (id: number, completed: boolean) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !completed })
      })
      
      if (response.ok) {
        setTodos(todos.map(todo => 
          todo.id === id ? { ...todo, completed: !completed } : todo
        ))
      }
    } catch (error) {
      console.error('Error updating todo:', error)
    }
  }

  const deleteTodo = async (id: number) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: 'DELETE'
      })
      
      if (response.ok) {
        setTodos(todos.filter(todo => todo.id !== id))
      }
    } catch (error) {
      console.error('Error deleting todo:', error)
    }
  }

  return (
    <>
      <form onSubmit={addTodo} class="todo-form">
        <input
          type="text"
          value={newTodo}
          onInput={(e) => setNewTodo((e.target as HTMLInputElement).value)}
          placeholder="新しいTodoを入力..."
          class="todo-input"
          disabled={loading}
        />
        <button type="submit" class="add-btn" disabled={loading}>
          {loading ? '追加中...' : '追加'}
        </button>
      </form>
      
      <ul class="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} class="todo-item">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id, todo.completed)}
            />
            <label class={todo.completed ? 'completed' : ''}>
              {todo.title}
            </label>
            <button
              onClick={() => deleteTodo(todo.id)}
              class="delete-btn"
            >
              削除
            </button>
          </li>
        ))}
      </ul>
    </>
  )
}