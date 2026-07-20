import useAnecdoteStore from '../store'

const Filter = () => {
  const filterChange = useAnecdoteStore((state) => state.filterChange)

  const handleChange = (event) => {
    filterChange(event.target.value)
  }

  const style = {
    marginBottom: 10,
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter