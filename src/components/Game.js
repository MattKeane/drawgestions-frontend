import { useState, useEffect, useRef } from 'react'
import { io } from 'socket.io-client'
const { REACT_APP_API_URL } = process.env

export default function Game(props) {
    const [incomingMessage, setIncomingMessage] = useState('')
    const [outgoingMessage, setOutgoingMessage] = useState('')
    const socket = useRef(null)

    useEffect(() => {
        socket.current = io(REACT_APP_API_URL)
        socket.current.emit('join', props.room)
        console.log(props.room)
        socket.current.on('message', message => {
            setIncomingMessage(message)
        })
    }, [props.room])

    const handleSubmit = () => {
        socket.current.emit('message', outgoingMessage, props.room)
        setOutgoingMessage('')
    }

    const listPlayers = props.players.map((player, i) => {
        return(
            <li key={ i }>
                { player }
            </li>
        )
    })

    return (
        <>
            <p>Now in room { props.room } as { props.displayName }</p>
            <p>{ incomingMessage }</p>
            <input
                type="text"
                value={ outgoingMessage }
                onChange={ e => setOutgoingMessage(e.target.value)}
            />
            <button onClick={ handleSubmit }>Send</button>
            <div>
                <h3>Current Players</h3>
                <ul>
                    {
                        listPlayers
                    }
                </ul>
            </div>
        </>
    ) 
}