import React from 'react'

export default function Modal({ isCorrect, turn, solution }) {
  return (
    <div className='modal'>
        {isCorrect && (
            <div>
                <h1>You Win!</h1>
                <p>The word was: </p>
                <p className='solution'>{solution}</p>
                <p>You found the solution in {turn} guesses!</p>
                <form method="GET">
                    <button name="data" onclick="return getData()" class="button-19">Play Again!</button>
                </form>
            </div>
        )}
        {!isCorrect && (
            <div>
                <h1>You Lose!</h1>
                <p>The word was: </p>
                <p className='solution'>{solution}</p>
                <p>Trash! Get it together!</p>
                <form method="GET">
                    <button name="data" onclick="return getData()" class="button-19">Play Again!</button>
                </form>
            </div>
        )}
    </div>
  )
}
