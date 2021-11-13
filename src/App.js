import './App.css';
import { useState } from 'react'

const { REACT_APP_API_URL } = process.env;

function App() {
  const [accessCode, setAccessCode] = useState('')

  const handleStart = async () => {
    try {
      const url = REACT_APP_API_URL + '/room/new'
      const startResponse = await fetch(url, {
        method: 'POST',
      })
      const startJson = await startResponse.json()
      setAccessCode(startJson.accessCode)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="App">
      <h1>Drawgestions</h1>
      {
        accessCode
        ?
        <p>You are in room { accessCode }</p>
        :
        <>
          <button onClick={ handleStart }>Start New Game</button>
          <button>Join Game</button>
        </>
      }
    </div>
  );
}

export default App;
