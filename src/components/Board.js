import React, { useState, useEffect, useContext } from "react"
import WordleContext from "./WordleContext"

export const Board = () => {
  const { state } = useContext(WordleContext)
  const {
    wordList,
    isGameOver,
    tempUserSolution,
    grid,
    rowIndex,
    isSubmitted,
    solution,
  } = state
  const [drawGrid, setDrawGrid] = useState(grid)
  const [message, setMessage] = useState("")

  useEffect(() => {
    const isWordInList = wordList.includes(tempUserSolution)
    
    const normalizeSolution = solution.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    console.log(normalizeSolution, tempUserSolution);

    if (!isWordInList && isSubmitted) {
      setMessage(
        tempUserSolution.length !== normalizeSolution.length
          ? "Not enough letters"
          : "word is not in list"
      )
    }

    if (isSubmitted && isWordInList) {
      const temp = drawGrid.slice(0)

      temp[rowIndex - 1] = grid[rowIndex - 1].map(
        (col, index) => {
          let className = "gray"
          const letterIndex = normalizeSolution.indexOf(col)

          if (letterIndex === index || normalizeSolution[index] === col)
            className = "green"
          if (
            letterIndex !== index &&
            letterIndex > -1 &&
            normalizeSolution[index] !== col
          ) {
            className = "yellow"
          }

          return className + " flip"
        }
      )

      setDrawGrid(temp)
      setMessage("")
    }

    if (isGameOver) {
      setMessage("Game Over: " + normalizeSolution)
      return
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitted, isGameOver])

  return (
    <div className="center">
      <ul>
        {drawGrid.map((row, i) => (
          <li className="d-flex" key={i}>
            {row.map((col, index) => {
              const letter = grid[i][index]
              return (
                <span className={"cell " + col} key={index + "-cell"}>
                  {isNaN(letter) ? letter : ""}
                </span>
              )
            })}
          </li>
        ))}
      </ul>

      {message && <pre>{message}</pre>}

      <div>Success: {state.score.success}, Fail: {state.score.fail}, Games N°: {state.score.nbGames}</div>
    </div>
  )
}
