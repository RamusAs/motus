import React from "react"
import "../styles/Modal.css"
import { RiCloseLine } from "react-icons/ri"

export const Modal = ({ content,tilte, setIsOpen }) => {
  return (
    <>
      <div className="darkBG" onClick={() => setIsOpen(false)} />
      <div className="centered">
        <div className="modal">
          <button className="closeBtn" onClick={() => setIsOpen(false)}>
            <RiCloseLine style={{ marginBottom: "-3px" }} />
          </button>
          <div className="container">
            <div className="modalHeader">
              <h5 className="heading">{tilte}</h5>
            </div>
            <div className="modalContent">{content}</div>
            <div className="modalActions">
              <div className="actionsContainer">
                <button className="deleteBtn" onClick={() => setIsOpen(false)}>
                  Allons jouer !
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
