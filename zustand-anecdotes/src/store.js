import { create } from 'zustand'
import anecdoteService from './services/anecdotes'

const useAnecdoteStore = create((set) => ({
  anecdotes: [],
  filter: '',
  voteAnecdote: (id) =>
    set((state) => {
      const anecdoteToVote = state.anecdotes.find(
        (anecdote) => anecdote.id === id
      )
      const votedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1,
      }

      anecdoteService.update(id, votedAnecdote)

      return {
        anecdotes: state.anecdotes.map((anecdote) =>
          anecdote.id === id ? votedAnecdote : anecdote
        ),
      }
    }),
  createAnecdote: async (content) => {
    const newAnecdote = await anecdoteService.createNew(content)
    set((state) => ({
      anecdotes: [...state.anecdotes, newAnecdote],
    }))
  },
  filterChange: (filter) =>
    set(() => ({
      filter,
    })),
  setAnecdotes: (anecdotes) =>
    set(() => ({
      anecdotes,
    })),
}))

export default useAnecdoteStore