import { useEffect } from 'react'
import useAnecdoteStore from './store'
import anecdoteService from './services/anecdotes'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'

const App = () => {
  const setAnecdotes = useAnecdoteStore((state) => state.setAnecdotes)

  useEffect(() => {
    anecdoteService
      .getAll()
      .then((anecdotes) => setAnecdotes(anecdotes))
      .catch((error) => {
        console.error('Failed to fetch anecdotes:', error)
      })
  }, [setAnecdotes])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App