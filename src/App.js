import './App.css';
import { useState, useRef, useEffect } from 'react'
import { io } from 'socket.io-client'
import Room from './components/Room'

const { REACT_APP_API_URL } = process.env;

function App() {
  const [room, setRoom] = useState('')
  const [accessCode, setAccessCode] = useState('')
  const [players, setPlayers] = useState([])
  const socket = useRef(null)

  useEffect(() => {
    socket.current = io(REACT_APP_API_URL)
  }, [])

  useEffect(() => {
        socket.current.on('newPlayer', newPlayer => {
        const copyPlayers = [...players]
        copyPlayers.push(newPlayer)
        setPlayers(copyPlayers)
      })
  }, [players])

  const handleStart = async () => {
    try {
      const url = REACT_APP_API_URL + '/room/new'
      const startResponse = await fetch(url, {
        method: 'POST',
      })
      const startJson = await startResponse.json()
      setRoom(startJson.accessCode)
      socket.current.emit('join', startJson.accessCode)
    } catch (err) {
      console.log(err)
    }
  }

  const handleJoin = async () => {
    try {
      const url = REACT_APP_API_URL + '/room/join/' + accessCode 
      const joinResponse = await fetch(url)
      if (joinResponse.status === 200) {
        const joinJson = await joinResponse.json()
        setPlayers(joinJson.users)
        setRoom(joinJson.accessCode)
        socket.current.emit('join', joinJson.accessCode)
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="App">
      <h1>Drawgestions</h1>
      {
        room
        ?
        <Room 
          room={ room }
          players={ players } 
          setPlayers={ setPlayers }
          socket={ socket.current }
        />
        :
        <>
          <button onClick={ handleStart }>Start New Game</button>
          <div>
            <label htmlFor="accessCode">Room Code:</label>
            <input 
              type="text" 
              id="accessCode"
              value={ accessCode }
              onChange={ e => setAccessCode(e.target.value)}
            />
            <button onClick={ handleJoin }>Join Game</button>
          </div>
        </>
      }
    </div>
  );
}

export default App;
