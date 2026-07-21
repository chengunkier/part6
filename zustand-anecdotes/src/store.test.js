import { describe, test, expect, beforeEach } from 'vitest'
import useAnecdoteStore from './store'

describe('anecdote store', () => {
  beforeEach(() => {
    useAnecdoteStore.setState({ anecdotes: [], filter: '' })
  })

  test('state is initialized with the anecdotes returned by the backend', () => {
    const anecdotesFromBackend = [
      { content: 'first anecdote', id: '1', votes: 0 },
      { content: 'second anecdote', id: '2', votes: 0 },
    ]

    useAnecdoteStore.getState().setAnecdotes(anecdotesFromBackend)

    const { anecdotes } = useAnecdoteStore.getState()

    expect(anecdotes).toHaveLength(2)
    expect(anecdotes).toEqual(anecdotesFromBackend)
  })
})