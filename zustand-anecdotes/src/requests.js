const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = () => {
  return fetch(baseUrl).then((response) => {
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.status}`)
    }
    return response.json()
  })
}