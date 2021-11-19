import { useState } from 'react'
import Game from './Game'
const { REACT_APP_API_URL } = process.env

export default function Room(props) {
    const [desiredDisplayName, setDesiredDisplayName] = useState('')
    const [displayName, setDisplayName] = useState('')
    const [message, setMessage] = useState('')

    const handleJoin = async () => {
        try {
            const url = REACT_APP_API_URL + '/user/new'
            const payload = JSON.stringify({
                accessCode: props.room,
                displayName: desiredDisplayName,
            })
            const joinResponse = await fetch(url, {
                method: 'POST',
                body: payload,
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            const joinJson = await joinResponse.json()
            if (joinJson.joined) {
                props.setPlayers(joinJson.users)
                setDisplayName(joinJson.displayName)
            } else {
                setMessage(joinJson.message)
            }
        } catch (err) {
            console.log(err)
        }
    }

    const listPlayers = props.players.map((player, i) => {
        return (
            <li key={i}>
                { player }
            </li>
        )
    })


    return (
        <>
            {
                displayName
                ?
                <Game
                    room={ props.room }
                    displayName={ displayName }
                    players={ props.players }
                    setPlayers={ props.setPlayers }
                />
                :
                <>
                    <p>Now joining room { props.room }</p>
                    {
                        message
                        &&
                        <p>{ message }</p>
                    }
                    <label htmlFor="displayName">Choose a display name:</label>
                    <input 
                        type="text" 
                        id="displayName" 
                        value={ desiredDisplayName }
                        onChange={ e => setDesiredDisplayName(e.target.value) }
                    />
                    <button onClick={ handleJoin }>Join</button>
                    {
                        props.players.length > 0
                        &&
                        <div>
                            <h3>Current Players</h3>
                            <ul>
                                { listPlayers }
                            </ul>
                        </div>
                    }
                </>
            }
        </>
    )
}