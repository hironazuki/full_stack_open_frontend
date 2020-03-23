import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const Statistics = ({good, neutral, bad}) => {
  if (good === 0 && neutral === 0 && bad === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  return (
    <table>
      <tbody>
        <Statistic text='good' value={good} />
        <Statistic text='neutral' value={neutral} />
        <Statistic text='bad' value={bad} />
        <tr>
          <td>all</td>
          <td>{good + neutral + bad}</td>
        </tr>
        <tr>
          <td>average</td>
          <td>{(good + neutral + bad)/3}</td>
        </tr>
        <tr>
          <td>positive</td>
          <td>{ good /(good + neutral + bad) *100}%</td>
        </tr>
      </tbody>
    </table>
  )
}

const Statistic = (props) => (
  <>
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  </>
)

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const voteGood = () => {
    setGood(good + 1)
  }
  const voteNeutral = () => {
    setNeutral(neutral + 1)
  }
  const voteBad = () => {
    setBad(bad + 1)
  }
  return (
    <div>
      <h2>give feedback</h2>
      <Button onClick={voteGood} text='good' />
      <Button onClick={voteNeutral} text='neutral' />
      <Button onClick={voteBad} text='bad' />
      <h2>statistics</h2>
      <Statistics  good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)