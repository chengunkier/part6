import { describe, test, expect, beforeEach, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import useAnecdoteStore from '../store'
import AnecdoteList from './AnecdoteList'

vi.mock('../services/anecdotes', () => ({
  default: {
    getAll: vi.fn(() => Promise.resolve([])),
    createNew: vi.fn(),
    update: vi.fn((id, anecdote) => Promise.resolve(anecdote)),
    remove: vi.fn(),
  },
}))

describe('<AnecdoteList />', () => {
  beforeEach(() => {
    useAnecdoteStore.setState({
      anecdotes: [
        { content: 'low votes', id: '1', votes: 1 },
        { content: 'high votes', id: '2', votes: 10 },
        { content: 'medium votes', id: '3', votes: 5 },
      ],
      filter: '',
    })
  })

  test('anecdotes are rendered in descending order by votes', () => {
    render(<AnecdoteList />)

    const contentElements = screen
      .getAllByText(/votes$/)
      .map((el) => el.textContent)

    expect(contentElements).toEqual(['high votes', 'medium votes', 'low votes'])
  })

  test('only anecdotes matching the filter are rendered', () => {
    useAnecdoteStore.setState({ filter: 'high' })

    render(<AnecdoteList />)

    expect(screen.getByText('high votes')).toBeInTheDocument()
    expect(screen.queryByText('low votes')).not.toBeInTheDocument()
    expect(screen.queryByText('medium votes')).not.toBeInTheDocument()
  })

  test('voting increases the number of votes for an anecdote', async () => {
    const user = userEvent.setup()

    useAnecdoteStore.setState({
      anecdotes: [{ content: 'test anecdote', id: '1', votes: 3 }],
      filter: '',
    })

    render(<AnecdoteList />)

    expect(screen.getByText('has 3')).toBeInTheDocument()

    const voteButton = screen.getByRole('button', { name: 'vote' })
    await user.click(voteButton)

    expect(screen.getByText('has 4')).toBeInTheDocument()

    const { anecdotes } = useAnecdoteStore.getState()
    expect(anecdotes[0].votes).toBe(4)
  })
})