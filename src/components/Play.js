import { useState, useEffect } from 'react'
import Suggestions from './Suggestions'

export default function Play(props) {
    const [drawThis, setDrawThis] = useState('')

    useEffect(() => {
        props.socket.on('drawThis', suggestion => setDrawThis(suggestion))
    }, [props.socket])

    return (
        <>
            {
                drawThis
                ?
                <p>{ drawThis }</p>
                :
                <Suggestions socket={ props.socket } />
            }
        </>
    )
}