import Database from 'better-sqlite3'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const db = new Database(join(__dirname, '..', 'todos.db'))

db.exec(`
  CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    completed BOOLEAN DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`)

export interface Todo {
  id: number
  title: string
  completed: boolean
  created_at: string
}

export const getTodos = () => {
  return db.prepare('SELECT * FROM todos ORDER BY created_at DESC').all() as Todo[]
}

export const getTodo = (id: number) => {
  return db.prepare('SELECT * FROM todos WHERE id = ?').get(id) as Todo | undefined
}

export const createTodo = (title: string) => {
  const result = db.prepare('INSERT INTO todos (title) VALUES (?)').run(title)
  return getTodo(result.lastInsertRowid as number)!
}

export const updateTodo = (id: number, updates: { title?: string; completed?: boolean }) => {
  const todo = getTodo(id)
  if (!todo) return null
  
  if (updates.title !== undefined) {
    db.prepare('UPDATE todos SET title = ? WHERE id = ?').run(updates.title, id)
  }
  if (updates.completed !== undefined) {
    db.prepare('UPDATE todos SET completed = ? WHERE id = ?').run(updates.completed ? 1 : 0, id)
  }
  
  return getTodo(id)!
}

export const deleteTodo = (id: number) => {
  const result = db.prepare('DELETE FROM todos WHERE id = ?').run(id)
  return result.changes > 0
}