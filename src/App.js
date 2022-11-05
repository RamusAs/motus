import "./App.css"
import { Wordle } from "./components"
import { WORD } from "./constant"

function App() {
  const solution = WORD[Math.floor(Math.random() * WORD.length)]
  return (
    <Wordle
      wordList={WORD}
      solution={solution}
      nbRows={solution.length <= 5 ? 5 : 7}
      nbCols={solution.length}
    />
  )
}

export default App
