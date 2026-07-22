import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, createAnecdote, updateAnecdote } from './requests'
import { useNotify } from './NotificationContext'

export const useAnecdotes = () => {
  return useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: false,
  })
}

export const useCreateAnecdoteMutation = () => {
  const queryClient = useQueryClient()
  const notify = useNotify()

  return useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      notify(`anecdote '${newAnecdote.content}' created`)
    },
    onError: (error) => {
      notify(error.message)
    },
  })
}

export const useVoteAnecdoteMutation = () => {
  const queryClient = useQueryClient()
  const notify = useNotify()

  return useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (votedAnecdote) => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      notify(`anecdote '${votedAnecdote.content}' voted`)
    },
  })
}