import { create } from 'zustand'

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
  createAnecdote: (content) =>
    set((state) => ({
      anecdotes: [
        ...state.anecdotes,
        { content, id: (100000 * Math.random()).toFixed(0), votes: 0 },
      ],
    })),
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