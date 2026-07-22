import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, createAnecdote, updateAnecdote } from './requests'
import { useNotificationDispatch } from './NotificationContext'

export const useAnecdotes = () => {
  return useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: false,
  })
}

const showNotification = (dispatch, message) => {
  dispatch({ type: 'SET_NOTIFICATION', payload: message })
  setTimeout(() => {
    dispatch({ type: 'CLEAR_NOTIFICATION' })
  }, 5000)
}

export const useCreateAnecdoteMutation = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()

  return useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      showNotification(dispatch, `anecdote '${newAnecdote.content}' created`)
    },
  })
}

export const useVoteAnecdoteMutation = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()

  return useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (votedAnecdote) => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      showNotification(dispatch, `anecdote '${votedAnecdote.content}' voted`)
    },
  })
}