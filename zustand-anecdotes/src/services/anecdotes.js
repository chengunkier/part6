const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = () => {
  return fetch(baseUrl).then((response) => {
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.status}`)
    }
    return response.json()
  })
}

const createNew = (content) => {
  return fetch(baseUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content, votes: 0 }),
  }).then((response) => {
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.status}`)
    }
    return response.json()
  })
}

const update = (id, updatedAnecdote) => {
  return fetch(`${baseUrl}/${id}`, {
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

const remove = (id) => {
  return fetch(`${baseUrl}/${id}`, {
    method: 'DELETE',
  }).then((response) => {
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.status}`)
    }
    return id
  })
}

export default { getAll, createNew, update, remove }