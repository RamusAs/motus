import "./App.css"
import { Wordle } from "./components"
import { WORD } from "./constant"

function App() {
  const wordList = WORD.filter(_ => _.length <= 7 )
  const solution = wordList[Math.floor(Math.random() * wordList.length)]
  return (
    <Wordle
      wordList={wordList}
      solution={solution}
      nbRows={6}
      nbCols={solution.length}
    />
  )
}

export default App
