import { create } from 'zustand'
import anecdoteService from './services/anecdotes'
import useNotificationStore from './notificationStore'

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

      useNotificationStore
        .getState()
        .setNotification(`you voted '${votedAnecdote.content}'`)

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
    useNotificationStore
      .getState()
      .setNotification(`you created '${newAnecdote.content}'`)
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