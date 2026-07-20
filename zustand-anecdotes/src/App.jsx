import useAnecdoteStore from './store'
import AnecdoteForm from './components/AnecdoteForm'

const App = () => {
  const anecdotes = useAnecdoteStore((state) => state.anecdotes)
  const voteAnecdote = useAnecdoteStore((state) => state.voteAnecdote)

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => voteAnecdote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
      <AnecdoteForm />
    </div>
  )
}

export default App