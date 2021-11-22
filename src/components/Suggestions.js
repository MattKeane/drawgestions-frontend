import { useState } from 'react'

export default function Suggestions(props) {
    const [suggestion, setSuggestion] = useState('')

    const handleSubmit = () => {
        props.socket.emit('suggestion', suggestion)
        setSuggestion('')
    }

    return (
        <>
            <h3>Enter 3 Drawing Suggestions</h3>
            <label htmlFor="suggestion">Suggestion:</label>
            <input 
                type="text" 
                id="suggestion"
                value={ suggestion }
                onChange={ e => setSuggestion(e.target.value) } 
            />
            <button onClick={ handleSubmit }>Submit</button>
        </>
    )
}