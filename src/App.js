import "./styles/App.css"
import { Wordle } from "./components"
import { WORD } from "./constant"
import { Rules } from "./components"

function App() {
  const wordList = WORD.filter((_) => _.length <= 7).map((_) =>
    _.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  )
  const solution = wordList[Math.floor(Math.random() * wordList.length)]
  return (
    <>
      <Rules />
      <Wordle
        wordList={wordList}
        solution={solution}
        nbRows={6}
        nbCols={solution.length}
      />
    </>
  )
}

export default App
