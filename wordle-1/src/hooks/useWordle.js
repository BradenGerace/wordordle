import { useState } from 'react'
// import words from '../wordlist'

const useWordle = (solution) => {
    const [turn, setTurn] = useState(0) 
    const [currentGuess, setCurrentGuess] = useState('')
    const [guesses, setGuesses] = useState([...Array(10)]) // each guess is an array
    const [history, setHistory] = useState([]) // each guess is a string
    const [isCorrect, setIsCorrect] = useState(false)
    const [usedKeys, setUsedKeys] = useState({})

    // format a guess into an array of letter objects 
    // e.g. [{key: 'a', color: 'yellow'}]
    const formatGuess = () => {
      let solutionArray = [...solution]
      let formattedGuess = [...currentGuess].map((l) => {
        return {key: l.toLowerCase(), color: 'grey'}
      })

      formattedGuess.forEach((l, i) => {
        if (solution[i] === l.key) {
          formattedGuess[i].color = 'green'
          solutionArray[i] = null
        }
      })

      formattedGuess.forEach((l, i) => {
        if (solutionArray.includes(l.key) && l.color !== 'green') {
          formattedGuess[i].color = 'yellow'
          solutionArray[solutionArray.indexOf(l.key)] = null
        }
      })

      return formattedGuess
    }

  // add a new guess to the guesses state
  // update the isCorrect state if the guess is correct
  // add one to the turn state
  const addNewGuess = (formattedGuess) => {
    if (currentGuess.toLowerCase() === solution) {
      setIsCorrect(true)
    }
    setGuesses(prevGuesses => {
      let newGuesses = [...prevGuesses]
      newGuesses[turn] = formattedGuess
      return newGuesses
    })
    setHistory(prevHistory => {
      return [...prevHistory, currentGuess.toLowerCase()]
    })
    setTurn(prevTurn => {
      return prevTurn + 1
    })
    setUsedKeys((prevUsedKeys) => {
      let newKeys = {...prevUsedKeys}

      formattedGuess.forEach((l) => {
        const currentColor = newKeys[l.key]

        if (l.color === 'green') {
          newKeys[l.key] = 'green'
          return
        }
        if (l.color === 'yellow' && currentColor !== 'green') {
          newKeys[l.key] = 'yellow'
          return
        }
        if (l.color === 'grey' && currentColor !== 'green' && currentColor !== 'yellow') {
          newKeys[l.key] = 'grey'
          return
        }
      })

      return newKeys
    })
    setCurrentGuess('')
  }

  // handle keyup event & track current guess
  // if user presses enter, add the new guess
  const handleKeyup = ({ key }) => {
    if (key === 'Enter') {
      if (turn > 9) {
        document.getElementById('tip').innerHTML = "Out of Guesses";
        console.log('out of guesses')
        return
      }
      if (history.includes(currentGuess)) {
        document.getElementById('tip').innerHTML = "Cannot guess a previous guess";
        console.log('cannot guess a previous guess')
        return
      }
      if (currentGuess.length !== 10) {
        document.getElementById('tip').innerHTML = "Word must be 10 letters";
        console.log('word must be 5 chars long')
        return
      }
      /* if (!(words.includes(currentGuess))) {
        document.getElementById('tip').innerHTML = "Word not in dictionary";
        console.log('word not contained in dictionary')
        return
      } */
      const formatted = formatGuess()
      addNewGuess(formatted)
    }
    if (key === 'Backspace') {
       setCurrentGuess((prev) => {
        return prev.slice(0, -1)
      })
      return 
    }

    if (/^[A-Za-z]$/.test(key)) {
      if (currentGuess.length < 10) {
        setCurrentGuess((prev) => {
          return prev + key
        })
      }
    }
  }

  return {turn, currentGuess, guesses, isCorrect, usedKeys, handleKeyup}

}

export default useWordle