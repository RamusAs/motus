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
    score,
  } = state

  const [drawGrid, setDrawGrid] = useState(grid)

  const normalizeSolution = solution
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")

  const [finedLetters, setFinedLetters] = useState(
    normalizeSolution.split("").map((el) => ({ letter: el, fined: false }))
  )

  const [message, setMessage] = useState("")

  useEffect(() => {
    const isWordInList = wordList.includes(tempUserSolution)

    if (!isWordInList && isSubmitted) {
      setMessage(
        tempUserSolution.length !== normalizeSolution.length
          ? "Not enough letters"
          : "word is not in list"
      )
    }

    if (isSubmitted && isWordInList) {
      const temp = drawGrid.slice(0)

      grid[rowIndex - 1].forEach((col, index) => {
        if (finedLetters[index].letter === col) {
          setFinedLetters((finedLetters) =>
            finedLetters.map((el) =>
              el.letter === col ? { ...el, fined: true } : el
            )
          )
        }
      })

      temp[rowIndex - 1] = grid[rowIndex - 1].map((col, index) => {
        let className = "gray"
        const letterIndex = normalizeSolution.indexOf(col)

        if (finedLetters[index].letter === col) {
          className = "green"
        }
        if (
          letterIndex > -1 &&
          finedLetters[index].letter !== col &&
          !finedLetters[index].fined &&
          finedLetters.filter((el) => !el.fined).some((el) => el.letter === col)
        ) {
          className = "yellow"
        }

        return className + " flip"
      })

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
        {drawGrid.map((row, key) => (
          <li className="d-flex" key={key}>
            {row.map((col, index) => {
              const letter = grid[key][index]
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

      <div>
        Success: {score.success}, Fail: {score.fail}, Games N°: {score.nbGames}
      </div>
    </div>
  )
}
