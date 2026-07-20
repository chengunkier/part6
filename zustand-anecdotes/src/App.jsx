import { useEffect } from 'react'
import useAnecdoteStore from './store'
import anecdoteService from './services/anecdotes'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'

const App = () => {
  const setAnecdotes = useAnecdoteStore((state) => state.setAnecdotes)

  useEffect(() => {
    anecdoteService.getAll().then((anecdotes) => setAnecdotes(anecdotes))
  }, [setAnecdotes])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App