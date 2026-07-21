import { describe, test, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import useAnecdoteStore from '../store'
import AnecdoteList from './AnecdoteList'

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
})