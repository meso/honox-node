import { createRoute } from 'honox/factory'
import { getTodos } from '../db'
import TodoList from '../islands/TodoList'

export default createRoute((c) => {
  const todos = getTodos()
  
  return c.render(
    <div class="container">
      <h1>Todo App</h1>
      <TodoList initialTodos={todos} />
    </div>
  )
})