import { createRoute } from 'honox/factory'
import { getTodo, updateTodo, deleteTodo } from '../../../db'

export const GET = createRoute(async (c) => {
  const id = parseInt(c.req.param('id'))
  const todo = getTodo(id)
  if (!todo) {
    return c.json({ error: 'Todo not found' }, 404)
  }
  return c.json(todo)
})

export const PUT = createRoute(async (c) => {
  const id = parseInt(c.req.param('id'))
  const updates = await c.req.json()
  const todo = updateTodo(id, updates)
  if (!todo) {
    return c.json({ error: 'Todo not found' }, 404)
  }
  return c.json(todo)
})

export const DELETE = createRoute(async (c) => {
  const id = parseInt(c.req.param('id'))
  const success = deleteTodo(id)
  if (!success) {
    return c.json({ error: 'Todo not found' }, 404)
  }
  return c.json({ message: 'Todo deleted' })
})