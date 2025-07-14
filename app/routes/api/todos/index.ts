import { createRoute } from 'honox/factory'
import { getTodos, createTodo } from '../../../db'

export const GET = createRoute(async (c) => {
  const todos = getTodos()
  return c.json(todos)
})

export const POST = createRoute(async (c) => {
  const { title } = await c.req.json()
  if (!title) {
    return c.json({ error: 'Title is required' }, 400)
  }
  const todo = createTodo(title)
  return c.json(todo, 201)
})