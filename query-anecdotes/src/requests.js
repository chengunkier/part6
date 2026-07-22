const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = () => {
  return fetch(baseUrl).then((response) => {
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.status}`)
    }
    return response.json()
  })
}

export const createAnecdote = async (newAnecdote) => {
  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newAnecdote),
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => null)
    const message = (errorData && errorData.error) || 'anecdote creation failed'
    throw new Error(message)
  }

  return response.json()
}

export const updateAnecdote = (updatedAnecdote) => {
  return fetch(`${baseUrl}/${updatedAnecdote.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedAnecdote),
  }).then((response) => {
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.status}`)
    }
    return response.json()
  })
}