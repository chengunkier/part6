const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = () => {
  return fetch(baseUrl).then((response) => response.json())
}

export default { getAll }