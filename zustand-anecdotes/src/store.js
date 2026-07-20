import { create } from 'zustand'
import anecdoteService from './services/anecdotes'

const useAnecdoteStore = create((set) => ({
  anecdotes: [],
  filter: '',
  voteAnecdote: (id) =>
    set((state) => ({
      anecdotes: state.anecdotes.map((anecdote) =>
        anecdote.id === id
          ? { ...anecdote, votes: anecdote.votes + 1 }
          : anecdote
      ),
    })),
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