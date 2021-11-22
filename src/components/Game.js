import { useState, useEffect } from 'react'
import Suggestions from './Suggestions'

export default function Game(props) {
    const [incomingMessage, setIncomingMessage] = useState('')
    const [outgoingMessage, setOutgoingMessage] = useState('')

    useEffect(() => {
        props.socket.on('message', message => {
            setIncomingMessage(message)
        })
    }, [props])

    const handleSubmit = () => {
        props.socket.emit('message', outgoingMessage, props.room)
        setOutgoingMessage('')
    }

    const handleStart = () => {
        props.socket.emit('start', props.room)
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
            {
                props.open
                ?
                <>
                    <p>Now in room { props.room } as { props.displayName }</p>
                    <p>{ incomingMessage }</p>
                    <input
                        type="text"
                        value={ outgoingMessage }
                        onChange={ e => setOutgoingMessage(e.target.value)}
                    />
                    <button onClick={ handleSubmit }>Send</button>
                    <button onClick={ handleStart }>Start Game</button>            
                    <div>
                        <h3>Current Players</h3>
                        <ul>
                            {
                                listPlayers
                            }
                        </ul>
                    </div>
                </>
                :
                <Suggestions />
            }
        </>
    ) 
}