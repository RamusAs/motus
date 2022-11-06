import { useState } from "react"
import { Modal } from "./Modal"
import "../styles/Modal.css"

export const Rules = ({}) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="rules">
      <button className="primaryBtn" onClick={() => setIsOpen(true)}>
        ?
      </button>
      {isOpen && (
        <Modal
          tilte="Rules"
          content={
            <>
              <strong>
                Le but est de trouver le mot en un minimum de coups sans
                dépasser 6 tentatives ou la partie est perdue.
              </strong>
              <p>
                A chaque tentative, les lettres bien placées sont entourées de
                vert et celles mal placées de jaune.
              </p>
              <p>
                {" "}
                Les mots mal orthographiés ou absents du dictionnaire vous sont
                signalés.
              </p>
            </>
          }
          setIsOpen={setIsOpen}
        />
      )}
    </div>
  )
}
