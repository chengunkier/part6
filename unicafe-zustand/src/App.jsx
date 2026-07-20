import useStore from './store'

const App = () => {
  const { good, neutral, bad, increaseGood, increaseNeutral, increaseBad } = useStore()

  const all = good + neutral + bad
  const average = all === 0 ? 0 : (good - bad) / all
  const positive = all === 0 ? 0 : (good / all) * 100

  return (
    <div>
      <h2>give feedback</h2>

      <button onClick={increaseGood}>good</button>
      <button onClick={increaseNeutral}>neutral</button>
      <button onClick={increaseBad}>bad</button>

      <h2>statistics</h2>

      <table>
        <tbody>
          <tr>
            <td>good</td>
            <td>{good}</td>
          </tr>
          <tr>
            <td>neutral</td>
            <td>{neutral}</td>
          </tr>
          <tr>
            <td>bad</td>
            <td>{bad}</td>
          </tr>
          <tr>
            <td>all</td>
            <td>{all}</td>
          </tr>
          <tr>
            <td>average</td>
            <td>{average.toFixed(1)}</td>
          </tr>
          <tr>
            <td>positive</td>
            <td>{positive.toFixed(1)} %</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default App